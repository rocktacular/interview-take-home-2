// probably need to make this Async in case large data set

const makePivot = (data, row_pred, col_pred, metric) => {
  const summary = {};
  const rowNames = [];
  const colNames = [];
  const initialAgg = { sum: 0 }; // enables other aggregators: sum, count, percent of total, etc...
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
    // add metric value to row.col aggregation
    summary[item[row_pred]][item[col_pred]].sum += item[metric];
  });

  // make colNames unique using Set
  const summaryObj = { summary, rowNames, colNames: [...new Set(colNames)] };

  // sort rowNames and colNames alpha
  summaryObj.rowNames = summaryObj.rowNames.sort();
  summaryObj.colNames = summaryObj.colNames.sort();

  console.log("summaryObj", summaryObj);

  return summaryObj;
};

export default makePivot;
