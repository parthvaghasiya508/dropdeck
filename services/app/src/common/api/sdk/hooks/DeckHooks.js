import { useEffect, useState } from "react";
import Dropdeck from "../Dropdeck";

/**
 * Get all decks for a user.
 *
 * @returns {[*[], unknown]}
 * @constructor
 */
const useUserDecks = (columnCount) => {
  const [decks, setDecks] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [userHasMore, setUserHasMore] = useState(false);
  const [userPageNumber, setUserPageNumber] = useState(1);

  const refetch = () => {
    Dropdeck.Decks.ownedByUser(userPageNumber, columnCount)
      .then((payload) => {
        setDecks([
          ...(decks || []),
          ...payload.data.decks,
        ]);
        setUserHasMore(payload.data.hasMore);
      })
      .catch((e) => setError(e));
  };

  useEffect(() => {
    refetch();
  }, [userPageNumber]);

  return [decks, refetch, error, userPageNumber, setUserPageNumber, userHasMore];
};
export { useUserDecks };

/**
 * Get all decks shared with a user.
 *
 * @returns {[*[], unknown]}
 * @constructor
 */
const useSharedDecks = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  const refetch = () => {
    Dropdeck.Decks.sharedWithUser()
      .then((payload) => {
        setDecks(payload.data);
      })
      .catch((e) => setError(e));
  };

  useEffect(() => {
    refetch();
  }, []);

  return [decks, refetch, error];
};
export { useSharedDecks };

/**
 * Create a new deck on the server.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useCreateDeck = () => {
  const [createDeck, setCreateDeck] = useState(undefined);
  const [deck, setDeck] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (createDeck) {
      // Because new deck state is created locally, doing lose type checking to see if just a string and using that to clone
      if (typeof createDeck === "string" || createDeck instanceof String) {
        Dropdeck.Decks.clone(createDeck)
          .then((payload) => {
            setDeck(payload.data);
          })
          .catch((e) => setError(e));
      } else {
        Dropdeck.Decks.create(createDeck)
          .then((payload) => {
            setDeck(payload.data);
          })
          .catch((e) => setError(e));
      }
    }
  }, [createDeck]);

  return [setCreateDeck, {
    deck,
    error
  }];
};
export { useCreateDeck };

/**
 * Update deck values on the server.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useUpdateDeck = () => {
  const [updateDeck, setUpdateDeck] = useState(undefined);
  const [deck, setDeck] = useState(undefined);
  const [error, setError] = useState(undefined);

  const setUpdate = (id, data) => {
    setUpdateDeck([id, data]);
  };

  useEffect(() => {
    if (updateDeck) {
      Dropdeck.Decks.update(updateDeck[0], updateDeck[1])
        .then((payload) => {
          setDeck(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [updateDeck]);

  return [setUpdate, {
    deck,
    error
  }];
};
export { useUpdateDeck };

/**
 * Delete deck by id.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useDeleteDeck = (onSuccess = () => {}, onError = () => {}) => {
  const [deleteDeck, setDeleteDeck] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (deleteDeck) {
      setStatus(undefined);
      Dropdeck.Decks.delete(deleteDeck)
        .then(() => {
          setStatus(deleteDeck);
          onSuccess(deleteDeck);
        })
        .catch((e) => {
          setError(e);
          onError(e);
        });
    }
  }, [deleteDeck]);

  return [setDeleteDeck, status, error];
};
export { useDeleteDeck };
