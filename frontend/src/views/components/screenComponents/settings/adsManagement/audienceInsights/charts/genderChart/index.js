import React, { useState } from "react";
import Chart from "react-apexcharts";
const VARIANT_DESC = {
  blue: {
    baseColor: "#0493A3",
    secColor: "#E6F4F6",
  },
  red: {
    baseColor: "#FD6769",
    secColor: "#FFE1E1",
  },
  yellow: {
    baseColor: "#F0D800",
    secColor: "#FCF7CC",
  },
};
const GenderChart = (props) => {
  const { variant, label } = props;
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: "radialBar",
        height: 350,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "45%",
          },
          track: {
            background: VARIANT_DESC[variant].secColor,
          },
          dataLabels: {
            showOn: "false",
            name: {
              show: false,
            },
            value: {
              formatter: function (val) {
                return val + "%";
              },
              color: VARIANT_DESC[variant].baseColor,
              fontWeight: 900,
              fontSize: "20",
              offsetY: 10,
              show: true,
            },
          },
        },
      },

      fill: {
        colors: VARIANT_DESC[variant].baseColor,
      },
      series: [75],
    },
  });

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Chart
          options={chartData.options}
          series={chartData.options.series}
          type="radialBar"
          height={150}
          width="30%"
        />
      </div>
      <div className="py-3 flex flex-row items-center justify-center">
        <div
          className={` w-[10px] h-[10px] rounded mr-2`}
          style={{ background: VARIANT_DESC[variant].baseColor }}
        ></div>
        <div>{label}</div>
      </div>
    </div>
  );
};

export default GenderChart;
