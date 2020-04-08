import React, { useState, useEffect } from "react";
import makePivot from "./utils/makePivot";
import DS from "./services/data.service";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // load data on mount
  useEffect(() => {
    setLoading(true);
    DS.getData().then((data) => {
      makePivot(data, "category", "state", "cars").then((summary) => {
        console.log("summary", summary);
        setLoading(false);
        setData(data);
      });
    });
  }, []);

  return (
    <div className="App">
      <div>PIVOT TABLE</div>
      {loading && <h1>LOADING</h1>}
      {!loading &&
        data.map((item, index) => {
          return (
            <div key={`data-${index}`}>
              {item.family} - {item.cars} ({item.state})
            </div>
          );
        })}
    </div>
  );
}

export default App;
