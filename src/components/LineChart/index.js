import useData from "../../hooks/DataHooks";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import * as S from './styled';

// Chose the react-chartjs-2 because it's easier to code than others chart libs

function LineChart() {
  // Chart initialization
  Chart.register(...registerables);

  // Catch the data Context using useData hook
  const { dataState } = useData();

  // Creates a state for managing chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Improving Chart visualization
  const options = {
    // Keep the height in the same value while resizing pane
    maintainAspectRatio: false,

    layout: {
      padding: 30,
    },

    elements: {
      point: {
        radius: 5,
      },
      line: {
        borderWidth: 2,
      },
    },

    plugins: {
      legend: {
        display: true,
        position: "right",
        align: "start",
        maxWidth: 240,
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
          pointStyleWidth: 15,
          pointStyleHeight: 15,
        },
      },
    },
  };

  // Creates two arrays to hold labels and datasets
  // For after setting the chartState
  let labelsToAdd = [];
  let datasetsToAdd = [];

  // Updates the Chart on the change of the Context
  useEffect(() => {
    // Variables to keep random colors for the Chart
    var randomColor1;
    var randomColor2;

    for (let group in dataState.data) {
      // Creates a set to compare minimum values of the group
      let setMin = {};
      
      // Randomize colors in 20 quantums for having not too similar colors
      randomColor1 = (Math.round(Math.random() * 20) / 20.0) * 255;
      randomColor2 = (Math.round(Math.random() * 20) / 20.0) * 255;
      
      // Initialize the set of minimums
      setMin.label = group + " Min Response Time";
      setMin.data = [];
      setMin.fill = false;
      setMin.backgroundColor = `rgb(${randomColor1},100,${randomColor2})`;
      setMin.borderColor = `rgb(${randomColor1},100,${randomColor2})`;
      
      // Creates a set to compare maximum values of the group
      let setMax = {};

      // Randomize colors again
      randomColor1 = (Math.round(Math.random() * 20) / 20.0) * 255;
      randomColor2 = (Math.round(Math.random() * 20) / 20.0) * 255;

      // Initialize the set of maximums
      setMax.label = group + " Max Response Time";
      setMax.data = [];
      setMax.fill = false;
      setMax.backgroundColor = `rgb(100,${randomColor1},${randomColor2})`;
      setMax.borderColor = `rgb(100,${randomColor1},${randomColor2})`;

      dataState.data[group].forEach((element) => {
        // Fill the labels array for setting chart labels 
        if (!labelsToAdd.includes(element[0])) labelsToAdd.push(element[0]);
        
        // Fill the max and min sets
        setMin.data.push(element[1]);
        setMax.data.push(element[2]);
      });

      // Fill the datasets array for setting chart datasets
      datasetsToAdd.push(setMin);
      datasetsToAdd.push(setMax);
    }

    // Sets the chart data
    setChartData((prevState) => ({
      ...prevState,
      labels: labelsToAdd,
      datasets: datasetsToAdd,
    }));
  }, [dataState]);

  // Print a message on the screen while waiting for chart data
  return (
    <S.Container>
      {chartData.datasets.length === 0 ? (
        <p>Waiting data...</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </S.Container>
  );
}

export default LineChart;
