import { useEffect, useState } from "react";
import Dropdeck from "../Dropdeck";

/**
 * Get all files for a user.
 *
 * @returns {[*[], unknown]}
 * @constructor
 */
const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(undefined);

  const refetch = () => {
    Dropdeck.Files.all()
      .then((payload) => {
        setFiles(payload.data);
      })
      .catch((e) => setError(e));
  };

  useEffect(() => {
    refetch();
  }, []);

  return [files, refetch, error];
};
export { useFiles };

/**
 * Create a new file on the server.
 *
 * @returns {[(value: unknown) => void, {file: *[], error: unknown}]}
 */
const useCreateFile = () => {
  const [createFile, setCreateFile] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (createFile) {
      Dropdeck.Files.create(createFile)
        .then((payload) => {
          setFile(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [createFile]);

  return [setCreateFile, {
    file,
    error
  }];
};
export { useCreateFile };

/**
 * Update file values on the server.
 *
 * @returns {[(value: unknown) => void, {file: *[], error: unknown}]}
 */
const useUpdateFile = () => {
  const [updateFile, setUpdateFile] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const [error, setError] = useState(undefined);

  const setUpdate = (id, data) => {
    setUpdateFile([id, data]);
  };

  useEffect(() => {
    if (updateFile) {
      Dropdeck.Files.update(updateFile[0], updateFile[1])
        .then((payload) => {
          setFile(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [updateFile]);

  return [setUpdate, {
    file,
    error
  }];
};
export { useUpdateFile };

/**
 * Delete file by id.
 *
 * @returns {[(value: unknown) => void, {file: *[], error: unknown}]}
 */
const useDeleteFile = () => {
  const [deleteFile, setDeleteFile] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (deleteFile) {
      setStatus(undefined);
      Dropdeck.Files.delete(deleteFile)
        .then(() => {
          setStatus(true);
        })
        .catch((e) => setError(e));
    }
  }, [deleteFile]);

  return [setDeleteFile, status, error];
};
export { useDeleteFile };
