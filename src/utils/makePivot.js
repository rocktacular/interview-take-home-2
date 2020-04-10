// probably need to make this Async in case large data set

const makePivot = (data, row_pred, col_pred, metric) => {
  const values = {};
  const rowKeysTree = {};
  const colKeys = [];
  const initialAgg = { sum: 0 }; // enables other aggregators: sum, count, percent of total, etc...
  const colTotals = {};
  const rowTotals = {};
  const grandTotal = { ...initialAgg };

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
    // TODO: make this go as deep as itemRowKeys
    if (!rowKeysTree[itemRowKeys[0]]) {
      rowKeysTree[itemRowKeys[0]] = {};
    }
    rowKeysTree[itemRowKeys[0]][itemRowKeys[1]] = true;

    // --------------------------------------------
    // ROW & COLUMN TOTALS
    // initialize column totals
    if (!colTotals[colKey]) {
      colTotals[colKey] = { ...initialAgg };
    }

    // initialize sub total columns if depth > 1
    const subTotalKeys = [...itemRowKeys];
    subTotalKeys.pop(); // subtotals for depth - 1
    const subTotalKeysFlat = subTotalKeys.join("-") + "-" + colKey;
    if (itemRowKeys.length > 1) {
      if (!colTotals[subTotalKeysFlat]) {
        colTotals[subTotalKeysFlat] = { ...initialAgg };
      }
      if (!rowTotals[itemRowKeys[0]]) {
        rowTotals[itemRowKeys[0]] = { ...initialAgg };
      }
    }

    // initialize row totals
    if (!rowTotals[rowKey]) {
      rowTotals[rowKey] = { ...initialAgg };
    }

    // --------------------------------------------
    // AGGREGATE
    // add metric value to row.col sum aggregation
    values[rowKey][colKey].sum += item[metric];
    colTotals[colKey].sum += item[metric];
    rowTotals[rowKey].sum += item[metric];
    rowTotals[itemRowKeys[0]].sum += item[metric];
    grandTotal.sum += item[metric];

    // aggregate subtotals if depth > 1
    if (subTotalKeysFlat && itemRowKeys.length > 1) {
      colTotals[subTotalKeysFlat].sum += item[metric];
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
