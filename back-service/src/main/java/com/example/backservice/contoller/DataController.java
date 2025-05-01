package com.example.backservice.contoller;

import com.example.backservice.entity.request.ContentRequest;
import com.example.backservice.service.DataService;
import com.example.backservice.skeleton.DataControllerInterface;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class DataController implements DataControllerInterface {
    private static final Logger LOGGER = LoggerFactory.getLogger(DataController.class);

    private final DataService userService;

    @Override
    public ResponseEntity<?> saveContent(ContentRequest content) {
        String cleanedContent = userService.preProcessContent(content.getContent());
        LOGGER.info("Cleaned content: {}", cleanedContent);
        return ResponseEntity.ok(cleanedContent);
    }

    @Override
    public ResponseEntity<String> getContent() {
        return userService.getContent() != null ? ResponseEntity.ok(userService.getContent()) : ResponseEntity.notFound().build();
    }


}
