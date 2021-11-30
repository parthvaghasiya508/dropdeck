import { useEffect, useState } from "react";
import AnonymousUser from "../../../authz/AnonymousUser";
import Dropdeck from "../Dropdeck";

/**
 * Get all decks for a user.
 *
 * @returns {[*[], unknown]}
 * @constructor
 */
const useMe = (allowAnonymous = false) => {
  const [me, setMe] = useState(undefined);
  const [error, setError] = useState(undefined);

  const refetch = () => {
    Dropdeck.People.me()
      .then((payload) => {
        const user = payload.data;
        setMe(user);
      })
      .catch((e) => {
        if (allowAnonymous) {
          setMe(new AnonymousUser());
        } else {
          setError(e);
        }
      });
  };

  useEffect(() => {
    refetch();
  }, [true]);

  return [me, refetch, error];
};
export { useMe };

/**
 * Update logged in person values on the server.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useUpdateMe = (progress) => {
  const [updateMe, setUpdatePerson] = useState(undefined);
  const [me, setMe] = useState(undefined);
  const [error, setError] = useState(undefined);

  const setUpdateMe = (data) => {
    setUpdatePerson(data);
  };

  useEffect(() => {
    if (updateMe) {
      Dropdeck.People.updateMe(updateMe, progress)
        .then((payload) => {
          setMe(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [updateMe]);

  return [setUpdateMe, me, error];
};
export { useUpdateMe };

/**
 * Get all decks for a user.
 *
 * @returns {[*[], unknown]}
 * @constructor
 */
const usePeople = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(undefined);

  const refetch = () => {
    Dropdeck.People.all()
      .then((payload) => {
        setPeople(payload.data);
      })
      .catch((e) => setError(e));
  };

  useEffect(() => {
    refetch();
  }, [true]);

  return [people, refetch, error];
};
export { usePeople };

/**
 * Create a new person on the server.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useCreatePeople = () => {
  const [createPerson, setCreatePerson] = useState(undefined);
  const [person, setPerson] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (createPerson) {
      Dropdeck.People.create(createPerson)
        .then((payload) => {
          setPerson(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [createPerson]);

  return [setCreatePerson, {
    person,
    error
  }];
};
export { useCreatePeople };

/**
 * Update person values on the server.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useUpdatePerson = () => {
  const [updatePerson, setUpdatePerson] = useState(undefined);
  const [person, setPerson] = useState(undefined);
  const [error, setError] = useState(undefined);

  const setUpdate = (id, data) => {
    setUpdatePerson([id, data]);
  };

  useEffect(() => {
    if (updatePerson) {
      Dropdeck.People.update(updatePerson[0], updatePerson[1])
        .then((payload) => {
          setPerson(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [updatePerson]);

  return [setUpdate, {
    person,
    error
  }];
};
export { useUpdatePerson };

/**
 * Delete person by id.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useDeletePerson = () => {
  const [deletePerson, setDeletePerson] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (deletePerson) {
      setStatus(undefined);
      Dropdeck.People.delete(deletePerson)
        .then(() => {
          setStatus(true);
        })
        .catch((e) => setError(e));
    }
  }, [deletePerson]);

  return [setDeletePerson, status, error];
};
export { useDeletePerson };
