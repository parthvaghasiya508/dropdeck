import { chartConfigurator } from "../../common/configuration/chartConfigurator";
import { CHART_BAR } from "./type";
import { LIST_ITEM } from "../../../list/type";
import { PARAGRAPH } from "../../../paragraph/type";

export const barChartConfigurator = chartConfigurator(CHART_BAR, [
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Everest: 8848m' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Fuji: 3776m' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Kilimanjaro: 5895m' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'K2: 8611m' }]
    }]
  },
  {
    type: LIST_ITEM,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Mont Blanc: 4810m' }]
    }]
  },
]);
