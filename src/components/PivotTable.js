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
    if (!colNames) return null;

    return <Row colNames={[...colNames, "TOTAL"]} />;
  };
  const renderRows = () => {
    if (!data || !rowNames || !colNames) return null;

    return rowNames.map((rowName, index) => {
      return renderRow(rowName, index);
    });
  };
  const renderRow = (rowName, index) => {
    if (!rowName || !aggregator) return null;

    // create data row
    const dataRow = colNames.map((colName) => {
      return data[rowName][colName] || 0;
    });
    // assemble with row name (start of arr) and total (end of arr)
    const newRow = [rowName].concat(...dataRow);
    newRow.push(rowTotals[rowName]);
    return <Row row={newRow} key={`row-${index}`} aggregator={aggregator} />;
  };
  const renderRowTotals = () => {
    if (!colNames || !colTotals || !grandTotal[aggregator]) return null;

    // create data row
    const dataRow = colNames.map((colName) => {
      return colTotals[colName] || 0;
    });
    // assemble with row name (start of arr) and total (end of arr)
    const newRow = ["TOTAL"].concat(...dataRow);
    newRow.push(grandTotal);
    return <Row row={newRow} key="col-totals" aggregator={aggregator} />;
  };
  return (
    <div>
      <table>
        <thead>{renderHeader()}</thead>
        <tbody>{[renderRows(), renderRowTotals()]}</tbody>
      </table>
    </div>
  );
};

export default PivotTable;
