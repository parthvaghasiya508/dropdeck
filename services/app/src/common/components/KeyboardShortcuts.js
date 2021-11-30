import { DialogContent } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { isIOS, isMacOs, isWindows } from "react-device-detect";
import { AiFillWindows } from "react-icons/ai";
import KeyboardButtonLabel from "./KeyboardButtonLabel";
import KeyboardSequenceLabel from "./KeyboardSequenceLabel";

/**
 * Get a platform specific modifier key.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ModifierKey = ({ nonMacCtrl }) => {
  if (isMacOs || isIOS) {
    return (<span>&#8984;</span>);
  }
  if (isWindows && !nonMacCtrl) {
    return (<span style={{ position: "relative", top: 3 }}><AiFillWindows/></span>);
  }

  return (<span style={{ fontSize: "0.7em", border: `1px solid`, borderRadius: 3, marginLeft: 2, marginRight: 2, padding: 1 }}>&nbsp;{nonMacCtrl ? "CTRL" : "CMD"}&nbsp;</span>);
};

const KeyboardShortcuts = ({ open, setOpen }) => (
  <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
    <DialogTitle style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "1.3em", margin: 0 }}>Keyboard Shortcuts</h2>
      <div style={{ fontSize: "0.9" }}><ModifierKey/> + &#8679; + <b>?</b></div>
    </DialogTitle>
    <DialogContent style={{ padding: "10%", paddingTop: 0, textAlign: "center" }}>

      <h3 style={{ paddingTop: 10 }}>General</h3>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 600 }}>Keys</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><KeyboardSequenceLabel characters={[<ModifierKey/>, <span>&#8679;</span>, "n"]}/></TableCell>
              <TableCell>New Deck</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><KeyboardSequenceLabel characters={[<ModifierKey/>, <span>&#8679;</span>, "h"]}/></TableCell>
              <TableCell>Home</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h3 style={{ paddingTop: 20 }}>Directory</h3>

      <TableContainer style={{ overflow: "visible" }}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: 600 }}>Keys</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><KeyboardSequenceLabel characters={[<span>&larr;</span>, <span>&uarr;</span>, <span>&darr;</span>, <span>&rarr;</span>]}/></TableCell>
              <TableCell>Navigate</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><KeyboardButtonLabel>ENTER</KeyboardButtonLabel></TableCell>
              <TableCell>Edit selected deck</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><KeyboardButtonLabel>SPACE</KeyboardButtonLabel></TableCell>
              <TableCell>Preview selected deck</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><KeyboardButtonLabel>p</KeyboardButtonLabel></TableCell>
              <TableCell>Play selected deck</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h3 style={{ paddingTop: 20 }}>Editor</h3>

      <TableContainer style={{ overflow: "visible" }}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: 600 }}>Keys</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><KeyboardSequenceLabel characters={[<ModifierKey nonMacCtrl/>, <span>&#9166;</span>]}/></TableCell>
              <TableCell>New Slide</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><KeyboardSequenceLabel characters={[<ModifierKey/>, <span>&#8679;</span>, "r"]}/></TableCell>
              <TableCell>Toggle Remix Menu</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><KeyboardSequenceLabel characters={[<ModifierKey/>, "k"]}/></TableCell>
              <TableCell>Insert a link</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h3 style={{ paddingTop: 20 }}>Player</h3>

      <TableContainer style={{ overflow: "visible" }}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: 600 }}>Keys</TableCell>
              <TableCell style={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><b>Escape</b></TableCell>
              <TableCell>Exit</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </DialogContent>
  </Dialog>
);
export default KeyboardShortcuts;
