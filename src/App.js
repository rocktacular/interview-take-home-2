import React, { useState, useEffect } from "react";
import PivotTable from "./components/PivotTable";

import DS from "./services/data.service";
import makePivot from "./utils/makePivot";

import "./App.css";

// Pivot Table Config
const config = {
  row: "category",
  column: "state",
  metric: "cars",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // load data on mount
    setLoading(true);
    DS.getData().then((data) => {
      // create the pivot table from data
      makePivot(data, config.row, config.column, config.metric).then(
        (summaryObj) => {
          // sort rows and columns
          summaryObj.rows = summaryObj.rows.sort();
          summaryObj.columns = summaryObj.columns.sort();
          // update state with pivot table object
          setLoading(false);
          setData(summaryObj);
        }
      );
    });
  }, []);

  return (
    <div className="App">
      <h2>PIVOT TABLE</h2>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <PivotTable
          data={data.summary}
          rows={data.rows}
          columns={data.columns}
        />
      )}
    </div>
  );
}

export default App;
