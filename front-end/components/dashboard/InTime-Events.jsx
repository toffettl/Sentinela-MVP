const getSeveridadeByRisco = (risco) => {
    const pontos = String(risco);

    if (pontos == "LOGIN_FAILED") return "MEDIUM";
    if (pontos == "LOGIN_SUCCESS") return "LOW";
    if (pontos != " ") return "CRITICAL";

    return "LOW";
};

const severidadeStyle = {
    LOW: "bg-green-900 text-green-400",
    MEDIUM: "bg-yellow-900 text-yellow-400",
    HIGH: "bg-orange-900 text-orange-400",
    CRITICAL: "bg-red-900 text-red-400",
};

export default function InTimeEvent({ data }) {
    return (
        <div className="w-full h-full rounded-md bg-(--card) border-r border-(--border)">
            <div className="shrink-0 flex justify-between  p-4 border rounded-t-md border-(--cardBord)">
                <h1 className="text-foreground text-lg">Eventos Ao vivo</h1>
                <span className={`inline w-2 h-2 bg-green-500 rounded-lg`}></span>
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-thumb-(--scrollbarColor)">

                {[...data]
                    .sort((a, b) => Number(b.id) - Number(a.id))
                    .map((event , index) => {

                    const severidade = getSeveridadeByRisco(event.event_type);

                    return (
                        <div
                            key={event.id ?? index}
                            className="flex border-b border-(--cardBord) px-4 py-2 justify-between items-center gap-4"
                        >

                            <span className="text-sm text-(--muted)">
                                {event.timestamp}
                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-xs ${severidadeStyle[severidade]}`}
                            >
                                {event.event_type}
                            </span>

                            <span className="text-sm text-(--muted)">
                                {event.user}
                            </span>

                            <span className="text-sm text-(--muted)">
                                @ {event.ip}
                            </span>

                            <span className="text-sm text-(--muted)">
                                tentativa {event.attempts}
                            </span>

                        </div>
                    );
                })}

            </div>
            <div className="shrink-0 p-4 border rounded-b-md border-(--cardBord)"></div>
        </div>
    )
}