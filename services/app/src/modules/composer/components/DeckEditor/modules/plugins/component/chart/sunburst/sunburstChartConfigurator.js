import { chartConfigurator } from "../common/configuration/chartConfigurator";
import { CHART_SUNBURST } from "./type";
import { LIST_ITEM } from "../../list/type";
import { PARAGRAPH } from "../../paragraph/type";

export const sunburstChartConfigurator = chartConfigurator(CHART_SUNBURST, [
  {
    type: LIST_ITEM,
    children: [
      {
        type: PARAGRAPH,
        children: [{ text: 'A' }]
      },
      {
        type: CHART_SUNBURST,
        children: [
          {
            type: LIST_ITEM,
            children: [
              {
                type: PARAGRAPH,
                children: [{ text: 'A1, 1' }]
              }
            ]
          },
          {
            type: LIST_ITEM,
            children: [
              {
                type: PARAGRAPH,
                children: [{ text: 'A2, 2' }]
              }
            ]
          },
          {
            type: LIST_ITEM,
            children: [
              {
                type: PARAGRAPH,
                children: [{ text: 'A3, 3' }]
              }
            ]
          },
        ]
      }
    ]
  },
  {
    type: LIST_ITEM,
    children: [
      {
        type: PARAGRAPH,
        children: [{ text: 'B, 2' }]
      },
      {
        type: CHART_SUNBURST,
        children: [
          {
            type: LIST_ITEM,
            children: [
              {
                type: PARAGRAPH,
                children: [{ text: 'B1, 3' }]
              }
            ]
          },
          {
            type: LIST_ITEM,
            children: [
              {
                type: PARAGRAPH,
                children: [{ text: 'B2, 1' }]
              }
            ]
          },
          {
            type: LIST_ITEM,
            children: [
              {
                type: PARAGRAPH,
                children: [{ text: 'B3, 5' }]
              }
            ]
          },
        ]
      }
    ]
  },
]);
