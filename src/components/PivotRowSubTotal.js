import React from "react";
import { get } from "lodash";
import Row from "./Row";

const PivotRowSubTotal = ({
  rowKey,
  colKeys,
  rowTotals,
  colTotals,
  aggregator,
}) => {
  // prepare subtotal row
  const newRow = [`${rowKey} Total`, ""];

  const dataRow = colKeys.map((colKey) => {
    const flatKey = rowKey + "-" + colKey;
    return get(colTotals, [flatKey, aggregator], 0);
  });
  newRow.push(...dataRow);
  newRow.push(rowTotals[rowKey][aggregator]);
  return <Row row={newRow} key={`subtotal-${rowKey}`} />;
};

export default PivotRowSubTotal;
