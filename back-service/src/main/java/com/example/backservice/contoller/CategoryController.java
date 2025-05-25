package com.example.backservice.contoller;

import com.example.backservice.entity.request.ContentRequest;
import com.example.backservice.service.DataService;
import com.example.backservice.skeleton.CategoryControllerInterface;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CategoryController implements CategoryControllerInterface {
    private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(CategoryController.class);
    private final DataService dataService;

    @Override
    public ResponseEntity<Map<String, List<String>>> divideContentIntoCategory(ContentRequest content) {
        try {
            String cleanedContent = dataService.preProcessContent(content.getText());
            Map<String, List<String>> categories = dataService.divideContentIntoCategories(cleanedContent);
            LOGGER.info("Generated categories for content length: {}", cleanedContent.length());
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            LOGGER.error("Error processing category request: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", List.of(e.getMessage())));
        }

    }
}
