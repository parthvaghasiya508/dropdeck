import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useTheme } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useUpdateMe } from "../../../common/api/sdk/hooks/PeopleHooks";
import Label from "../../../common/components/controls/Label";
import { logger } from "../../../common/util/logger";

const ProfileConfiguration = ({ user }) => {

  const theme = useTheme();

  const [changed, setChanged] = useState(false);
  const [personFormValues, setPersonFormValues] = useState({
    givenName: "",
    familyName: "",
    email: "",
    picture: "",
  });

  useEffect(() => {
    if (user) {
      const person = {
        givenName: user.givenName,
        familyName: user.familyName,
        email: user.email,
        picture: user.picture
      };
      setPersonFormValues(person);
    }
  }, [user]);

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  let timeout;
  const saveProgress = (value) => {
    if (timeout) clearTimeout(timeout);

    setProgress(value);
    if (value === 100) {
      setProgressText("Saved");
      setProgress(100);
      timeout = setTimeout(() => {
        setProgress(0);
        setProgressText("");
      }, 2000);
    } else if (value === 0) {
      setProgress(0);
      setProgressText("");
    } else {
      setProgress(value);
      setProgressText("Saving...");
    }
  };

  const [updateMe, updatedMe] = useUpdateMe(saveProgress);

  useEffect(() => {
    if (changed) {
      const timer = setTimeout(() => {
        setProgress(1);
        updateMe(personFormValues);
        logger.debug("Saved values to server.");
      }, 1000);
      return () => {
        setProgress(0);
        clearTimeout(timer);
      };
    }
    return () => setProgress(0);
  }, [personFormValues, changed]);

  const handlePersonChange = (e) => {
    const { name } = e.target;
    const person = { ...personFormValues };
    person[name] = e.target.value;
    setPersonFormValues(person);
    setChanged(true);
  };

  const [picture, setPicture] = useState();

  const togglePicture = () => {
    setProgress(1);
    if (personFormValues.picture) {
      setPicture(personFormValues.picture.toString());
      setPersonFormValues({ ...personFormValues, picture: null });
    } else {
      setPersonFormValues({ ...personFormValues, picture });
    }
    setChanged(true);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={8} lg={6} style={{ margin: '0 auto', }}>
        <Grid container spacing={2}>

          {/* Profile Pic */}
          <Grid item xs={12}>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", padding: "0px 10px" }}>
              {personFormValues.picture ? (
                <img src={personFormValues.picture} width="96" height="96" alt="profile" style={{ borderRadius: "50%", padding: 10 }} />
              ) : (
                <AccountCircleIcon style={{ height: 96, width: 96, padding: 10, color: theme.palette.text.primary }}/>
              )}
              {personFormValues.picture || picture ? (<Button color="primary" size="small" onClick={togglePicture}>{personFormValues.picture ? ("Remove Photo") : "Changed your mind?"}</Button>) : null}
            </div>
          </Grid>
          {/* Greeting */}
          <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Label variant="h2" >Welcome, {personFormValues.givenName}</Label>
            </div>
          </Grid>
          {/* Instructions */}
          <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 15, }}>
              <Label variant="p" >Manage your information to make Dropdeck work better for you.</Label>
            </div>
          </Grid>
          {/* First Name */}
          <Grid item xs={12} md={6}>
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
          {/* Last Name */}
          <Grid item xs={12} md={6}>
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
          
          {/* Fixed Spinner */}
          <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", position: "fixed", height: 0, bottom: 0, left: 0, right: 0, }}>
              {progress !== 0 && (
                <div style={{ 
                  display: "flex", 
                  flexDirection: "row", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  position: "absolute", 
                  top: -60, 
                  right: 20,
                  width: 98, 
                  padding: '8px', 
                  backgroundColor: theme.dark() ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.035)", 
                  borderRadius: '3px', 
                }}>
                  <CircularProgress variant="determinate" value={progress} size="1.4em" style={{ color: '#00c030' }} />
                  <span style={{ color: '#00c030', fontSize: "0.9em", marginLeft: 6 }}>{progressText}</span>
                </div>
              )}
            </div>
          </Grid>
          {/* Policies */}
          <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: '1em', }}>
              <Button variant="text" href="https://docs.google.com/document/u/1/d/e/2PACX-1vS_pwhlPQBNW8RJWQXhl22d3XTCpG647MFwhMb-COJGVJn-D-E0gWZErwh2aMJmUXTXUqKZfXMl8Dfu/pub" target="_new" style={{ fontSize: '0.75em', opacity: '0.4', }}>Privacy Policy</Button>
              <Button variant="text" href="https://docs.google.com/document/u/1/d/e/2PACX-1vQuYP7iSIu07ihMtO_gATQxbA0M2SHlxZsOW8hBgTyVG-MSMbJqdY-rLZ7SV18QP-7VURAcfZrScLCE/pub" target="_new" style={{ fontSize: '0.75em', opacity: '0.4', }}>Cookie Policy</Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
};
export default ProfileConfiguration;
