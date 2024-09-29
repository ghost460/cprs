import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DiseaseCategoryChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Disease Category Count",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/diseasecategory"
        );
        const data = response.data;

        // Extract labels (disease categories) and values (counts)
        const labels = data.map((item) => item.diseasecatagory);
        const counts = data.map((item) => item._count.diseasecatagory);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Disease Category Count",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching disease statistics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Disease Category Statistics</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Disease Category Distribution",
            },
          },
        }}
      />
    </div>
  );
};

export default DiseaseCategoryChart;
