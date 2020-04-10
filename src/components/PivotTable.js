import React from "react";
import { get } from "lodash";
import Row from "./Row";
import PivotHeaderRow from "./PivotHeaderRow";
import PivotFooterRow from "./PivotFooterRow";
import PivotDataRow from "./PivotDataRow";

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
          renderRowSubTotal(rowKey),
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

  const renderRowSubTotal = (rowKey) => {
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
