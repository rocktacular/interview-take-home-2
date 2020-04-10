import React from "react";
import { get } from "lodash";
import Row from "./Row";

const PivotFooterRow = ({
  config,
  colKeys,
  colTotals,
  grandTotal,
  aggregator,
}) => {
  if (!colKeys || !colTotals || !grandTotal[aggregator]) return null;

  // create data row
  const dataRow = colKeys.map((colName) => {
    return get(colTotals, [colName, aggregator], 0);
  });

  // assemble with row name, any spaces, row totals, and grand total
  const newRow = config.row.map(() => "");
  newRow[0] = "Grand Total";
  newRow.push(...dataRow);
  newRow.push(grandTotal[aggregator]);
  return <Row row={newRow} key="col-totals" />;
};

export default PivotFooterRow;
