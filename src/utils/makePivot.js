// probably need to make this Async in case large data set

const makePivot = (data, row_pred, col_pred, metric) => {
  const summary = {};
  const rowNames = [];
  const colNames = [];
  const initialAgg = { sum: 0 }; // enables other aggregators: sum, count, percent of total, etc...
  const colTotals = {};
  const rowTotals = {};
  const grandTotal = { ...initialAgg };
  data.forEach((item) => {
    // TODO: error handling if row_pred, col_pred, or metric don't exist on each item

    // if row doesnt exist on summary yet
    if (!summary[item[row_pred]]) {
      summary[item[row_pred]] = {};
      rowNames.push(item[row_pred]); // push to rowNames array
    }
    // if row.col doesnt exist on summary yet
    if (!summary[item[row_pred]][item[col_pred]]) {
      summary[item[row_pred]][item[col_pred]] = { ...initialAgg }; // copy instead of reference
      colNames.push(item[col_pred]); // push to colNames array
    }

    // initialize column totals
    if (!colTotals[item[col_pred]]) {
      colTotals[item[col_pred]] = { ...initialAgg };
    }

    // initialize row totals
    if (!rowTotals[item[row_pred]]) {
      rowTotals[item[row_pred]] = { ...initialAgg };
    }

    // add metric value to row.col aggregation
    // SUM
    summary[item[row_pred]][item[col_pred]].sum += item[metric];
    colTotals[item[col_pred]].sum += item[metric];
    rowTotals[item[row_pred]].sum += item[metric];
    grandTotal.sum += item[metric];
  });

  // make colNames unique using Set
  const summaryObj = {
    summary,
    rowNames,
    colNames: [...new Set(colNames)],
    colTotals,
    rowTotals,
    grandTotal,
  };

  // sort rowNames and colNames alpha
  summaryObj.rowNames = summaryObj.rowNames.sort();
  summaryObj.colNames = summaryObj.colNames.sort();

  console.log("summaryObj", summaryObj);

  return summaryObj;
};

export default makePivot;
