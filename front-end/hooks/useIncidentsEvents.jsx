"use client";

import { useEffect, useState } from "react";
import { getIncidentEvents } from "@/services/incidents/incidents.service";

export default function useIncidentEvents(incidentId) {
  const [IncidentsEvents, setIncidentsEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!incidentId) return;

    async function loadIncidentsEvents() {
      try {

        const data = await getIncidentEvents(incidentId);

        setIncidentsEvents(data);
            if (isMounted) {
                    setIncidentEvents(data);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
    }

    loadIncidentsEvents();
    const interval = setInterval(loadIncidentsEvents, 10000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
  }, [incidentId]);

  return {
    IncidentsEvents,
    loading,
    error,
  };
}