import React from "react";
import PivotDataRow from "./PivotDataRow";
import PivotRowSubTotal from "./PivotRowSubTotal";

const PivotRowGroup = ({
  rowKey,

  data,
  config,
  aggregator,
  rowKeysTree,
  colKeys,
  rowTotals,
  colTotals,
}) => {
  const rowSubKeys = Object.keys(rowKeysTree[rowKey]).sort();
  // list all sub categories followed by a subtotal row
  return [
    rowSubKeys.map((rowSubKey, index) => {
      const rowKeyArr = [rowKey, rowSubKey];
      return (
        <PivotDataRow
          rowKeyArr={rowKeyArr}
          index={index}
          data={data}
          config={config}
          aggregator={aggregator}
          colKeys={colKeys}
          rowTotals={rowTotals}
          key={`row-${index}`}
        />
      );
    }),
    <PivotRowSubTotal
      rowKey={rowKey}
      aggregator={aggregator}
      colKeys={colKeys}
      rowTotals={rowTotals}
      colTotals={colTotals}
      key={`subtotal-${rowKey}`}
    />,
  ];
};

export default PivotRowGroup;
