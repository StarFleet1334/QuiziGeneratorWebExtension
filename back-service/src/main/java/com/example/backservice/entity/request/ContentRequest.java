package com.example.backservice.entity.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContentRequest {
    private String content;
    private boolean trueFalseQuestions;
    private boolean typeAnswerQuestions;
}
