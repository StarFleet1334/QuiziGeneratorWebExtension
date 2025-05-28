package com.example.backservice.service;

import com.example.backservice.entity.respose.QuestionResponse;
import com.example.backservice.exceptions.ApiCommunicationException;
import com.example.backservice.exceptions.ApiResponseException;
import com.example.backservice.security.ApiProperties;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Supplier;


@Service
@Data
public class DataService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DataService.class);
    private final RestTemplate restTemplate;
    private final ApiProperties apiProperties;

    @Value("${api.retry.maxAttempts:3}")
    private int maxRetryAttempts;

    public DataService(RestTemplate restTemplate, ApiProperties apiProperties) {
        this.restTemplate = restTemplate;
        this.apiProperties = apiProperties;
    }

    private <T> ResponseEntity<T> makeApiRequest(String url, String content,String language,
                                                 ParameterizedTypeReference<T> typeReference) {
        return makeApiRequest(url, content,language,typeReference,null);
    }

    private <T> ResponseEntity<T> makeApiRequest(String url, String content,
                                                 boolean isTrueFalseQuestions,
                                                 boolean isTypeAnswerQuestions,
                                                 String language,
                                                 ParameterizedTypeReference<T> typeReference) {
        return makeApiRequest(url, content,isTrueFalseQuestions,isTypeAnswerQuestions,language, typeReference, null);
    }

    private <T> ResponseEntity<T> makeApiRequest(String url, String content,
                                                 boolean isTrueFalseQuestions,
                                                 boolean isTypeAnswerQuestions,
                                                 String language,
                                                 ParameterizedTypeReference<T> typeReference, Class<T> responseType) {
        validateContent(content);

        HttpEntity<Map<String, Object>> requestEntity = createRequestEntity(content, isTrueFalseQuestions, isTypeAnswerQuestions,language);

        return executeWithRetry(() -> {
            return restTemplate.exchange(url, HttpMethod.POST, requestEntity, typeReference);
        });

    }

    private <T> ResponseEntity<T> makeApiRequest(String url, String content,String language,
                                                 ParameterizedTypeReference<T> typeReference, Class<T> responseType) {
        validateContent(content);

        HttpEntity<Map<String, String>> requestEntity = createRequestEntity(content,language);

        return executeWithRetry(() -> {
            if (typeReference != null) {
                return restTemplate.exchange(url, HttpMethod.POST, requestEntity, typeReference);
            } else {
                return restTemplate.exchange(url, HttpMethod.POST, requestEntity, responseType);
            }
        });
    }


    private void validateContent(String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Content cannot be null or empty");
        }
    }

    private HttpEntity<Map<String, String>> createRequestEntity(String content,String language) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("text", content);
        requestBody.put("language", language);
        return new HttpEntity<>(requestBody, headers);
    }

    private HttpEntity<Map<String, Object>> createRequestEntity(String content, boolean trueFalseQuestions, boolean typeAnswerQuestions,String language) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("text", content);
        requestBody.put("trueFalseQuestions", trueFalseQuestions);
        requestBody.put("typeAnswerQuestions", typeAnswerQuestions);
        requestBody.put("language", language);

        return new HttpEntity<>(requestBody, headers);
    }


    private <T> T executeWithRetry(Supplier<T> operation) {
        int attempts = 0;
        while (attempts < maxRetryAttempts) {
            try {
                return operation.get();
            } catch (RestClientException e) {
                attempts++;
                if (attempts == maxRetryAttempts) {
                    throw new ApiCommunicationException("Failed to communicate with API after "
                            + maxRetryAttempts + " attempts", e);
                }
                LOGGER.warn("API request failed, attempt {}/{}: {}",
                        attempts, maxRetryAttempts, e.getMessage());
                backoff(attempts);
            }
        }
        throw new ApiCommunicationException("Unexpected error in retry logic");
    }

    private void backoff(int attempt) {
        try {
            Thread.sleep((long) Math.pow(2, attempt) * 100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ApiCommunicationException("Retry interrupted", e);
        }
    }

    public List<QuestionResponse> generateQuestions(String content,boolean isTrueFalseQuestions,boolean isTypeAnswerQuestions,String language) {
        LOGGER.info("Generating questions for content length: {}", content.length());

        ResponseEntity<Map<String, List<QuestionResponse>>> response = makeApiRequest(
                apiProperties.getQuestionsUrl(),
                content,
                isTrueFalseQuestions,
                isTypeAnswerQuestions,
                language,
                new ParameterizedTypeReference<>() {}
        );


        if (response.getBody() == null || !response.getBody().containsKey("questions")) {
            throw new ApiResponseException("Invalid response format from questions API");
        }

        return response.getBody().get("questions");
    }

    public Map<String, List<String>> divideContentIntoCategories(String content,String language) {
        LOGGER.info("Dividing content into categories, content length: {}", content.length());

        ResponseEntity<Map<String, List<String>>> response = makeApiRequest(
                apiProperties.getCategoriesUrl(),
                content,
                language,
                new ParameterizedTypeReference<Map<String, List<String>>>() {}
        );

        if (response.getBody() == null) {
            throw new ApiResponseException("No categories received from API");
        }

        Map<String, List<String>> categoryMap = response.getBody();
        LOGGER.info("Received categories with content: {}", categoryMap.keySet());
        LOGGER.info("Generated {} categories", categoryMap.size());
        return categoryMap;

    }

    public String preProcessContent(String content) {
        return cleanText(content);
    }

    private String cleanText(String text) {
        if (text == null) return "";

        return text.trim()
                .replaceAll("\\s+", " ")
                .replaceAll("(?m)^\\s+$", "")
                .replaceAll("\\n\\s*\\n\\s*\\n+", "\n\n")
                .replaceAll("›", "")
                .replaceAll("(?m)^\\s+", "")
                .replaceAll("\\s+$", "")
                .replaceAll("Keep Exploring[\\s\\S]*$", "");

    }
}