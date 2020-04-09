// probably need to make this Async in case large data set

const makePivot = (data, row_pred, col_pred, metric) => {
  const summary = {};
  const rowKeys = [];
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
      rowKeys.push(itemRowKeys); // push to rowKeys array
    }
    // if row.col doesnt exist on summary yet
    if (!summary[rowVal][colVal]) {
      summary[rowVal][colVal] = { ...initialAgg }; // copy instead of reference
      colKeys.push(colVal); // push to colKeys array
    }

    // initialize column totals
    if (!colTotals[colVal]) {
      colTotals[colVal] = { ...initialAgg };
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
    grandTotal.sum += item[metric];
  });

  // make colKeys unique using Set
  const summaryObj = {
    summary,
    rowKeys,
    colKeys: [...new Set(colKeys)],
    colTotals,
    rowTotals,
    grandTotal,
  };

  // sort rowKeys and colKeys alpha
  summaryObj.rowKeys = summaryObj.rowKeys.sort();
  summaryObj.colKeys = summaryObj.colKeys.sort();

  return summaryObj;
};

export default makePivot;
