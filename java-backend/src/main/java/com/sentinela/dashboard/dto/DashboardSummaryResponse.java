package com.sentinela.dashboard.dto;

public class DashboardSummaryResponse {

    private Long totalEvents;
    private Long totalIncidents;
    private Long criticalIncidents;
    private Long highIncidents;
    private Long openIncidents;
    private Long activeAssets;

    public DashboardSummaryResponse(Long totalEvents, Long totalIncidents,
                                    Long criticalIncidents, Long highIncidents,
                                    Long openIncidents, Long activeAssets) {
        this.totalEvents = totalEvents;
        this.totalIncidents = totalIncidents;
        this.criticalIncidents = criticalIncidents;
        this.highIncidents = highIncidents;
        this.openIncidents = openIncidents;
        this.activeAssets = activeAssets;
    }

    public Long getTotalEvents() {
        return totalEvents;
    }

    public Long getTotalIncidents() {
        return totalIncidents;
    }

    public Long getCriticalIncidents() {
        return criticalIncidents;
    }

    public Long getHighIncidents() {
        return highIncidents;
    }

    public Long getOpenIncidents() {
        return openIncidents;
    }

    public Long getActiveAssets() {
        return activeAssets;
    }
}