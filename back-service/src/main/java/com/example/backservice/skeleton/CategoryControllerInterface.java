package com.example.backservice.skeleton;

import com.example.backservice.entity.request.ContentRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Categorization", description = "Operations related to website content categorization")
@RequestMapping(value = "api/category")
public interface CategoryControllerInterface {

    @PostMapping
    @Operation(summary = "Divide content into a category", description = "Operation divides content received into a categories")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Content successfully received & divided into a category"),
            @ApiResponse(responseCode = "400", description = "Invalid request body"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    ResponseEntity<Map<String, List<String>>> divideContentIntoCategory(
            @Parameter(description = "Content data", required = true)
            @RequestBody ContentRequest content
    );


    @PostMapping(value = "/{category}")
    @Operation(summary = "Get content by category", description = "Operation retrieves content by category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Content successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Content not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    ResponseEntity<?> getContentByCategory(
            @Parameter(description = "Category name", required = true)
            @PathVariable String category
    );

}
