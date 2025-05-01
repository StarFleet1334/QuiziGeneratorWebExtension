package com.example.backservice.skeleton;

import com.example.backservice.entity.request.ContentRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = "Website content", description = "Operations related to website content")
@RequestMapping(value = "api/content")
public interface DataControllerInterface {

    @PostMapping
    @Operation(summary = "Save content", description = "Save provided content to the server")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Content successfully saved"),
            @ApiResponse(responseCode = "400", description = "Invalid request body"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    ResponseEntity<?> saveContent(
            @Parameter(description = "Content data", required = true)
            @RequestBody ContentRequest content
    );
}
