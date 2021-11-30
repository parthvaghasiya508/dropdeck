import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE_PLAY_DECK } from "../../../../Routes";
import GenericButton from "../../buttons/GenericButton";

const SlideDeckPlayControl = ({ id, style, playRoute = ROUTE_PLAY_DECK }) => {

  const history = useHistory();

  const clickToPlay = (e) => {
    e.preventDefault();
    history.push({ pathname: `${playRoute}/${id}` });
  };

  return (
    <GenericButton
      secondary
      startIcon={<PlayCircleFilledIcon/>}
      aria-controls="simple-menu"
      onClick={clickToPlay}
      aria-haspopup="true" style={{ maxHeight: 55, padding: '0.175rem 1rem 0.175rem 1rem', ...style }}>
      Play
    </GenericButton>

  );
};
export default SlideDeckPlayControl;
