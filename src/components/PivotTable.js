import React from "react";
import PivotHeaderRow from "./PivotHeaderRow";
import PivotFooterRow from "./PivotFooterRow";
import PivotDataRow from "./PivotDataRow";
import PivotRowSubTotal from "./PivotRowSubTotal";

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
    const rowDepth = config.row.length;
    if (rowDepth === 2) {
      // iterate over children and show subtotal row
      return rowKeys.map((rowKey, index) => {
        const rowSubKeys = Object.keys(rowKeysTree[rowKey]).sort();
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
              />
            );
          }),
          <PivotRowSubTotal
            rowKey={rowKey}
            colKeys={colKeys}
            rowTotals={rowTotals}
            colTotals={colTotals}
            aggregator={aggregator}
          />,
        ];
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
