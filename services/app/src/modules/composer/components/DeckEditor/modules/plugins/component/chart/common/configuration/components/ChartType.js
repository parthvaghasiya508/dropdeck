import React from 'react';
import ReactDOM from 'react-dom';
import './ChartType.scss';
import { ReactEditor, useEditor } from "slate-react";
import IconButton from "@material-ui/core/IconButton";
import PieChartRoundedIcon from '@material-ui/icons/PieChartRounded';

const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

export default function ChartType({ path, onSelect }) {

  const selection = { anchor: { path, offset: 0 }, focus: { path, offset: 0 } };
  const editor = useEditor();
  const domRange = ReactEditor.toDOMRange(editor, selection);
  const rect = domRange.getBoundingClientRect();
  const style = {
    top: rect ? `${rect.top + window.pageYOffset}px` : '0',
  };

  return (
    <Portal>
      <div className="portal" style={style}>
        <IconButton>
          <PieChartRoundedIcon />
        </IconButton>
      </div>
    </Portal>
  );
}
