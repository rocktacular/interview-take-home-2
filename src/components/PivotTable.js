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
  config,
}) => {
  const renderHeader = () => {
    if (!colKeys) return null;

    // assemble row values, pass with header flag
    const newRow = [...config.row, ...colKeys, "Total"];
    return <Row row={newRow} header={true} />;
  };
  const renderRows = () => {
    if (!data || !rowKeys || !colKeys) return null;

    return rowKeys.map((rowKeyArr, index) => {
      return renderRow(rowKeyArr, index);
    });
  };
  const renderRow = (rowKeyArr, index) => {
    if (!rowKeyArr || !aggregator) return null;

    // create data row
    const rowKey = rowKeyArr.join("-");
    const dataRow = colKeys.map((colName) => {
      return data[rowKey][colName][aggregator] || 0;
    });
    // assemble with row name (start of arr) and total (end of arr)
    const newRow = [...rowKeyArr].concat(...dataRow);
    newRow.push(rowTotals[rowKey][aggregator]);
    return <Row row={newRow} key={`row-${index}`} />;
  };
  const renderRowTotals = () => {
    if (!colKeys || !colTotals || !grandTotal[aggregator]) return null;

    // create data row
    const dataRow = colKeys.map((colName) => {
      return colTotals[colName][aggregator] || 0;
    });

    // assemble with row name, any spaces, row totals, and grand total
    const newRow = config.row.map(() => "");
    newRow[0] = "Grand Total";
    newRow.push(...dataRow);
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
