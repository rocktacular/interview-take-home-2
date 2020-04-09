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
    const rowVal = item[row_pred];
    const colVal = item[col_pred];

    // if row doesnt exist on summary yet
    if (!summary[rowVal]) {
      summary[rowVal] = {};
      rowNames.push(rowVal); // push to rowNames array
    }
    // if row.col doesnt exist on summary yet
    if (!summary[rowVal][colVal]) {
      summary[rowVal][colVal] = { ...initialAgg }; // copy instead of reference
      colNames.push(colVal); // push to colNames array
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
