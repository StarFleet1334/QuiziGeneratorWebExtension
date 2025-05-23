package com.example.backservice.entity.respose;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class QuestionResponse {
    private String question;
    private Map<String, String> choices;
    private List<String> choicesList;
    private String correct_answer;
    private String type;


}
