package com.sentinela.incident.service;

import com.sentinela.event.repository.EventRepository;
import com.sentinela.exception.BusinessException;
import com.sentinela.incident.dto.CreateIncidentRequest;
import com.sentinela.incident.dto.IncidentUpdateRequest;
import com.sentinela.incident.entity.Incident;
import com.sentinela.incident.entity.IncidentSeverity;
import com.sentinela.incident.entity.IncidentStatus;
import com.sentinela.incident.repository.IncidentNoteRepository;
import com.sentinela.incident.repository.IncidentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class IncidentServiceTest {

    @Mock
    private IncidentRepository incidentRepository;

    @Mock
    private IncidentNoteRepository noteRepository;

    @Mock
    private EventRepository eventRepository;

    private IncidentService incidentService;

    @BeforeEach
    void setUp() {
        incidentService = new IncidentService(incidentRepository, noteRepository, eventRepository);
    }

    @Test
    void shouldCreateIncidentWithCorrectSeverity() {
        CreateIncidentRequest request = new CreateIncidentRequest();
        request.setTitle("Test Incident");
        request.setRiskScore(85);

        when(incidentRepository.save(any(Incident.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var response = incidentService.createIncident(request);

        assertEquals(IncidentSeverity.CRITICAL, response.getSeverity());
        assertEquals("Test Incident", response.getTitle());
    }

    @Test
    void shouldNotAllowInvalidStatusTransition() {
        Incident incident = new Incident();
        incident.setStatus(IncidentStatus.RESOLVED);
        IncidentUpdateRequest request = new IncidentUpdateRequest();
        request.setStatus(IncidentStatus.OPEN);
        when(incidentRepository.findById(1L)).thenReturn(Optional.of(incident));

        assertThrows(BusinessException.class, () -> incidentService.updateStatus(1L, request));
    }
}