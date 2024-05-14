import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis, // Import YAxis component
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", Total: 8000 },
  { name: "February", Total: 9200 },
  { name: "March", Total: 7500 },
  { name: "April", Total: 12000 },
  { name: "May", Total: 14200 },
  { name: "June", Total: 17000 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">Last 6 months</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis stroke="gray" /> {/* Add YAxis component */}
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
