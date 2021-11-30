import React from "react";
import Label from "./controls/Label";
import KeyboardButtonLabel from "./KeyboardButtonLabel";

const KeyboardSequenceLabel = ({
  characters,
  contain,
  separator = "+"
}) => (
  <Label variant="inherit">
    {contain ? (
      <KeyboardButtonLabel>
        {characters.map((character, i) => <>{character}{i < characters.length - 1 && separator !== "" ? <>&nbsp;{separator}&nbsp;</> : null}</>)}
      </KeyboardButtonLabel>
    ) : (
      <>
        {characters.map((character, i) => (<><KeyboardButtonLabel>{character}</KeyboardButtonLabel>{i < characters.length - 1 ? <>&nbsp;{separator}&nbsp;</> : null}</>))}
      </>
    )}
  </Label>
);
export default KeyboardSequenceLabel;
