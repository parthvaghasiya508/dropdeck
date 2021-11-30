import { input } from "../../../../../prompt/Question";
import { prompt } from "../../../../../prompt/Prompt";

// Question: Ask for a keyword and perform an image search
export const promptForQuery = prompt(input('What should we search for?', 'Type in a word or phrase'));
