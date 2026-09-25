"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/services/events/events.service";

export default function useEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadEvents() {
            try {
                const data = await getEvents();

                if (isMounted) {
                    setEvents(data);
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

        loadEvents();

        const interval = setInterval(loadEvents, 10000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return {
        events,
        loading,
        error,
    };
}