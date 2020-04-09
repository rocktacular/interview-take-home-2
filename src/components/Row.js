import React from "react";

const Row = ({ row, columns, aggregator }) => {
  if (columns && columns.length) {
    // header row
    return (
      <tr>
        <th>Category</th>
        {columns.map((header, index) => (
          <th key={`th-${index}`}>{header}</th>
        ))}
      </tr>
    );
  } else if (row && row.length) {
    // data row
    return (
      <tr>
        {row.map((item, index) => {
          console.log(item);
          if (index === 0) {
            return <td key={`td-${index}`}>{item}</td>;
          } else {
            return <td key={`td-${index}`}>{Math.round(item[aggregator])}</td>;
          }
        })}
      </tr>
    );
  } else {
    // catch
    return null;
  }
};

export default Row;
