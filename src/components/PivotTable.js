import React from "react";
import Row from "./Row";

const PivotTable = ({ data, rowNames, colNames, aggregator = "sum" }) => {
  const renderHeader = () => {
    return <Row colNames={colNames} />;
  };
  const renderRows = () => {
    return (
      data &&
      rowNames &&
      colNames &&
      rowNames.map((rowName, index) => {
        return renderRow(rowName, index);
      })
    );
  };
  const renderRow = (rowName, index) => {
    // create row of data
    // start with row name
    let newRow = [rowName];
    // push data onto row
    const dataRow = colNames.map((colName) => {
      return data[rowName][colName] || 0;
    });
    newRow = newRow.concat(dataRow);
    return <Row row={newRow} key={`row-${index}`} aggregator={aggregator} />;
  };
  return (
    <div>
      <table>
        <thead>{renderHeader(colNames)}</thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default PivotTable;
