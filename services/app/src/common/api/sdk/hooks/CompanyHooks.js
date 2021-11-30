import { useEffect, useState } from "react";
import Dropdeck from "../Dropdeck";

/**
 * Get all decks for a company.
 *
 * @param user
 * @returns {[*[], refetch, unknown]}
 */
const useCompanyDecks = (user, columnCount) => {
  const [decks, setDecks] = useState([]);
  const [sharedDecks, setSharedDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const [companyHasMore, setCompanyHasMore] = useState(false);
  const [companyPageNumber, setCompanyPageNumber] = useState(1);
  const [sharedHasMore, setSharedHasMore] = useState(false);
  const [sharedPageNumber, setSharedPageNumber] = useState(1);

  const refetchCompanyDecks = () => {
    if (user.company !== undefined && user.company !== null) {
      Dropdeck.api.get(
        `companies/${user.company._id}/decks?page=${companyPageNumber}&columnCount=${columnCount}`,
        undefined,
      )
        .then((payload) => {
          setDecks([
            ...(decks || []),
            ...payload.data.decks,
          ]);
          setCompanyHasMore(payload.data.hasMore);
        })
        .catch((e) => setError(e));
    }
  };

  const refetchSharedDecks = () => {
    if (user.company !== undefined && user.company !== null) {
      Dropdeck.api.get(
        `companies/${user.company._id}/decks?page=${sharedPageNumber}&columnCount=${columnCount}&f=shared`,
        undefined,
      )
        .then((payload) => {
          setSharedDecks([
            ...(decks || []),
            ...payload.data.decks,
          ]);
          setSharedHasMore(payload.data.hasMore);
        })
        .catch((e) => setError(e));
    }
  };

  useEffect(() => {
    refetchCompanyDecks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    refetchCompanyDecks();
  }, [companyPageNumber]);

  useEffect(() => {
    refetchSharedDecks();
  }, [sharedPageNumber]);

  return [decks, refetchCompanyDecks, error, companyPageNumber, setCompanyPageNumber, companyHasMore, sharedDecks, sharedPageNumber, setSharedPageNumber, sharedHasMore];
};
export { useCompanyDecks };

/**
 * Create a new Company on the server.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useCreateCompany = () => {
  const [createCompany, setCreateCompany] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (createCompany) {
      Dropdeck.Companies.create(createCompany)
        .then((payload) => {
          setCompany(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [createCompany]);

  return [setCreateCompany, {
    company,
    error
  }];
};
export { useCreateCompany };

/**
 * Update company values on the server.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useUpdateCompany = () => {
  const [updateCompany, setUpdateCompany] = useState(undefined);
  const [company, setCompany] = useState(undefined);
  const [error, setError] = useState(undefined);

  const setUpdate = (id, data) => {
    setUpdateCompany([id, data]);
  };

  useEffect(() => {
    if (updateCompany) {
      Dropdeck.Companies.update(updateCompany[0], updateCompany[1])
        .then((payload) => {
          setCompany(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [updateCompany]);

  return [setUpdate, {
    company,
    error
  }];
};
export { useUpdateCompany };

/**
 * Delete company by id.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useDeleteCompany = () => {
  const [deleteCompany, setDeleteCompany] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (deleteCompany) {
      setStatus(undefined);
      Dropdeck.Companies.delete(deleteCompany)
        .then(() => {
          setStatus(true);
        })
        .catch((e) => setError(e));
    }
  }, [deleteCompany]);

  return [setDeleteCompany, status, error];
};
export { useDeleteCompany };
