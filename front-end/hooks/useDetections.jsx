"use client";

import { useEffect, useState } from "react";
import { getDetections } from "../services/detections/detections.service";

export default function useDetections() {
    const [detections, setDetections] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadDetections() {
            try {
                const data = await getDetections();

                if (isMounted) {
                    setDetections(data);
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
        loadDetections();

        // atualizações
        const interval = setInterval(() => {
            loadDetections();
        }, 10000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return {
        detections,
        loading,
        error,
    };
}