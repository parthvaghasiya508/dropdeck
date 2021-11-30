import React from "react";
import { Language } from "@material-ui/icons";

const secret = true;
const required = true;

const DSWebServicePlugin = () => ({
  id: "web-service-plugin",
  name: "Web Service",
  icon: <Language/>,
  params: [{ name: "url", required }, { name: "user", secret }, { name: "password", secret }],
});
export default DSWebServicePlugin;
