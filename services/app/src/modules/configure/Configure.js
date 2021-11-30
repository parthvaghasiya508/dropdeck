import Tab from "@material-ui/core/Tab";

import Tabs from "@material-ui/core/Tabs";
import ApplicationBar from 'common/components/ApplicationBar';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

import LoadingStatusIndicator from "../../common/components/ApplicationBar/components/LoadingStatusIndicator";
import DirectoryViewStyling from "../../common/components/DirectoryViewStyling";
import AccountConfiguration from "./components/Account";
import CompanyConfiguration from "./components/Company";
import ProfileConfiguration from "./components/Profile";

/**
 * Configuration and settings.
 *
 * @param props
 * @returns {boolean}
 * @constructor
 */
const Configure = ({ user }) => {

  const { path } = useRouteMatch();

  const useStyles = useCallback(DirectoryViewStyling(), []);
  const classes = useStyles();

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
        <div className={classes.line} />
        <div className={classes.subnav}>
          <div className={classes.subnavInner}>
            <Tabs variant="scrollable" scrollButtons="on" indicatorColor="primary" value={path} classes={{
              root: classes.tabs,
              scrollButtons: classes.tabsScrollButtons,
              indicator: classes.tabIndicator
            }}>
              <LinkTab label="Your Profile" value="/configure/profile"/>
              {user.company ? (
                <LinkTab label={user.company.name} value="/configure/company" style={{ }}/>
              ) : null}
              <LinkTab label="Your Account" value="/configure/account"/>
            </Tabs>
          </div>
        </div>

        <div className={classes.main} style={{ paddingTop: 102 }}>
          <Switch>
            <Route exact path="/configure/profile">
              <ProfileConfiguration user={user}/>
            </Route>
            <Route exact path="/configure/company">
              <CompanyConfiguration user={user}/>
            </Route>
            <Route exact path="/configure/account">
              <AccountConfiguration user={user}/>
            </Route>
          </Switch>
        </div>

      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Configure);
