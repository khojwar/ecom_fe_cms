export interface statCardProps { title: string; value: string | number; subtitle?: string }

const StatCard = ({ title, value, subtitle }: statCardProps) => (
  <div className="bg-white  rounded-2xl shadow p-4 w-full">
    <div className="text-sm font-medium text-slate-500">{title}</div>
    <div className="mt-2 text-2xl font-semibold">{value}</div>
    {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
  </div>
);

export default StatCard;
