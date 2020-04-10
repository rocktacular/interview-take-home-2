import React, { useState, useEffect } from "react";
import PivotTable from "./components/PivotTable";

import DS from "./services/data.service";
import makePivot from "./utils/makePivot";

import "./App.css";

// Pivot Table Config
// could eventually be selectable from dropdowns and moved into state, then recompute the pivot table on change
const initConfig = {
  row: ["category", "subCategory"],
  column: "region",
  metric: "sales",
  aggregator: "sum",
};

function App() {
  const [config] = useState(initConfig);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    // load data on mount
    setLoading(true);
    DS.getData().then((data) => {
      // create the pivot table from data
      const summaryObj = makePivot(
        data,
        config.row,
        config.column,
        config.metric
      );
      // update state with pivot table object
      console.log("summaryObj", summaryObj);
      setLoading(false);
      setData(summaryObj);
    });
  }, [config.row, config.column, config.metric]);

  return (
    <div className="App">
      <h2>PIVOT TABLE</h2>
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <PivotTable
          data={data.summary}
          rowKeysTree={data.rowKeysTree}
          colKeys={data.colKeys}
          aggregator={config.aggregator}
          colTotals={data.colTotals}
          rowTotals={data.rowTotals}
          grandTotal={data.grandTotal}
          config={config}
        />
      )}
    </div>
  );
}

export default App;
