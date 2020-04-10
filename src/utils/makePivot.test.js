import { get } from "lodash";

import demoData from "../data/salesData";
import makePivot from "./makePivot";

describe("category, region, sum", () => {
  let summaryObj;
  beforeAll(() => {
    const config = {
      row: ["category"],
      column: "region",
      metric: "sales",
      aggregator: "sum",
    };
    return (summaryObj = makePivot(
      demoData,
      config.row,
      config.column,
      config.metric
    ));
  });
  test("grand total is correct", () => {
    const input = Math.round(get(summaryObj, "grandTotal.sum"));
    expect(input).toBe(1125712);
  });
  test("Office Supplies: row total is correct", () => {
    const input = Math.round(
      get(summaryObj, "rowTotals['Office Supplies'].sum")
    );
    expect(input).toBe(351572);
  });
  test("Central: col total is correct", () => {
    const input = Math.round(get(summaryObj, "colTotals['Central'].sum"));
    expect(input).toBe(241650);
  });
  test("Technolog, South: cell value is correct", () => {
    const input = Math.round(
      get(summaryObj, "values['Technology']['South'].sum")
    );
    expect(input).toBe(88845);
  });
});

describe("category - subCategory, states, sales, sum", () => {
  let summaryObj;
  beforeAll(() => {
    const config = {
      row: ["category", "subCategory"],
      column: "state",
      metric: "sales",
      aggregator: "sum",
    };
    return (summaryObj = makePivot(
      demoData,
      config.row,
      config.column,
      config.metric
    ));
  });
  test("grand total is correct", () => {
    const input = Math.round(get(summaryObj, "grandTotal.sum"));
    expect(input).toBe(1125712);
  });
  test("Office Supplies - Storage: row total is correct", () => {
    const input = Math.round(
      get(summaryObj, "rowTotals['Office Supplies-Storage'].sum")
    );
    expect(input).toBe(117233);
  });
  test("Florida: col total is correct", () => {
    const input = Math.round(get(summaryObj, "colTotals['Florida'].sum"));
    expect(input).toBe(57694);
  });
  test("Furniture : row sub-total is correct", () => {
    const input = Math.round(get(summaryObj, "rowTotals['Furniture'].sum"));
    expect(input).toBe(348402);
  });
  test("Furniture - Furnishings, Texas: cell value is correct", () => {
    const input = Math.round(
      get(summaryObj, "values['Furniture-Furnishings']['Texas'].sum")
    );
    expect(input).toBe(1766);
  });
});
