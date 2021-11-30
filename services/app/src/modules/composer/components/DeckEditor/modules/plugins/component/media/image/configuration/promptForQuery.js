import { input } from "../../../../../prompt/Question";
import { prompt } from "../../../../../prompt/Prompt";

// Question: Ask for a keyword and perform an image search
export const promptForQuery = prompt(input('A picture of what?', 'Type in a word or phrase'));
