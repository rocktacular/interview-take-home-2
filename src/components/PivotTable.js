import React from "react";
import Row from "./Row";

const PivotTable = ({
  data,
  rowKeys,
  colKeys,
  aggregator = "sum",
  colTotals,
  rowTotals,
  grandTotal,
}) => {
  const renderHeader = () => {
    if (!colKeys) return null;

    // assemble row values, pass with header flag
    const newRow = [...colKeys, "TOTAL"];
    return <Row row={newRow} header={true} />;
  };
  const renderRows = () => {
    if (!data || !rowKeys || !colKeys) return null;

    return rowKeys.map((rowName, index) => {
      return renderRow(rowName, index);
    });
  };
  const renderRow = (rowName, index) => {
    if (!rowName || !aggregator) return null;

    // create data row
    const dataRow = colKeys.map((colName) => {
      return data[rowName][colName][aggregator] || 0;
    });
    // assemble with row name (start of arr) and total (end of arr)
    const newRow = [rowName].concat(...dataRow);
    newRow.push(rowTotals[rowName][aggregator]);
    return <Row row={newRow} key={`row-${index}`} />;
  };
  const renderRowTotals = () => {
    if (!colKeys || !colTotals || !grandTotal[aggregator]) return null;

    // create data row
    const dataRow = colKeys.map((colName) => {
      return colTotals[colName][aggregator] || 0;
    });
    // assemble with row name (start of arr) and total (end of arr)
    const newRow = ["TOTAL"].concat(...dataRow);
    newRow.push(grandTotal[aggregator]);
    return <Row row={newRow} key="col-totals" />;
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
