import React from "react";

const Row = ({ row, header }) => {
  if (header) {
    // header row
    return (
      <tr>
        <th>Category</th>
        {row.map((header, index) => (
          <th key={`th-${index}`}>{header}</th>
        ))}
      </tr>
    );
  } else if (row && row.length) {
    // data row
    return (
      <tr>
        {row.map((item, index) => {
          return (
            <td key={`td-${index}`}>
              {!isNaN(item) ? Math.round(item) : item}
            </td>
          );
        })}
      </tr>
    );
  } else {
    // catch
    return null;
  }
};

export default Row;
