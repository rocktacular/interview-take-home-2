import React from "react";

const Row = ({ row, header }) => {
  if (header) {
    // header row
    return (
      <tr>
        {row.map((heading, index) => (
          <th key={`th-${index}`}>{heading}</th>
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
              {typeof item === "number" ? Math.round(item) : item}
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
