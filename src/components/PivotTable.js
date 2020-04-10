import React from "react";
import { get } from "lodash";
import PivotHeaderRow from "./PivotHeaderRow";
import PivotFooterRow from "./PivotFooterRow";
import PivotDataRow from "./PivotDataRow";
import PivotRowGroup from "./PivotRowGroup";

const PivotTable = ({
  data,
  rowKeysTree,
  colKeys,
  aggregator = "sum",
  colTotals,
  rowTotals,
  grandTotal,
  config,
}) => {
  const renderRowGroups = () => {
    if (!data || !rowKeysTree || !colKeys) return null;

    // TODO: make this traverse the data structure to handle any depth
    const rowKeys = Object.keys(rowKeysTree).sort();
    const rowDepth = get(config, "row.length");
    if (rowDepth === 2) {
      // iterate over children and show subtotal row
      return rowKeys.map((rowKey, index) => {
        return (
          <PivotRowGroup
            data={data}
            config={config}
            rowKeysTree={rowKeysTree}
            colKeys={colKeys}
            rowKey={rowKey}
            rowTotals={rowTotals}
            colTotals={colTotals}
            aggregator={aggregator}
            key={`row-group-${index}`}
          />
        );
      });
    } else if (rowDepth === 1) {
      // iterate only over top level keys
      return rowKeys.map((rowKey, index) => {
        return (
          <PivotDataRow
            data={data}
            config={config}
            rowKeyArr={[rowKey]}
            index={index}
            aggregator={aggregator}
            colKeys={colKeys}
            rowTotals={rowTotals}
          />
        );
      });
    }
  };

  return (
    <div>
      <table>
        <thead>
          <PivotHeaderRow colKeys={colKeys} config={config} />
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
