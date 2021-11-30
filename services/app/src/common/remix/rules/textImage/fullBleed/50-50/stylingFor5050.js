import { stylingForFullBleed } from "../stylingForFullBleed";

export const stylingFor5050 = ({
  textAlignment,
  marginAlignment,
  clusterImageMargin,
  containerImageAlignment,
  groupTextAlignment,
}) => stylingForFullBleed({
  textAlignment,
  marginAlignment,
  clusterImageMargin,
  containerImageAlignment,
  groupTextAlignment,
  groupTextWidth: '44%',
  containerImageWidth: '46%',
  clusterWidth: '45%',
  groupTextPadding: '9%',
});
