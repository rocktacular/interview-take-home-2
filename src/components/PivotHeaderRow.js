import React from "react";
import Row from "./Row";

const PivotHeaderRow = ({ colKeys, config }) => {
  if (!colKeys) return null;

  // assemble row values, pass with header flag
  const newRow = [...config.row, ...colKeys, "Total"];
  return <Row row={newRow} header={true} />;
};

export default PivotHeaderRow;
