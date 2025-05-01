package com.example.backservice.service;

import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
public class DataService {

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

}
