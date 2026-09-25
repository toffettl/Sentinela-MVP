"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/services/dashboard/dashboard.service";

export default function useDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadDashboard() {
            try {
                const data = await getDashboard();

                if (isMounted) {
                    setDashboard(data);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Erro ao carregar dashboard:", error);
                    setError(error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        // primeira carga
        loadDashboard();

        // atualizações
        const interval = setInterval(() => {
            loadDashboard();
        }, 10000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return {
        dashboard,
        loading,
        error,
    };
}