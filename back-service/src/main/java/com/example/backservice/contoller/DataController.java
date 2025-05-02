package com.example.backservice.contoller;

import com.example.backservice.entity.request.ContentRequest;
import com.example.backservice.entity.respose.QuestionResponse;
import com.example.backservice.service.DataService;
import com.example.backservice.skeleton.DataControllerInterface;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
        String cleanedContent = dataService.preProcessContent(content.getContent());
        List<QuestionResponse> generatedQuestions = dataService.generateQuestions(cleanedContent);
        return ResponseEntity.ok(generatedQuestions);
    }

    @Override
    public ResponseEntity<String> getContent() {
        return dataService.getContent() != null ? ResponseEntity.ok(dataService.getContent()) : ResponseEntity.notFound().build();
    }


}
