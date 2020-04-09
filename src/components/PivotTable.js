import React from "react";
import Row from "./Row";

const PivotTable = ({
  data,
  rowNames,
  colNames,
  aggregator = "sum",
  colTotals,
  rowTotals,
  grandTotal,
}) => {
  const renderHeader = () => {
    return colNames && <Row colNames={[...colNames, "TOTAL"]} />;
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
    newRow.push(rowTotals[rowName]);
    return <Row row={newRow} key={`row-${index}`} aggregator={aggregator} />;
  };
  const renderRowTotals = () => {
    let newRow = ["TOTAL"];
    // push data onto row
    const dataRow = colNames.map((colName) => {
      return colTotals[colName] || 0;
    });
    newRow = newRow.concat(dataRow);
    newRow.push(grandTotal);
    return <Row row={newRow} key="col-totals" aggregator={aggregator} />;
  };
  return (
    <div>
      <table>
        <thead>{renderHeader()}</thead>
        <tbody>{[renderRows(), colTotals && renderRowTotals()]}</tbody>
      </table>
    </div>
  );
};

export default PivotTable;
