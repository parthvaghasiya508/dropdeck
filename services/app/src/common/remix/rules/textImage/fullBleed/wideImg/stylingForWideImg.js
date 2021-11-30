import { stylingForFullBleed } from "../stylingForFullBleed";

export const stylingForWideImg = ({
  textAlignment,
  marginAlignment,
  clusterImageMargin,
  containerImageAlignment,
  groupTextAlignment,
}) => {
  const styles = stylingForFullBleed({
    textAlignment,
    marginAlignment,
    clusterImageMargin,
    containerImageAlignment,
    groupTextAlignment,
    groupTextWidth: '22.5%',
    containerImageWidth: '70%',
    clusterWidth: '22.5%',
    groupTextPadding: '4.5%',
  });

  // Top-level padding
  styles.padding = '9% 4.5%';
  return styles;
};
