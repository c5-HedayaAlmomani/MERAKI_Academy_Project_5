import React from "react";
import "./style.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

export const Chart = () => {
  const data = [
    { name: "Users", users: 2000000000 },
    { name: "Product", users: 1200000000 },
    { name: "Orders", users: 1700000000 },
    { name: "Brands", users: 600000000 },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <div className="Apppp">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="rgb(20, 136, 88)"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="users"
            fill="rgb(20, 136, 88)"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </div>
    </div>
  );
};
