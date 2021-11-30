import { Checkbox } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { DeleteForever } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useTheme } from "@material-ui/styles";
import React, { useState } from "react";
import { apiHost } from "../../../App";
import Dropdeck from "../../../common/api/sdk/Dropdeck";
import ConfirmationButton from "../../../common/components/ConfirmationButton";
import Label from "../../../common/components/controls/Label";
import { logger } from "../../../common/util/logger";

const AccountConfiguration = () => {
  const [readyToDelete, setReadyToDelete] = useState(false);
  const theme = useTheme();

  const deleteAccount = () => {
    Dropdeck.People.delete("/me").then(() => {
      window.location = `${apiHost()}/auth/logout`;
    }).catch((e) => {
      logger.error("Failed to delete account!");
    });
  };

  return (
    <div>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={8} lg={6} style={{ margin: '0 auto', }}>
          <Grid container spacing={2}>

            {/* Icon */}
            <Grid item xs={12}>
              <div style={{ display: "flex", alignItems: "center", flexDirection: "column", padding: "0px 10px" }}>
                <AccountCircleIcon style={{ height: 96, width: 96, padding: 10, color: theme.palette.text.primary }}/>
              </div>
            </Grid>
            {/* Your Account */}
            <Grid item xs={12}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Label variant="h2" >Your Account</Label>
              </div>
            </Grid>
            {/* Delete */}
            <Grid item xs={12}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", }}>
                <Label variant="h4" color="primary" style={{ fontWeight: 'bold' }}>Delete Account</Label>
              </div>
            </Grid>
            {/* Instructions */}
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: 15, }}>
                <Label variant="p">To delete your account please confirm below.<br/><strong>Note:</strong> This action can not be undone. Your decks, data and account will all be permanently lost.</Label>
              </div>
            </Grid>
            {/* Check */}
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <FormControlLabel control={(<Checkbox name="sure-i-want-to-delete" value={readyToDelete} onChange={(e) => setReadyToDelete(e.target.checked)}/>)} label={<Label style={{ fontSize: "0.9em", marginLeft: 2 }}>I am sure I want to permanently delete my account.</Label>}/>
            </Grid>
            {/* Confirm */}
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <ConfirmationButton icon={<DeleteForever/>} style={{ marginLeft: 2 }} disabled={!readyToDelete} onConfirm={deleteAccount} primaryLabel="Click here to confirm account deletion" label="Permanently Delete My Account"/>
            </Grid>

          </Grid>
        </Grid>
      </Grid>

    </div>

  );
};
export default AccountConfiguration;
