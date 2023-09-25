import { useMediaQuery } from "@mui/material";
import React from "react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SaleChart = () => {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 11000,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Sep",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Oct",
      uv: 3490,
      pv: 11000,
      amt: 2100,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Nov",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Dec",
      uv: 3490,
      pv: 11000,
      amt: 2100,
    },
  ];
  const isMidScreens = useMediaQuery("(min-width:700px)");
  const isMidScreens2 = useMediaQuery("(min-width:400px)");
  return (
    <>
      <ResponsiveContainer width={isMidScreens?700:"100%"} height={700} aspect={isMidScreens?4/2:(isMidScreens2)?4 / 3:4/4}>
        <LineChart
          
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="red" />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default SaleChart;
