import { chartConfigurator } from "../../common/configuration/chartConfigurator";
import { CHART_LINE } from "./type";
import { LIST_ITEM } from "../../../list/type";
import { PARAGRAPH } from "../../../paragraph/type";

export const lineChartConfigurator = chartConfigurator(CHART_LINE, [
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Jan, 5' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Feb, 7' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Mar, 10' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Apr, 13' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Jun, 20' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Jul, 23' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Aug, 24' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Sep, 15' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Oct, 12' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Nov, 7' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Dec, 5' }]
    }]
  },
]);
