import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  selectedCruptoName: string | null,
  BASE_URL: string,
  APIkey: string
}

export const CryptoChart: React.FC<Props> = ({ selectedCruptoName, BASE_URL, APIkey }) => {
  const [history, setHistory] = useState([])
  
  useEffect(() => {
    fetch(`${BASE_URL}exchangerate/BTC/USD/history?apikey=${APIkey}&period_id=1DAY&time_start=2022-05-01T00:00:00`)
    .then(responce => responce.json())
    .then(data => {
      setHistory(data);
    })
  }, [APIkey, BASE_URL, selectedCruptoName])
  
  return (
    <div>
      <AreaChart width={800} height={500} data={history}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="rate_open" stroke="#009933" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="rate_close" stroke="#ff0000" fillOpacity={1} fill="url(#colorPv)" />
        <Area type="monotone" dataKey="rate_high" stroke="#0000ff" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="rate_low" stroke="#993399" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </div>
  );
}