import React from "react";
import PivotDataRow from "./PivotDataRow";
import PivotRowSubTotal from "./PivotRowSubTotal";

const PivotRowGroup = ({
  data,
  config,
  rowKey,
  rowKeysTree,
  colKeys,
  rowTotals,
  colTotals,
  aggregator,
}) => {
  const rowSubKeys = Object.keys(rowKeysTree[rowKey]).sort();
  // list all sub categories followed by a subtotal row
  return [
    rowSubKeys.map((rowSubKey, index) => {
      const rowKeyArr = [rowKey, rowSubKey];
      return (
        <PivotDataRow
          data={data}
          config={config}
          rowKeyArr={rowKeyArr}
          index={index}
          aggregator={aggregator}
          colKeys={colKeys}
          rowTotals={rowTotals}
          key={`row-${index}`}
        />
      );
    }),
    <PivotRowSubTotal
      rowKey={rowKey}
      colKeys={colKeys}
      rowTotals={rowTotals}
      colTotals={colTotals}
      aggregator={aggregator}
      key={`subtotal-${rowKey}`}
    />,
  ];
};

export default PivotRowGroup;
