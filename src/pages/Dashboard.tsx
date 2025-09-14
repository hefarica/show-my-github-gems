import { useRealTimeMarketData } from '../hooks/useRealTimeMarketData';

export default function Dashboard() {
  const data = useRealTimeMarketData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">ArbitrageX Supreme</h1>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3>Total Profit</h3>
          <p>${data?.profit || 'N/A'}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>Success Rate</h3>
          <p>{data?.successRate || 'N/A'}%</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>Avg Latency</h3>
          <p>{data?.latency || 'N/A'}ms</p>
        </div>
      </div>
    </div>
  );
}
