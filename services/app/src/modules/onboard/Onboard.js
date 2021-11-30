import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import AppThemeUtils from "../../AppThemeUtils";
import Dropdeck from "../../common/api/sdk/Dropdeck";
import { useUpdateCompany } from "../../common/api/sdk/hooks/CompanyHooks";
import { useMe, useUpdateMe } from "../../common/api/sdk/hooks/PeopleHooks";
import Label from "../../common/components/controls/Label";
import LogoDark from "../../common/components/dropdeck-logo-preview-dark.png";
import LogoLight from "../../common/components/dropdeck-logo-preview.png";
import { logger } from "../../common/util/logger";
import { signalSignUp, UserType } from "../../common/util/SignalCapture";
import { config } from '../../config';
import AccountDetailForm from './components/AccountDetailForm';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    alignItems: 'center',
    ...AppThemeUtils(theme).background.base.normal,
    fontFamily: '"Inter var","Helvetica Neue",Helvetica,Arial,sans-serif',
    fontWeight: '500',
  },
  paper: {
    borderRadius: 7,
    width: 480,
    ...AppThemeUtils(theme).shadows.topCenter,
    ...AppThemeUtils(theme).background.top.normal,
    display: 'flex',
    alignItems: 'center',
    padding: 30,
    paddingBottom: 40,
    paddingTop: 40,
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  logo: {
    display: "block",
    backgroundImage: `url(${theme.palette.type === "dark" ? LogoDark : LogoLight})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 230,
    height: 30,
    width: 230,
    marginTop: 40,
    marginBottom: 60
  }
}));

/**
 * Create an account, person and organisation.
 *
 * @returns {*}
 * @constructor
 */
const Onboard = () => {

  const [personFormValues, setPersonFormValues] = useState({
    givenName: '',
    familyName: '',
    email: '',
    picture: ''
  });
  const [organizationFormValues, setOrganizationFormValues] = useState({
    name: '',
    domain: '',
    active: false
  });

  const [searching, setSearching] = useState();

  const [me] = useMe();

  useEffect(() => {
    if (me) {
      const person = {
        givenName: me.givenName,
        familyName: me.familyName,
        email: me.email,
        picture: me.picture
      };
      setPersonFormValues(person);

      if (me.company) {
        if (!me.company.augmented) {
          setSearching(true);
          Dropdeck.service("branding/company", me.company.domain)
            .then((payload) => {
              const organization = {
                name: payload.data.name || me.company.name,
                domain: me.company.domain.toLowerCase(),
                active: me.company.active,
              };
              setOrganizationFormValues(organization);
              setSearching(false);
            })
            .catch((e) => {
              setSearching(false);
              logger.error(e);
            });
        }
        const organization = {
          name: me.company.name,
          domain: me.company.domain.toLowerCase(),
          active: me.company.active,
        };
        setOrganizationFormValues(organization);
      }

    }
  }, [me]);

  const [updateCompany] = useUpdateCompany();
  const [updateMe, updatedMe] = useUpdateMe();

  /**
   * Handle changes made to the person part of the form.
   *
   * @param e
   */
  const handlePersonChange = (e) => {
    const { name } = e.target;
    const person = { ...personFormValues };
    person[name] = e.target.value;
    setPersonFormValues(person);
  };

  /**
   * Handle changes made to the company part of the form.
   *
   * @param e
   */
  const handleOrganizationChange = (e) => {
    const organization = { ...organizationFormValues };
    organization.name = e.target.value;
    setOrganizationFormValues(organization);
  };

  const classes = useStyles();

  /**
   * Initiate the account creation, updating values and setting person and organization to active.
   *
   * @param e
   */
  const createAccount = (e) => {
    e.preventDefault();
    updateMe({
      givenName: personFormValues.givenName,
      familyName: personFormValues.familyName,
      picture: personFormValues.picture,
      active: true,
    });
    if (me.company && me.company._id) {
      updateCompany(me.company._id, {
        name: organizationFormValues.name,
        active: true,
      });
      signalSignUp(UserType.Domain);
    } else {
      signalSignUp(UserType.Individual);
    }
  };

  if (updatedMe && updatedMe.active) {
    if ((me.company && me.company.active) || !updatedMe.company) {
      if (updatedMe.allowed) {
        window.location = config.app.paths.home;
      } else if (!updatedMe.allowed) {
        window.location = `${config.app.paths.signup}/pending`;
      }
    } else {
      window.location = `${config.app.paths.signup}/branding`;
    }
  }

  return (
    <div className={classes.root}>
      <div style={{ alignSelf: "flex-start" }}> </div>
      <div className={classes.paper}>
        <div className={classes.logo} />
        <Label variant="h2">
          Let’s get started.
        </Label>
        <br/>
        <AccountDetailForm
          createAccount={createAccount}
          handlePersonChange={handlePersonChange}
          handleOrganizationChange={handleOrganizationChange}
          personFormValues={personFormValues}
          setPersonFormValues={setPersonFormValues}
          organizationFormValues={organizationFormValues}
          searching={searching}
        />
      </div>
      <div style={{ alignSelf: "flex-end" }}> </div>
    </div>
  );
};
export default Onboard;
