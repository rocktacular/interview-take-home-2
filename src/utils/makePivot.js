// probably need to make this Async in case large data set

const makePivot = (data, row_pred, col_pred, metric) => {
  const summary = {};
  const rowKeysTree = {};
  const colKeys = [];
  const initialAgg = { sum: 0 }; // enables other aggregators: sum, count, percent of total, etc...
  const colTotals = {};
  const rowTotals = {};
  const grandTotal = { ...initialAgg };
  data.forEach((item) => {
    // TODO: error handling if row_pred, col_pred, or metric don't exist on each item

    // create combo row key
    const itemRowKeys = [];
    row_pred.forEach((pred) => {
      itemRowKeys.push(item[pred]);
    });

    const itemRowKeysFlat = itemRowKeys.join("-");

    const rowVal = itemRowKeysFlat;
    const colVal = item[col_pred];

    // if row doesnt exist on summary yet
    if (!summary[rowVal]) {
      summary[rowVal] = {};
    }

    // populate rowKeysTree arr
    // TODO: make this go as deep as itemRowKeys
    if (!rowKeysTree[itemRowKeys[0]]) {
      rowKeysTree[itemRowKeys[0]] = {};
    }
    rowKeysTree[itemRowKeys[0]][itemRowKeys[1]] = true;

    // if row.col doesnt exist on summary yet
    if (!summary[rowVal][colVal]) {
      summary[rowVal][colVal] = { ...initialAgg }; // copy instead of reference
      colKeys.push(colVal);
    }

    // initialize column totals
    if (!colTotals[colVal]) {
      colTotals[colVal] = { ...initialAgg };
    }

    // initialize sub total columns if depth > 1
    const subTotalKeys = [...itemRowKeys];
    subTotalKeys.pop(); // subtotals for depth - 1
    const subTotalKeysFlat = subTotalKeys.join("-") + "-" + colVal;
    if (itemRowKeys.length > 1) {
      if (!colTotals[subTotalKeysFlat]) {
        colTotals[subTotalKeysFlat] = { ...initialAgg };
      }
      if (!rowTotals[itemRowKeys[0]]) {
        rowTotals[itemRowKeys[0]] = { ...initialAgg };
      }
    }

    // initialize row totals
    if (!rowTotals[rowVal]) {
      rowTotals[rowVal] = { ...initialAgg };
    }

    // add metric value to row.col aggregation
    // SUM
    summary[rowVal][colVal].sum += item[metric];
    colTotals[colVal].sum += item[metric];
    rowTotals[rowVal].sum += item[metric];
    rowTotals[itemRowKeys[0]].sum += item[metric];
    grandTotal.sum += item[metric];
    // agg subtotals if depth > 1
    if (subTotalKeysFlat && itemRowKeys.length > 1) {
      colTotals[subTotalKeysFlat].sum += item[metric];
    }
  });

  // make colKeys unique using Set
  const summaryObj = {
    summary,
    rowKeysTree,
    colKeys: [...new Set(colKeys)],
    colTotals,
    rowTotals,
    grandTotal,
  };

  // sort colKeys alpha
  summaryObj.colKeys = summaryObj.colKeys.sort();

  return summaryObj;
};

export default makePivot;
