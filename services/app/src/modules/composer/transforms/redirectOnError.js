import { ROUTE_AUTH_EXPIRED, ROUTE_EDIT_DECK, ROUTE_ERROR, ROUTE_NOT_FOUND } from "../../../Routes";

export const redirectOnError = (statusCode, redirectUri) => {
  let errorPage = redirectUri ? `${ROUTE_ERROR}?redirect=${encodeURI(redirectUri)}` : ROUTE_ERROR;
  switch (statusCode) {
    case 404:
      errorPage = redirectUri ? `${ROUTE_NOT_FOUND}?redirect=${encodeURI(redirectUri)}` : ROUTE_NOT_FOUND;
      break;
    case 403:
      errorPage = redirectUri ? `${ROUTE_ERROR}?redirect=${encodeURI(redirectUri)}` : ROUTE_ERROR;
      break;
    case 401:
      errorPage = redirectUri ? `${ROUTE_AUTH_EXPIRED}?redirect=${encodeURI(redirectUri)}` : ROUTE_AUTH_EXPIRED;
      break;
  }
  document.location = errorPage;
};
