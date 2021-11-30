import React from "react";
import { useTheme } from "@material-ui/styles";
import Section from "../Section";

const EditorSection = ({ children, style = {} }) => {

  const theme = useTheme();

  return (
    <Section override={{ 
      margin: 0, 
      backgroundColor: theme.dark() ? "rgba(20,20,20,0.95)" : "rgba(255,255,255,1)",
    }} 
    style={{ 
      padding: 8, 
      paddingBottom: 12, 
      width: 260, 
      height: 136, 
      display: "flex", 
      alignItems: "center",
      ...style }}>
      {children}
    </Section>
  );
};
export default EditorSection;
