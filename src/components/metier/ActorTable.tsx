interface ActorRow {
  actor: string;
  role: string;
  networkRole: string;
}

export function ActorTable({ rows }: { rows: ActorRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-card">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-black/5 bg-cream">
            <th className="px-5 py-4 font-semibold text-heading">Acteur</th>
            <th className="px-5 py-4 font-semibold text-heading">Rôle métier</th>
            <th className="px-5 py-4 font-semibold text-heading">Rôle réseau</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.actor} className="border-b border-black/5 last:border-0">
              <td className="px-5 py-4 font-medium">{row.actor}</td>
              <td className="px-5 py-4 text-ink/80">{row.role}</td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {row.networkRole}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
