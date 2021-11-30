import { Link } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, useTheme } from '@material-ui/styles';
import React, { useState } from 'react';
import Label from "../../../common/components/controls/Label";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    "& a": {
      textDecoration: "underline"
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 * Form to create an account.
 *
 * @param createAccount
 * @param handlePersonChange
 * @param handleOrganizationChange
 * @param personFormValues
 * @param organizationFormValues
 * @returns {*}
 * @constructor
 */
const AccountDetailForm = ({
  createAccount, handlePersonChange, handleOrganizationChange, personFormValues, setPersonFormValues, organizationFormValues, searching
}) => {
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(false);
  const [picture, setPicture] = useState();
  const classes = useStyles();

  const togglePicture = () => {
    if (personFormValues.picture) {
      setPicture(personFormValues.picture.toString());
      setPersonFormValues({ ...personFormValues, picture: null });
    } else {
      setPersonFormValues({ ...personFormValues, picture });
    }
  };

  const theme = useTheme();

  return (
    <form className={classes.form} onSubmit={createAccount} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ display: "flex", alignItems: "center", flexDirection: "column", padding: "0 10px 10px 10px" }}>
            {personFormValues.picture ? (
              <img src={personFormValues.picture} width="96" height="96" alt="profile" style={{ borderRadius: "50%", padding: 10 }} />
            ) : (
              <AccountCircleIcon style={{ height: 96, width: 96, padding: 10 }}/>
            )}
            {personFormValues.picture || picture ? (<Button color="primary" size="small" onClick={togglePicture}>{personFormValues.picture ? ("Remove Photo") : "Changed your mind?"}</Button>) : null}
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="givenName"
            variant="outlined"
            value={personFormValues.givenName}
            onChange={handlePersonChange}
            required
            fullWidth
            id="givenName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={personFormValues.familyName}
            onChange={handlePersonChange}
            variant="outlined"
            required
            fullWidth
            id="familyName"
            label="Last Name"
            name="familyName"
            autoComplete="lname"
          />
        </Grid>
        {organizationFormValues.domain
          ? (
            <>
              <Grid item xs={10}>
                <TextField
                  value={organizationFormValues.name}
                  onChange={handleOrganizationChange}
                  disabled={organizationFormValues.active || searching}
                  variant="outlined"
                  fullWidth
                  name="organization"
                  label="Company"
                  id="organization"/>
              </Grid>
              <Grid item xs={2}>
                <div style={{ paddingTop: 16, textAlign: "center", paddingRight: 8 }}>
                  { searching ? (
                    <CircularProgress
                      variant="indeterminate"
                      className={classes.bottom}
                      size={24}
                      thickness={4}
                    />
                  ) : (
                    <CheckCircleIcon style={{ color: "green" }} />
                  ) }
                </div>
              </Grid>
            </>
          ) : null}
        <Grid item xs={12}>
          <TextField
            value={personFormValues.email}
            variant="outlined"
            required
            fullWidth
            disabled
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        {organizationFormValues.domain
          ? (
            <Grid item xs={12}>
              <TextField
                value={organizationFormValues.domain.toLowerCase()}
                variant="outlined"
                disabled
                fullWidth
                name="domain"
                label="Domain"
                id="domain"
              />
            </Grid>
          ) : null}
        <Grid item xs={12}>
          <FormControlLabel
            control={(
              <Checkbox
                name="agreed"
                checked={privacyConsent}
                onChange={(event) => setPrivacyConsent(event.target.checked)}
                value="agreed"
                id="agreed"
                color="primary"
                style={{ marginTop: -22 }}
              />
            )}
            label={<Label variant="span" style={{ fontSize: "0.8em", color: theme.palette.text.secondary }}>I acknowledge that Dropdeck processes my personal data in line with its <Link href="https://docs.google.com/document/u/1/d/e/2PACX-1vS_pwhlPQBNW8RJWQXhl22d3XTCpG647MFwhMb-COJGVJn-D-E0gWZErwh2aMJmUXTXUqKZfXMl8Dfu/pub" rel="noreferrer" target="_blank" style={{ pointerEvents: "auto" }}>Privacy Policy</Link>.</Label>}
          />
          <FormControlLabel
            control={(
              <Checkbox
                name="agreed"
                checked={cookieConsent}
                onChange={(event) => setCookieConsent(event.target.checked)}
                value="agreed"
                id="agreed"
                color="primary"
                style={{ marginTop: -22 }}
              />
            )}
            label={<Label variant="span" style={{ fontSize: "0.8em", color: theme.palette.text.secondary }}>Dropdeck uses cookies for core functionality. Please read our <Link href="https://docs.google.com/document/u/1/d/e/2PACX-1vQuYP7iSIu07ihMtO_gATQxbA0M2SHlxZsOW8hBgTyVG-MSMbJqdY-rLZ7SV18QP-7VURAcfZrScLCE/pub" rel="noreferrer" target="_blank" style={{ pointerEvents: "auto" }}>Cookie Policy</Link>.</Label>}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        size="large"
        fullWidth
        variant="contained"
        color="primary"
        disabled={!privacyConsent || !cookieConsent || searching}
        className={classes.submit}
      >
        Create account
      </Button>
    </form>
  );
};
export default AccountDetailForm;
