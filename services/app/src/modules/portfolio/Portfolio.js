import React, { useState } from 'react';
// import { makeStyles } from "@material-ui/styles";
import ApplicationBar from 'common/components/ApplicationBar';
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import LoadingStatusIndicator from "../../common/components/ApplicationBar/components/LoadingStatusIndicator";
import AppNavigation from "../../common/components/ApplicationBar/components/AppNavigation/AppNavigation";
import { generateSlides } from "../../common/slide/SlideFactory";
import DirectoryViewStyling from "../../common/components/DirectoryViewStyling";
import PortfolioSlideListing from "./components/PortfolioSlideListing";
import TemplateFactory from "./TemplateFactory";
import SlideTemplateGenerator from "./generator/SlideTemplateGenerator";
import "./PortfolioListing.css";
import { Slide } from "../../common/slide/Slide";
import { ThemeFactory } from "../../common/theme/ThemeFactory";
import ThemeMenu from "./components/ThemeMenu";

// const styles = () => makeStyles((theme) => ({
//   root: {
//     border: '2px solid red',
//     background: theme.dark() ? theme.palette.background.main : `linear-gradient(90deg, ${theme.palette.background.elev02} -45%, #FFFFFF 50%)`,
//   },
// }));

/**
 * Lists out a portfolio of possible slide and remix combinations.
 *
 * @param props
 * @returns {boolean}
 * @constructor
 */
const Portfolio = ({ match }) => {

  const history = useHistory();
  const templateFactory = TemplateFactory.instance();
  const firstTemplateId = Object.keys(templateFactory.templates).length > 0 ? Object.keys(templateFactory.templates)[0] : undefined;
  const initialTemplateId = match.params.templateId || firstTemplateId;
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const directoryStyles = DirectoryViewStyling();
  const hasTemplate = !!templateId;
  const template = hasTemplate ? templateFactory.templates[templateId] : undefined;
  const portfolio = template ? new SlideTemplateGenerator().generate(template) : undefined;
  const [themeName, setThemeName] = useState(ThemeFactory.DEFAULT_THEME_NAME);

  const generateTemplateComponents = () => (
    <div className="portfolioNav" >
      <h3>Theme</h3>
      <ThemeMenu setThemeName={setThemeName} />
      <br/>
      <h3>Variants</h3>
      <ul className="portfolioNavList">
        {
          Object.keys(templateFactory.templates).map((id) => (
            <li key={id} className={templateId === id ? 'active' : ''}>
              <a href="#" onClick={openTemplate(id)}>{templateFactory.templates[id].name()}</a>
            </li>
          ))
        }
      </ul>
    </div>
  );

  const generateSlideComponents = (portfolio) => portfolio.map((template) => (
    <div className="template" key={template.name}>
      <h3>{template.name}</h3>
      <div>
        <PortfolioSlideListing slides={generateSlides(template.content, "default", Slide.View.LIGHTBOX, themeName)} spaceBetween={4} theme={themeName} />
      </div>
    </div>
  ));

  const openTemplate = (id) => () => {
    history.push(`/portfolio/${id}`);
    setTemplateId(id);
  };

  const directoryClasses = directoryStyles();

  // const classes = useStyles();
  // className={classes.root}

  return (
    <React.Fragment>
      <div className={directoryClasses.root}>
        <ApplicationBar>
          <AppNavigation/>
          <div className={directoryClasses.toolbarMenu}>
            <div className={directoryClasses.loadstatus}>
              <LoadingStatusIndicator/>
            </div>
          </div>
        </ApplicationBar>

        <div className={directoryClasses.wrapInner}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={2}>
              {generateTemplateComponents()}
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={10}>
              {portfolio ? generateSlideComponents(portfolio) : (hasTemplate ? <h2>Template not found</h2> : null)}
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Portfolio;
