import React, { useState } from "react";
import Chart from "react-apexcharts";
const AgeChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
          borderRadiusApplication: "end",
          columnWidth: "50%",
        },
      },
      colors: "#0493A3",
      dataLabels: {
        enabled: false,
      },

      xaxis: {
        categories: ["18-25", "26-40", "41-65", "Above 65"],
        labels: {
          style: {
            colors: "#949494",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#949494",
          },
        },
      },
      grid: {
        show: false,
      },
    },
    series: [
      {
        name: "series-1",
        data: [4500, 4000, 3500, 3000],
      },
    ],
  });

  return (
    <div style={{ width: "100%" }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={200}
        width="100%"
      />
    </div>
  );
};

export default AgeChart;
