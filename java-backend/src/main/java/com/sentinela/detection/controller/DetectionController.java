package com.sentinela.detection.controller;

import com.sentinela.detection.dto.DetectionRequest;
import com.sentinela.detection.dto.DetectionResponse;
import com.sentinela.detection.service.DetectionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detections")
public class DetectionController {

    private final DetectionService detectionService;

    public DetectionController(DetectionService detectionService) {
        this.detectionService = detectionService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DetectionResponse receive(@Valid @RequestBody DetectionRequest request) {
        return detectionService.receive(request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<DetectionResponse> findAll() {
        return detectionService.findAll();
    }
}
