// probably need to make this Async in case large data set

const makePivotSum = (data, row_pred, col_pred, metric) => {
  return new Promise((resolve, reject) => {
    const summary = {};
    const rows = [];
    const columns = [];
    data.forEach((item) => {
      // TODO: error handling if row_pred, col_pred, or metric don't exist on each item

      // if row doesnt exist on summary yet
      if (!summary[item[row_pred]]) {
        summary[item[row_pred]] = {};
        rows.push(item[row_pred]); // push to rows array
      }
      // if row.col doesnt exist on summary yet
      if (!summary[item[row_pred]][item[col_pred]]) {
        summary[item[row_pred]][item[col_pred]] = 0;
        columns.push(item[col_pred]); // push to columns array
      }
      // add metric value to row.col (assumed Sum function)
      summary[item[row_pred]][item[col_pred]] += item[metric];
    });

    // simulate calculation delay
    // make columns unique using Set
    setTimeout(
      () => resolve({ summary, rows, columns: [...new Set(columns)] }),
      1000
    );
  });
};

export default makePivotSum;
