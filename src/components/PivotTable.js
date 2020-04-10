import React from "react";
import { get } from "lodash";
import Row from "./Row";

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
  const renderHeader = () => {
    if (!colKeys) return null;

    // assemble row values, pass with header flag
    const newRow = [...config.row, ...colKeys, "Total"];
    return <Row row={newRow} header={true} />;
  };

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
            return renderRow(rowKeyArr, index);
          }),
          renderRowSubTotal(rowKey),
        ];
      });
    } else if (rowDepth === 1) {
      // iterate only over top level keys
      return rowKeys.map((rowKey, index) => {
        return renderRow([rowKey], index);
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

  const renderRow = (rowKeyArr, index) => {
    if (!rowKeyArr || !aggregator) return null;

    // create data row
    const rowKey = rowKeyArr.join("-");
    const dataRow = colKeys.map((colName) => {
      return get(data, [rowKey, colName, aggregator], 0);
    });

    // assemble with group name, row name, data, and total
    const startRow = [];
    const rowDepth = config.row.length;
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

  const renderRowTotals = () => {
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

  return (
    <div>
      <table>
        <thead>{renderHeader()}</thead>
        <tbody>{[renderRowGroups(), renderRowTotals()]}</tbody>
      </table>
    </div>
  );
};

export default PivotTable;
