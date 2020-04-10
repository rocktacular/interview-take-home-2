import { set } from "lodash";

const makePivot = (data, row_pred, col_pred, metric) => {
  const values = {};
  const rowKeysTree = {};
  const colKeys = [];
  const initialAgg = { sum: 0 }; // enables other aggregators: sum, count, percent of total, etc...
  const colTotals = {};
  const rowTotals = {};
  const grandTotal = { ...initialAgg };
  const rowDepth = row_pred.length;

  data.forEach((item) => {
    // create combo row keys and column keys based on config
    const itemRowKeys = [];
    row_pred.forEach((pred) => {
      itemRowKeys.push(item[pred]);
    });

    const rowKey = itemRowKeys.join("-");
    const colKey = item[col_pred];

    // --------------------------------------------
    // DATA GRID
    // if row doesnt exist on values yet
    if (!values[rowKey]) {
      values[rowKey] = {};
    }
    // if row.col doesnt exist on values yet
    if (!values[rowKey][colKey]) {
      values[rowKey][colKey] = { ...initialAgg }; // copy instead of reference
      colKeys.push(colKey);
    }

    // --------------------------------------------
    // ROW KEYS TREE
    set(rowKeysTree, [...itemRowKeys], true); // build out row keys hierarchy

    // --------------------------------------------
    // ROW & COLUMN TOTALS
    // initialize column totals
    if (!colTotals[colKey]) {
      colTotals[colKey] = { ...initialAgg };
    }
    // initialize row totals
    if (!rowTotals[rowKey]) {
      rowTotals[rowKey] = { ...initialAgg };
    }

    // initialize subtotal rows & columns if rowDepth > 1
    const subTotalRowKeys = [...itemRowKeys];

    // TODO: for loop to subtotal across all depths?
    subTotalRowKeys.pop(); // subtotals for rowDepth - 1

    const subTotalRowKeysFlat = subTotalRowKeys.join("-");
    const subTotalColKeysFlat = subTotalRowKeysFlat
      ? subTotalRowKeysFlat + "-" + colKey
      : undefined;
    if (subTotalColKeysFlat && !colTotals[subTotalColKeysFlat]) {
      colTotals[subTotalColKeysFlat] = { ...initialAgg };
    }
    if (subTotalRowKeysFlat && !rowTotals[subTotalRowKeysFlat]) {
      rowTotals[subTotalRowKeysFlat] = { ...initialAgg };
    }

    // --------------------------------------------
    // AGGREGATE
    // add metric value to row.col sum aggregation
    values[rowKey][colKey].sum += item[metric];
    colTotals[colKey].sum += item[metric];
    rowTotals[rowKey].sum += item[metric];
    grandTotal.sum += item[metric];

    // aggregate subtotals
    if (subTotalColKeysFlat) {
      colTotals[subTotalColKeysFlat].sum += item[metric];
    }
    if (subTotalRowKeysFlat) {
      rowTotals[subTotalRowKeysFlat].sum += item[metric];
    }
  });

  // --------------------------------------------
  // ASSEMBLE FINAL OBJECT
  const valuesObj = {
    values,
    rowKeysTree,
    colKeys: [...new Set(colKeys)].sort(), // make colKeys unique using Set
    colTotals,
    rowTotals,
    grandTotal,
  };

  return valuesObj;
};

export default makePivot;
