import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType, worldWide) => {
  let chartData = [];
  let lastDataPoint;
  let dateArray = data.cases ? data.cases : data.timeline.cases;
  for (let date in dateArray) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: worldWide
          ? data[casesType][date] - lastDataPoint
          : data.timeline[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = worldWide
      ? data[casesType][date]
      : data.timeline[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, worldWide, country }) {
  const [data, setData] = useState({});

  const fetchData = async (worldWide, country, casesType) => {
    const endpoint = worldWide === true ? "all" : country;
    await fetch(
      `https://disease.sh/v3/covid-19/historical/${endpoint}?lastdays=120`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let chartData = buildChartData(data, casesType, worldWide);
        setData(chartData);
      });
  };

  useEffect(() => {
    fetchData(worldWide, country, casesType);
  }, [casesType, worldWide, country]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
