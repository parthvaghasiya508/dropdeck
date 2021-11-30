import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { config } from "../../../config";

export const LoginForm = ({ className }) => {
  const action = `${config.api.host}/auth/login`;
  return (
    <form action={action} method="post">
      <div className={className}>Alternatively, you can simulate logging in as another user:</div>
      <div>
        <TextField
          fullWidth
          id="username"
          name="username"
          placeholder="user@company.com"
        />
        <input type="hidden" value="default" name="password" />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button aria-label="login" color="secondary" type="submit" variant="contained">Login</Button>
      </div>
    </form>
  );
};
