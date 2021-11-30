import Button from '@material-ui/core/Button';
import Tab from "@material-ui/core/Tab";

import Tabs from "@material-ui/core/Tabs";
import ApplicationBar from 'common/components/ApplicationBar';

import * as ErrorUtils from 'common/util/ErrorUtils';
import GA4React from "ga-4-react";
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Link, Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import breakpoints from '../../Breakpoints';
import { useCompanyDecks } from "../../common/api/sdk/hooks/CompanyHooks";
import { useDeleteDeck, useUserDecks } from "../../common/api/sdk/hooks/DeckHooks";

import LoadingStatusIndicator from "../../common/components/ApplicationBar/components/LoadingStatusIndicator";
import DirectoryViewStyling from "../../common/components/DirectoryViewStyling";
import EditorCommandsContent from "../../common/components/help/content/EditorCommandsContent";
import HelpdeskContent from "../../common/components/help/content/HelpdeskContent";
import ImageCommandsContent from "../../common/components/help/content/ImageCommandsContent";
import PaletteContent from "../../common/components/help/content/PaletteContent";
import RemixContent from "../../common/components/help/content/RemixContent";
import SlashCommandsContent from "../../common/components/help/content/SlashCommandsContent";
import ThemeContent from "../../common/components/help/content/ThemeContent";
import CueCardWide from "../../common/components/help/CueCardWide";
import SwipeableStack from "../../common/components/help/SwipeableStack";
import { logger } from "../../common/util/logger";
import { config } from "../../config";
import { ROUTE_NEW_DECK } from "../../Routes";
import LoadingStateComponent from "../composer/components/LoadingStateComponent";
import ReferenceDecks from "../reference/decks/ReferenceDecks";
import { BlankSlateCard } from "./components/BlankSlateCard";
import DeckList from "./components/DeckList";
import InfoPanel from "./components/InfoPanel";

const { values: { sm, md, lg } } = breakpoints;

const getColumnCountValue = (window) => {
  // console.log(window.innerWidth);
  if (window.innerWidth >= lg) {
    return 3;
  } if (window.innerWidth >= md) {
    return 2;
  } if (window.innerWidth >= sm) {
    return 2;
  }
  return 1;

};

/**
 * Directory view for an organisation.
 *
 * @param props
 * @returns {boolean}
 * @constructor
 */
