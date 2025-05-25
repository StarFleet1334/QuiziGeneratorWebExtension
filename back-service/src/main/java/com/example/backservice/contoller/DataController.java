package com.example.backservice.contoller;

import com.example.backservice.entity.request.ContentRequest;
import com.example.backservice.entity.respose.QuestionResponse;
import com.example.backservice.service.DataService;
import com.example.backservice.skeleton.DataControllerInterface;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DataController implements DataControllerInterface {
    private static final Logger LOGGER = LoggerFactory.getLogger(DataController.class);

    private final DataService dataService;

    @Override
    public ResponseEntity<?> saveContent(ContentRequest content) {
        try {
            String cleanedContent = dataService.preProcessContent(content.getText());
            List<QuestionResponse> generatedQuestions = dataService.generateQuestions(
                    cleanedContent,
                    content.isTrueFalseQuestions(),
                    content.isTypeAnswerQuestions()
            );

            LOGGER.info("Generated {} questions for content length: {}",
                    generatedQuestions.size(), cleanedContent.length());
            return ResponseEntity.ok(generatedQuestions);
        } catch (Exception e) {
            LOGGER.error("Error processing content request: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(List.of("Failed to generate questions: " + e.getMessage()));
        }
    }

}
