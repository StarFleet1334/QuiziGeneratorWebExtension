package com.example.backservice.skeleton;

import com.example.backservice.entity.respose.QuestionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Tag(name = "Questions", description = "Operations related to question generation")
@RequestMapping("/api/questions")
public interface QuestionControllerInterface {

    @GetMapping
    @Operation(summary = "Get questions", description = "Retrieve all generated questions")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Questions successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "No questions found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    ResponseEntity<List<QuestionResponse>> getQuestions();

}