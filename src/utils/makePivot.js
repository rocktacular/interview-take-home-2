// probably need to make this Async in case large data set

const makePivot = (data, row_pred, col_pred, metric) => {
  const summary = {};
  const rows = [];
  const columns = [];
  const initialAgg = { sum: 0 }; // enables other aggregators: sum, count, percent of total, etc...
  data.forEach((item) => {
    // TODO: error handling if row_pred, col_pred, or metric don't exist on each item

    // if row doesnt exist on summary yet
    if (!summary[item[row_pred]]) {
      summary[item[row_pred]] = {};
      rows.push(item[row_pred]); // push to rows array
    }
    // if row.col doesnt exist on summary yet
    if (!summary[item[row_pred]][item[col_pred]]) {
      summary[item[row_pred]][item[col_pred]] = { ...initialAgg }; // copy instead of reference
      columns.push(item[col_pred]); // push to columns array
    }
    // add metric value to row.col aggregation
    summary[item[row_pred]][item[col_pred]].sum += item[metric];
  });

  // make columns unique using Set
  const summaryObj = { summary, rows, columns: [...new Set(columns)] };

  // sort rows and columns alpha
  summaryObj.rows = summaryObj.rows.sort();
  summaryObj.columns = summaryObj.columns.sort();

  console.log("summaryObj", summaryObj);

  return summaryObj;
};

export default makePivot;
