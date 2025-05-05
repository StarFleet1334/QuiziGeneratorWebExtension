package com.example.backservice.contoller;

import com.example.backservice.entity.request.ContentRequest;
import com.example.backservice.service.DataService;
import com.example.backservice.skeleton.CategoryControllerInterface;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
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
        String cleanedContent;
        Map<String, List<String>> categories;
        if (dataService.getContent() == null) {
            cleanedContent = dataService.preProcessContent(content.getContent());
            categories = dataService.divideContentIntoCategories(cleanedContent);
        } else {
            categories = dataService.divideContentIntoCategories(dataService.getContent());
        }
        LOGGER.info("Received categories: {}", categories);
        return ResponseEntity.ok(categories);
    }

    @Override
    public ResponseEntity<?> getContentByCategory(String category) {

        return ResponseEntity.ok("Hello");
    }
}
