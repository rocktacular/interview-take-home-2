import React from "react";
import { get } from "lodash";
import PivotHeaderRow from "./PivotHeaderRow";
import PivotFooterRow from "./PivotFooterRow";
import PivotDataRow from "./PivotDataRow";
import PivotRowGroup from "./PivotRowGroup";

const PivotTable = ({
  data,
  config,
  aggregator = "sum",
  rowKeysTree,
  colKeys,
  rowTotals,
  colTotals,
  grandTotal,
}) => {
  const renderRowGroups = () => {
    if (!data || !rowKeysTree || !colKeys) return null;

    // TODO: convert to traverse the data structure to handle any depth
    const rowKeys = Object.keys(rowKeysTree).sort();
    const rowDepth = get(config, "row.length");
    if (rowDepth === 2) {
      // iterate over children and show subtotal row
      return rowKeys.map((rowKey, index) => {
        return (
          <PivotRowGroup
            rowKey={rowKey}
            data={data}
            config={config}
            aggregator={aggregator}
            rowKeysTree={rowKeysTree}
            colKeys={colKeys}
            rowTotals={rowTotals}
            colTotals={colTotals}
            key={`row-group-${index}`}
          />
        );
      });
    } else if (rowDepth === 1) {
      // iterate only over top level keys
      return rowKeys.map((rowKey, index) => {
        return (
          <PivotDataRow
            rowKeyArr={[rowKey]}
            index={index}
            data={data}
            config={config}
            aggregator={aggregator}
            colKeys={colKeys}
            rowTotals={rowTotals}
            key={`row-${rowKey}`}
          />
        );
      });
    }
  };

  return (
    <div>
      <table>
        <thead>
          <PivotHeaderRow config={config} colKeys={colKeys} />
        </thead>
        <tbody>
          {renderRowGroups()}
          <PivotFooterRow
            config={config}
            colKeys={colKeys}
            colTotals={colTotals}
            grandTotal={grandTotal}
            aggregator={aggregator}
          />
        </tbody>
      </table>
    </div>
  );
};

export default PivotTable;
