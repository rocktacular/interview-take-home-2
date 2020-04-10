import React from "react";
import { get } from "lodash";
import Row from "./Row";

const PivotDataRow = ({
  data,
  rowKeyArr,
  index,
  config,
  colKeys,
  aggregator,
  rowTotals,
}) => {
  if (!aggregator) return null;

  // create data row
  const rowKey = rowKeyArr.join("-");
  const dataRow = colKeys.map((colName) => {
    return get(data, [rowKey, colName, aggregator], 0);
  });

  // assemble with group name, row name, data, and total
  const startRow = [];
  const rowDepth = get(config, "row.length");
  if (rowDepth === 2) {
    if (index === 0) {
      startRow.push(...rowKeyArr);
    } else {
      startRow.push("", rowKeyArr[1]);
    }
  } else if (rowDepth === 1) {
    startRow.push(rowKeyArr[0]);
  }

  const newRow = [...startRow].concat(...dataRow);
  newRow.push(rowTotals[rowKey][aggregator]);
  return <Row row={newRow} key={`row-${index}`} />;
};

export default PivotDataRow;
