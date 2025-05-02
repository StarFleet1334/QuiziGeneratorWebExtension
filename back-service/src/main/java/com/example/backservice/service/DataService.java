package com.example.backservice.service;

import com.example.backservice.entity.respose.QuestionResponse;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Getter
@Service
public class DataService {
    private static final Logger LOGGER = LoggerFactory.getLogger(DataService.class);
    private static final String API_URL = "http://127.0.0.1:8001/generate-questions";
    private final RestTemplate restTemplate = new RestTemplate();
    private String content;

    public String preProcessContent(String content) {
        this.content = content;
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

    public List<QuestionResponse> generateQuestions() {
        if (content == null || content.isEmpty()) {
            throw new IllegalStateException("Content must be saved first.");
        }
        LOGGER.info("Content being sent to API: [{}]", cleanText(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = Map.of("text", cleanText(content));
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> rawResponse = restTemplate.exchange(
                API_URL,
                HttpMethod.POST,
                entity,
                String.class
        );
        LOGGER.info("Raw API response: {}", rawResponse.getBody());

        ResponseEntity<Map<String, List<QuestionResponse>>> response = restTemplate.exchange(
                API_URL,
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<>() {}
        );

        List<QuestionResponse> questions = response.getBody().get("questions");
        LOGGER.info("Generated questions: {}", questions);
        return questions;
    }

}
