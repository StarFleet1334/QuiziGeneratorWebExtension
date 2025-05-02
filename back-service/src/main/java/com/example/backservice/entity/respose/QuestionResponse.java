package com.example.backservice.entity.respose;

import lombok.Data;

import java.util.Map;

@Data
public class QuestionResponse {
    private String question;
    private Map<String, String> choices;
    private String correct_answer;

}