const Directory = ({ user }) => {

  const history = useHistory();
  const [columnCount, setColumnCount] = useState(getColumnCountValue(window));
  const [newDecks, refetch, error, userPageNumber, setUserPageNumber, userHasMore] = useUserDecks(columnCount);
  const [decks, setDecks] = useState(newDecks);
  const [companyDecks, _, __, companyPageNumber, setCompanyPageNumber, companyHasMore, initialSharedDecks, sharedPageNumber, setSharedPageNumber, sharedHasMore] = useCompanyDecks(user, columnCount);
  const [sharedDecks, setSharedDecks] = useState(initialSharedDecks);
  const [focusedListIndex, setFocusedListIndex] = useState(0);
  const [currentDeckIndex, setCurrentDeckIndex] = useState(0);
  const referenceDecks = ReferenceDecks.instance().decks();
  const [touched, setTouched] = useState(false);

  const allDecks = [decks, companyDecks, referenceDecks];

  useEffect(() => {
    document.title = "Home";
    setColumnCount(getColumnCountValue(window));
    window.addEventListener('resize', () => {
      setColumnCount(getColumnCountValue(window));
    });
  }, []);

  useEffect(() => {
    if (newDecks) {
      setDecks(newDecks);
    }
  }, [newDecks]);

  useEffect(() => {
    if (initialSharedDecks) {
      setSharedDecks(initialSharedDecks);
    }
  }, [initialSharedDecks]);

  const [deleteDeckById] = useDeleteDeck((id) => {
    const filteredDecks = decks.filter((d, i) => d._id !== id);
    const filteredSharedDecks = sharedDecks.filter((d, i) => d._id !== id);
    setDecks(filteredDecks);
    setSharedDecks(filteredSharedDecks);
  }, () => {
    logger.error("Failed to delete deck");
  });

  if (error) {
    ErrorUtils.redirectOnError(error);
  }

  const newDeck = (e) => {
    history.push({ pathname: ROUTE_NEW_DECK, state: { permissions: { company: false, public: false } } });
  };

  const deleteDeck = (deck) => {
    deleteDeckById(deck.id);
  };

  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [infoPanelDeckId, setInfoPanelDeckId] = useState();

  const toggleInfoPanel = (show, id) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (show) {
      setInfoPanelDeckId(id);
    }
    setShowInfoPanel(show);
  };
  const useStyles = useCallback(DirectoryViewStyling(), []);
  const classes = useStyles();

  const getInfoPanel = () => (
    <InfoPanel deckId={infoPanelDeckId} deleteDeck={deleteDeck} toggleInfoPanel={toggleInfoPanel}
      infoPanel={showInfoPanel} setShowInfoPanel={setShowInfoPanel} />
  );

  const { path } = useRouteMatch();

  const LinkTab = (props) => (
    <Tab
      component={Link}
      {...props}
      to={props.value}
      classes={{
        root: classes.tab,
        selected: classes.tabSelected,
        wrapper: classes.tabLabel
      }}
    />
  );

  if (!decks) {
    return <LoadingStateComponent message="Fetching your decks..." />;
  }

  const handleClickDeckList = (index) => {
    setFocusedListIndex(index);
    setTouched(true);
  };

  const noDecks = decks.length === 0 && (companyDecks && companyDecks.length === 0);
  const yourDeckListing = () => {
    if (noDecks) {
      return <BlankSlateCard classes={classes} />;
    }
    return (
      <React.Fragment>
        <DeckList
          index={0}
          title="Your Decks"
          decks={decks}
          allDecks={allDecks}
          createIcon
          toggleInfoPanel={toggleInfoPanel}
          hasMore={userHasMore}
          setPageNumber={setUserPageNumber}
          pageNumber={userPageNumber}
          columnCount={columnCount}
          focused={focusedListIndex === 0}
          currentIndex={currentDeckIndex}
          setCurrentIndex={setCurrentDeckIndex}
          onClick={() => handleClickDeckList(0)}
          setFocusedListIndex={handleClickDeckList}
          touched={touched}
        />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ApplicationBar user={user}>
          <div className={classes.toolbarMenu}>
            <div className={classes.loadstatus}>
              <LoadingStatusIndicator/>
            </div>
          </div>
        </ApplicationBar>

        {/* Sub Navigation */}
        <div className={classes.line}> </div>
        <div className={classes.subnav}>
          <div className={classes.subnavInner}>
            <Tabs variant="scrollable" scrollButtons="on" indicatorColor="primary" value={path} classes={{ root: classes.tabs, scrollButtons: classes.tabsScrollButtons, indicator: classes.tabIndicator }}>
              <LinkTab label="Dashboard" value={config.app.paths.home}/>
              <LinkTab label="Your Decks" value={`${config.app.paths.home}/me`}/>
              {user.company ? (
                <LinkTab label={user.company.name} value={`${config.app.paths.home}/company`}/>
              ) : null}
              <LinkTab label="Hints &amp; Tips" value={`${config.app.paths.home}/docs`}/>
            </Tabs>
            <Button
              className={classes.cta}
              onClick={newDeck}
              variant="contained"
              color="primary"
              size="medium"
            >
              <span>New</span><span className="full" style={{ marginLeft: 5 }}> Deck</span>
            </Button>

          </div>
        </div>

        {/* Decks Section */}
        <div className={classes.main} style={{ paddingTop: 52 }}>
          <Switch>

            {/* == Tab: Dashboard == */}
            <Route exact path={config.app.paths.home}>
              { yourDeckListing() }
              { user.company ? (
                <DeckList
                  company
                  index={1}
                  title={`Shared with ${user.company.name}`}
                  decks={sharedDecks}
                  allDecks={allDecks}
                  setPageNumber={setSharedPageNumber}
                  pageNumber={sharedPageNumber}
                  hasMore={sharedHasMore}
                  createIcon
                  toggleInfoPanel={toggleInfoPanel}
                  columnCount={columnCount}
                  focused={focusedListIndex === 1}
                  currentIndex={currentDeckIndex}
                  setCurrentIndex={setCurrentDeckIndex}
                  onClick={() => handleClickDeckList(1)}
                  setFocusedListIndex={handleClickDeckList}
                  touched={touched}
                />
              ) : null }
              { referenceDecks ? (
                <DeckList
                  index={2}
                  title="Hints &amp; Tips"
                  decks={referenceDecks}
                  allDecks={allDecks}
                  columnCount={columnCount}
                  grid={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                  focused={focusedListIndex === 2}
                  currentIndex={currentDeckIndex}
                  setCurrentIndex={setCurrentDeckIndex}
                  onClick={() => handleClickDeckList(2)}
                  setFocusedListIndex={handleClickDeckList}
                  touched={touched}
                >
                  <CueCardWide>
                    <SwipeableStack content={[<SlashCommandsContent/>, <EditorCommandsContent/>, <ImageCommandsContent/>, <RemixContent/>, <PaletteContent/>, <ThemeContent/>, <HelpdeskContent/>]}/>
                  </CueCardWide>
                </DeckList>
              ) : null }
            </Route>

            {/* == Tab: Your Decks == */}
            <Route path={`${config.app.paths.home}/me`}>
              <DeckList
                index={0}
                title="Your Decks"
                decks={decks}
                createIcon
                toggleInfoPanel={toggleInfoPanel}
                hasMore={userHasMore}
                setPageNumber={setUserPageNumber}
                pageNumber={userPageNumber}
                columnCount={columnCount}
                allDecks={[decks]}
                focused={focusedListIndex === 0}
                currentIndex={currentDeckIndex}
                setCurrentIndex={setCurrentDeckIndex}
                onClick={() => handleClickDeckList(0)}
                setFocusedListIndex={handleClickDeckList}
                touched={touched}
              />
            </Route>

            {/* == Tab: Company Decks == */}
            <Route path={`${config.app.paths.home}/company`}>
              { user.company ? (
                <DeckList
                  company
                  index={0}
                  allDecks={[decks]}
                  title={user.company.name}
                  decks={companyDecks}
                  hasMore={companyHasMore}
                  setPageNumber={setCompanyPageNumber}
                  pageNumber={companyPageNumber}
                  createIcon
                  toggleInfoPanel={toggleInfoPanel}
                  columnCount={columnCount}
                  focused={focusedListIndex === 0}
                  currentIndex={currentDeckIndex}
                  setCurrentIndex={setCurrentDeckIndex}
                  onClick={() => handleClickDeckList(0)}
                  setFocusedListIndex={handleClickDeckList}
                  touched={touched}
                />
              ) : null }
            </Route>

            {/* == Tab: Help Decks == */}
            <Route path={`${config.app.paths.home}/docs`}>
              { referenceDecks ? (
                <DeckList
                  index={0}
                  title="Hints &amp; Tips"
                  decks={referenceDecks}
                  grid={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                  columnCount={columnCount}
                  allDecks={[decks]}
                  focused={focusedListIndex === 0}
                  currentIndex={currentDeckIndex}
                  setCurrentIndex={setCurrentDeckIndex}
                  onClick={() => handleClickDeckList(0)}
                  setFocusedListIndex={handleClickDeckList}
                  touched={touched}
                >
                  <CueCardWide>
                    <SwipeableStack content={[<SlashCommandsContent/>, <EditorCommandsContent/>, <ImageCommandsContent/>, <RemixContent/>, <PaletteContent/>, <ThemeContent/>, <HelpdeskContent/>]}/>
                  </CueCardWide>
                </DeckList>
              ) : null }
            </Route>

          </Switch>
        </div>

      </div>
      {infoPanelDeckId ? getInfoPanel() : null}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Directory);
