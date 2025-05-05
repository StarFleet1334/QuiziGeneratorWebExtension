package com.example.backservice.entity.respose;

import lombok.Data;

import java.util.List;

@Data
public class CategoryResponse {
    private String category;
    private List<String> relatedContent;

}
