package com.example.backservice.contoller;

import com.example.backservice.entity.respose.QuestionResponse;
import com.example.backservice.service.DataService;
import com.example.backservice.skeleton.QuestionControllerInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuestionController implements QuestionControllerInterface {

    private final DataService dataService;

    @Override
    public ResponseEntity<List<QuestionResponse>> getQuestions() {
        return ResponseEntity.ok(dataService.getQuestions());
    }
}

