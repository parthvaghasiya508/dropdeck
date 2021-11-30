// Question: Ask for a keyword and perform a logo search

import React from "react";
import { prompt } from "../../../../../prompt/Prompt";
import { input } from "../../../../../prompt/Question";
import Logos from "../../../../../../../../../../common/api/sdk/services/Logos";

const searchForLogo = (query, resolve, reject) => {
  Logos.get(query)
    .then((payload) => resolve({ payload, query }))
    .catch(() => reject(input(`We didn't find any result for that, sorry.`, 'Try typing in a URL')));
};

export const promptForCompany =
prompt(
  input('What company are you looking for?', 'Type in a company name or URL'),
  {
    submit: searchForLogo,
  }
);
