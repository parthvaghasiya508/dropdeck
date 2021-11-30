import { ToggleButton } from "@material-ui/lab";
import { makeStyles } from '@material-ui/styles';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { setTheme } from "../../actions/presentation";
import { logoToUse } from "../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/configuration/logoConfigurationBuilder";
import { Panel, PanelContainer, PanelTitle } from "../api/sdk/preview/PanelComponents";
import { ThemeFactory } from "../theme/ThemeFactory";

const styles = () => makeStyles((theme) => ({
  themeButton: {
    position: "relative",
    width: 185,
    padding: 10,
    margin: 6,
    transition: "all 300ms ease",
    transform: 'scale(0.98)',
    borderWidth: '2px',
    borderColor: "transparent",
    '&:hover': {
      borderColor: 'transparent',
      transform: 'scale(1)',
      background: `${theme.dark() ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      borderColor: theme.palette.primary.main,
      transform: 'scale(1)',
      background: 'transparent',
    },
  },
  brandCover: {
    '& img': {
      width: '55%',
      height: '55%',
      objectFit: 'contain',
    },
  },
  cover: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 114,
    width: 161,
    overflow: "none",
  }
}), { meta: 'ThemeMenu' });

/**
 * Menu to toggle which theme to use for the slide deck.
 */
const ThemeMenu = ({ branding, theme, setTheme, themeName, user }) => {

  function changeTheme(event, themeKey, themePackage) {
    setTheme(themeKey, themePackage.component.branded ? branding : undefined);
  }

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  const logo = logoToUse(branding);

  const themes = ThemeFactory.instance.themes()
    .filter((predicate) => !predicate[1].component.branded || predicate[1].component.branded && branding !== undefined)
    .map((value, index) => (
      <ToggleButton value={value[1]} onClick={(e) => changeTheme(e, value[0], value[1])} selected={value[0] === themeName} key={`theme-select-${index}`} className={classes.themeButton}>
        {value[1].component.branded ? (
          <div className={classes.brandCover}>
            <div className={classes.cover} style={{ backgroundColor: logo.bgColor || "#fff" }}>
              <img src={logo.url} alt="logo for company theme"/>
            </div>
            <div style={{ fontSize: "0.8em", paddingTop: 4, width: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.company.name}
            </div>
          </div>
        ) : (
          <div>
            <div className={classes.cover}>
              <img src={`/themes/preview/${value[0]}/01.jpg`} width="100%" alt="theme preview"/>
            </div>
            <div style={{
              fontSize: "0.8em",
              paddingTop: 4
            }}>{value[1].component.name}
            </div>
          </div>
        )}
      </ToggleButton>
    ));

  return (
    <Panel>
      <PanelTitle text="Design & Style"/>
      <PanelContainer>
        {themes}
      </PanelContainer>
    </Panel>
  );
};

const mapDispatchToProps = {
  setTheme
};

export default connect(null, mapDispatchToProps)(ThemeMenu);
