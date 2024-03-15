import Chart from "chart.js/auto";
import React from "react";
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Expenses tracker 2024",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const expanse = [100, 123, 100, 123, 100, 123, 100, 123, 100, 123, 100, 100];
const income = [100, 80, 100, 123, 100, 123, 100, 123, 123, 100, 123, 100];

export const barData = {
  labels,
  datasets: [
    {
      label: "Expanse",
      data: expanse,
      backgroundColor: "green",
      stack: "Stack 0",
    },
    {
      label: "Income",
      data: income,
      backgroundColor: "orange",
      stack: "Stack 1",
    },
  ],
};

export const piedata = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
      borderWidth: 1,
    },
  ],
};
export function BarChart() {
  return (
    <div className="container mx-auto border mt-10 px-5 py-5 xl:py-8 xl:px-[250px]">
      <div className="flex gap-5">
        <div className="border w-[588px] h-[226px] rounded-md justify-center items-center flex">
          <Bar options={options} data={barData} />
        </div>
        <div className="border w-[588px] h-[226px] rounded-md justify-center items-center flex">
          {" "}
          <Pie data={piedata} />
        </div>
      </div>
    </div>
  );
}

export default BarChart;
