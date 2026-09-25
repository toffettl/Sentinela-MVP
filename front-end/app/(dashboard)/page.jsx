"use client"

import StatCard from "@/components/dashboard/stat-card";
import RecentAlerts from "@/components/dashboard/recent-alerts";
import InTimeEvent from "@/components/dashboard/InTime-Events";
import RulesTierList from "@/components/dashboard/rules-tierlist";
import EmpashisAlert from "@/components/dashboard/emphasis-alert";

import useEvents from "../../hooks/useEvents";
import useIncidentEvents from "../../hooks/useIncidentsEvents";
import useIncidents from "../../hooks/useIncidents";
import useDashboard from "@/hooks/useDashboard";
import { useMockDashboard } from "../../hooks/mocks/useMockDashboard";
import useDetections from "../../hooks/useDetections";


export default function DashboardPage() {
   const {
        events,
        loading: eventsLoading,
        error : eventsError
    } = useEvents();
   const {
        incidents,
        highlightedIncident,
        loading: incidentsLoading,
        error : incidentsError
    } = useIncidents();

   const { incidentsEvents } = useIncidentEvents();

   const {
        dashboard,
        loading: dashboardLoading,
        error : dashboardError
    } = useDashboard();

    const {
        detections,
        loading: detectionLoading,
        error : detectionError
    } = useDetections();

    
    if (eventsLoading || incidentsLoading || dashboardLoading || detectionLoading) {
      return <p>Carregando dashboard...</p>;
    }
    
    if (eventsError || incidentsError || dashboardError || detectionError ) {
      return <p>Erro ao carregar dashboard.</p>;
    }
    
    if (!dashboard || !incidents || !events ) {
      return <p>Nenhum dado encontrado.</p>;
    }
    const eventTypeCounts = detections.reduce((acc, detections) => {
      const type = detections.pattern;

      if (!type) return acc;

      acc[type] = (acc[type] || 0) + 1;

      return acc;
    }, {});

    const rulesTierListData = Object.entries(eventTypeCounts)
    .map(([eventType, count]) => ({
        rule: eventType,
        name: "SUSPICIOUS",
        value: count,
        color: "bg-green-500",
    }))
    .sort((a, b) => b.value - a.value);
    
  return (
    <div className="flex flex-col gap-4 h-full w-full min-w-250 min-h-250">
      <h1 className="text-3xl font-bold">
        Painel de Segurança
      </h1>

      <p className="mt-2 text-muted">
        Sentinela Monitores de segurança
      </p>

        <div className=" flex flex-row gap-4 w-full">
          <StatCard title={"Requisições feitas"} value={dashboard.totalEvents + dashboard.totalIncidents}/>
          <StatCard title={"Assets ativos"} value={dashboard.activeAssets}/>
          <StatCard title={"Incidentes criticos"} value={dashboard.criticalIncidents}/>
          <StatCard title={"Possiveis anomalias"} value={dashboard.highIncidents}/>
        </div>

        <div className="w-full h-full flex flex-row gap-4">

          <EmpashisAlert  data={highlightedIncident}/>

          <RulesTierList
          data={rulesTierListData}/>

        </div>
        <div className="flex flex-row gap-2 w-full h-full">

          <div>
            <InTimeEvent data={events}/>
          </div>

          <div>
            <RecentAlerts data={incidents}/>
          </div>
        </div>
    </div>
  );
}