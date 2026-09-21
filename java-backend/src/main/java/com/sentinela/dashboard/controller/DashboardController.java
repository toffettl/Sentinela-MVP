package com.sentinela.dashboard.controller;

import com.sentinela.asset.entity.AssetStatus;
import com.sentinela.asset.repository.AssetRepository;
import com.sentinela.dashboard.dto.DashboardSummaryResponse;
import com.sentinela.event.repository.EventRepository;
import com.sentinela.incident.entity.IncidentSeverity;
import com.sentinela.incident.entity.IncidentStatus;
import com.sentinela.incident.repository.IncidentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final EventRepository eventRepository;
    private final IncidentRepository incidentRepository;
    private final AssetRepository assetRepository;

    public DashboardController(EventRepository eventRepository,
                               IncidentRepository incidentRepository,
                               AssetRepository assetRepository) {
        this.eventRepository = eventRepository;
        this.incidentRepository = incidentRepository;
        this.assetRepository = assetRepository;
    }

    @GetMapping("/summary")
    public DashboardSummaryResponse getSummary() {
        return new DashboardSummaryResponse(
                eventRepository.count(),
                incidentRepository.count(),
                incidentRepository.countBySeverity(IncidentSeverity.CRITICAL),
                incidentRepository.countBySeverity(IncidentSeverity.HIGH),
                incidentRepository.countByStatus(IncidentStatus.OPEN),
                assetRepository.countByStatus(AssetStatus.ACTIVE)
        );
    }
}