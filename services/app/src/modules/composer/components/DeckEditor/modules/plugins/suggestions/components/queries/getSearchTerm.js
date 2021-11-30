import { getTypeAheadQuery } from "./getTypeAheadQuery";

export const getSearchTerm = (editor, promptSession) => {
  const query = getTypeAheadQuery(editor, promptSession);
  return query ? query.search : undefined;
};
