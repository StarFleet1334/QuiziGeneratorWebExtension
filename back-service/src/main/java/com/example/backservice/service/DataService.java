package com.example.backservice.service;

import lombok.Getter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Getter
@Service
public class DataService {

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

    public List<String> generateQuestions() {
        if (content == null || content.isEmpty()) {
            throw new IllegalStateException("Content must be saved first.");
        }

        String apiUrl = "http://localhost:8000/generate-questions";
        Map<String, String> requestBody = Map.of("text", content);

        @SuppressWarnings("unchecked")
        Map<String, List<String>> response = restTemplate.postForObject(apiUrl, requestBody, Map.class);

        assert response != null;
        return response.get("questions");
    }

}
