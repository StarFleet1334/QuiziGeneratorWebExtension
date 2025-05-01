package com.example.backservice.contoller;

import com.example.backservice.service.DataService;
import com.example.backservice.skeleton.QuestionControllerInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuestionController implements QuestionControllerInterface {

    private final DataService userService;

    @Override
    public ResponseEntity<List<String>> getQuestions() {
        return ResponseEntity.ok(userService.generateQuestions());
    }
}

