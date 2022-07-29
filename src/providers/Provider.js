import { createContext, useCallback, useState } from "react";

// Context for all components to use
export const Context = createContext({
  timestamps: [],
  select: [],
  group: [],
  data: {},
});

function Provider({ children }) {
  // Helper state for grabbing data received and pass to Context
  const [dataState, setDataState] = useState({
    timestamps: [],
    select: [],
    group: [],
    data: {},
  });

  // Receives the code given and create the data for visualization
  const getData = (code) => {
    // Creates an array containing all lines of code in strings
    const arrayCode = code.trim().replace(/\n/gm, ";").split(";");
    if (arrayCode[arrayCode.length - 1] === "") {
      arrayCode.pop();
    }

    // Transforms strings into JSON objects
    const arrayObjects = arrayCode.map((element) => {
      var jsonStr = element.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
      });
      return JSON.parse(jsonStr);
    });

    // Limits huge amount of data
    if (arrayObjects.length > 15) {
      return alert("Limit exceeded! The code supports a maximum of 15 lines");
    }

    // Checks if first object given is a starter object
    if (arrayObjects[0].type !== "start") {
      return alert('Start the command lines with a type "start" command');
    }

    // Checks if span is given next
    if (arrayObjects[1].type !== "span") {
      return alert('Enter "span" type command before data commands');
    }

    // Checks if span is given with the same timestamp than starter object
    if (arrayObjects[1].timestamp !== arrayObjects[0].timestamp) {
      return alert(
        "Enter 'span' type command timestamp equal to 'start' type's"
      );
    }

    // Checks if the interval is crescent
    if (arrayObjects[1].end <= arrayObjects[1].begin) {
      return alert("The 'end' timestamp must be higher than 'begin' timestamp");
    }

    // Checks if there are data after the span
    if (arrayObjects[2].type !== "data") {
      return alert("'data' type is required for drawing the chart");
    }

    // Data for setting state
    let data = {};

    // Fill the data object
    for (let i = 2; i < arrayObjects.length; ++i) {
      // Stops when a stop object is found
      if (arrayObjects[i].type === "stop") {
        break;
      }

      // Checks if data object is given
      if (arrayObjects[i].type !== "data") {
        alert("don't use 'start' or 'span' twice in the same command sequence");
        break;
      }

      // Checks if the data command have the correct grouping
      // If it doesn't have, then ignore it
      if (
        !(arrayObjects[0].group[0] in arrayObjects[i]) ||
        !(arrayObjects[0].group[1] in arrayObjects[i])
      ) {
        alert("'data' commands must have the correct grouping");
        continue;
      }

      // Checks  if the data command have the correct select data
      // If it doesn't have, then ignore it
      if (
        !Object.keys(arrayObjects[i]).includes(arrayObjects[0].select[0]) ||
        !Object.keys(arrayObjects[i]).includes(arrayObjects[0].select[1])
      ) {
        alert("'data' commands must have the correct 'select' data");
        continue;
      }

      // Creates the variables for filling the data
      let name = arrayObjects[i].os + " " + arrayObjects[i].browser;
      let timestamp;
      let select1 = arrayObjects[i][arrayObjects[0].select[0]];
      let select2 = arrayObjects[i][arrayObjects[0].select[1]];

      // Transforms timestamp to seconds
      // Sets the first timestamp to zero.
      if (arrayObjects[i].timestamp === arrayObjects[0].timestamp) {
        timestamp = "0.000";
      } else {
        ({ timestamp } = arrayObjects[i]);
        timestamp = (timestamp - arrayObjects[0].timestamp) / 1000;
        timestamp = `${timestamp}`;
      }

      // Fills the data
      if (!!data[name]) {
        let newValue = data[name].concat([[timestamp, select1, select2]]);

        data[name] = newValue;
      } else {
        data[name] = [[timestamp, select1, select2]];
      }
    }

    // Sets the data state using previous data
    setDataState((prevState) => ({
      ...prevState,
      select: arrayObjects[0].select,
      timestamps: [arrayObjects[0].timestamp, arrayObjects[1].end],
      group: arrayObjects[0].group,
      data: data,
    }));
  };

  // Create context value using the state created and the function to acquire data
  const contextValue = {
    dataState,
    getData: useCallback((code) => getData(code), []),
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default Provider;
