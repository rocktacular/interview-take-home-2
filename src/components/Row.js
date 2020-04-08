import React from "react";

const Row = ({ row, columns }) => {
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
          return <td key={`td-${index}`}>{item}</td>;
        })}
      </tr>
    );
  } else {
    // catch
    return null;
  }
};

export default Row;
