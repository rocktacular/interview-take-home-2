import React from "react";
import Row from "./Row";

const PivotTable = ({ data, rows, columns, aggregator }) => {
  const renderHeader = () => {
    return <Row columns={columns} />;
  };
  const renderRows = () => {
    return (
      data &&
      rows &&
      columns &&
      rows.map((row, index) => {
        return renderRow(row, index);
      })
    );
  };
  const renderRow = (row, index) => {
    let newRow = [row];
    const dataRow = columns.map((col) => {
      return data[row][col] || 0;
    });
    newRow = newRow.concat(dataRow);
    return <Row row={newRow} key={`row-${index}`} aggregator={aggregator} />;
  };
  return (
    <div>
      <table>
        <thead>{renderHeader(columns)}</thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default PivotTable;
