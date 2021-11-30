import { input } from "../../../../../prompt/Question";
import { prompt } from "../../../../../prompt/Prompt";

// Question: Ask for a location
export const promptForLocation = prompt(input('Where do you want a map of?', 'Type in a location'));
