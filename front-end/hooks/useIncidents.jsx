"use client";

import { useEffect, useState } from "react";
import { getIncidents } from "@/services/incidents/incidents.service";

export default function useIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightedIncident, setHighlightedIncident] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadIncidents() {
      try {
        const data = await getIncidents();

        setIncidents(data);

         if (data.length > 0) {
          const highestRiskIncident = data.reduce((highest, current) => {
            return Number(current.riskScore) > Number(highest.riskScore)
              ? current
              : highest;
          });

          setHighlightedIncident(highestRiskIncident);
        }

            if (isMounted) {
                    setIncidents(data);
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

    loadIncidents();

    const interval = setInterval(loadIncidents, 10000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
  }, []);

  return {
    incidents,
    highlightedIncident,
    loading,
    error,
  };
}

