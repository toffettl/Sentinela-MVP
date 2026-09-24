const getSeveridadeByRisco = (risco) => {
    const pontos = Number(risco);

    if (pontos >= 75) return "CRITICAL";
    if (pontos >= 50) return "HIGH";
    if (pontos >= 25) return "MEDIUM";

    return "LOW";
};

const severidadeStyle = {
    LOW: "bg-green-900 text-green-400",
    MEDIUM: "bg-yellow-900 text-yellow-400",
    HIGH: "bg-orange-900 text-orange-400",
    CRITICAL: "bg-red-900 text-red-400",
};

const statusConfig = {
    OPEN: {
        label: "Aberto",
        className: "bg-red-600",
    },
    PROGRESS: {
        label: "Investigação",
        className: "bg-yellow-600",
    },
    RESOLVED: {
        label: "Resolvido",
        className: "bg-green-600",
    },
};

export default function RecentAlerts({ data = [] }) {
    return (
        <div className="flex flex-col w-full h-full rounded-md bg-(--card) border border-(--border)">

            <div className="shrink-0 flex justify-between p-4 border rounded-t-md border-(--cardBord)">
                <h1 className="text-lg text-foreground">
                    Incidentes recentes
                </h1>

                <a href="/alerts">
                    Ver todos →
                </a>
            </div>


            <div className="flex-1 max-h-75 overflow-y-auto scrollbar-thumb-(--scrollbarColor)">

                <table className="w-full table-auto text-left">

                    {/* Cabeçalho */}
                    <thead className="sticky top-0 z-10 bg-(--card)">
                        <tr className="border-b border-(--cardBord)">

                            <th className="px-4 py-2 text-sm text-(--muted)">
                                ID
                            </th>

                            <th className="px-4 py-2 text-sm text-(--muted)">
                                Título
                            </th>

                            <th className="px-4 py-2 text-sm text-(--muted)">
                                Ativo
                            </th>

                            <th className="px-4 py-2 text-sm text-(--muted)">
                                Severidade
                            </th>

                            <th className="px-4 py-2 text-sm text-(--muted)">
                                Risco
                            </th>

                            <th className="px-4 py-2 text-sm text-(--muted)">
                                Status
                            </th>

                        </tr>
                    </thead>


                    <tbody>

                        {[...data]
                        .sort((a, b) => Number(b.id) - Number(a.id))
                        .map((section) => {

                            const severidade = getSeveridadeByRisco(
                                section.riskScore
                            );

                            return (
                                <tr
                                    key={section.id}
                                    className="border-b border-(--cardBord)"
                                >

                                    <td className="px-4 py-2 text-md text-foreground">
                                        #{section.id}
                                    </td>

                                    <td className="max-w-42 px-4 py-2 text-md text-foreground whitespace-normal wrap-break-word">
                                        {section.title}
                                    </td>

                                    <td className="px-4 py-2 text-md text-foreground">
                                        {section.ipInvolved}
                                    </td>

                                    <td className="px-2 py-1 text-md">
                                        <span
                                            className={`px-4 py-2 rounded-full ${severidadeStyle[severidade]
                                                }`}
                                        >
                                            {severidade}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2 text-md text-foreground">
                                        {section.riskScore}
                                    </td>

                                    <td className="px-4 py-2 text-md text-(--muted)">
                                        <span className="flex items-center gap-2">

                                            <span
                                                className={`inline-block h-2 w-2 rounded-full ${statusConfig[
                                                    section.status
                                                ]?.className
                                                    }`}
                                            />

                                            {
                                                statusConfig[
                                                    section.status
                                                ]?.label
                                            }

                                        </span>
                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>
            <div className="shrink-0 p-4 border-t rounded-b-md border-(--cardBord)" />

        </div>
    );
}