import { useEffect, useState } from 'react';

export function useRealTimeMarketData() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket('wss://edge.arbitragex.dev/stream');
    
    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    return () => ws.close();
  }, []);

  return data;
}
