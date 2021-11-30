import { logger } from '../../../util/logger.js';
import { FileStorageService } from "../FileStorageService";

const { Storage } = require('@google-cloud/storage');

/**
 * Service for storing files in a bucket on Google Cloud Storage.
 */
export class GoogleCloudStorageService extends FileStorageService {

  constructor({ bucketName }) {
    super();
    this.bucketName = bucketName;
    this.bucket = new Storage().bucket(bucketName);
  }

  /**
   * Get a v4 signed URL for reading a file securely.
   *
   * @param fileName
   * @returns {string}
   */
  generateSignedUrl = async (fileName) => {

    // These options will allow temporary read access to the file
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    // Get a v4 signed URL for reading the file
    const [url] = await this.bucket.file(fileName).getSignedUrl(options);
    return url;
  };

  /**
   * Store a file in a GCS bucket and make it public.
   *
   * @param folder
   * @param file
   * @param pathOnDisk
   * @returns {Promise<UploadResponse>}
   */
  upload = (folder, file, pathOnDisk) => {
    const { filename } = file;
    const destination = `${folder}/${filename}`;
    logger.debug(`About to upload file to ${destination} in GCS bucket ${this.bucketName}...`);
    return this.bucket.upload(pathOnDisk, {
      destination,
      metadata: {
        contentType: file.mimetype
      }
    })
      .then(async (uploadResponse) => {
        logger.debug(`Successfully uploaded file to ${destination} in GCS bucket ${this.bucketName}`);
      })
      .then(() => {
        // @todo delete the file on disk!
      })
      .catch((e) => {
        logger.error(`Error when uploading file ${filename} to GCS`);
        logger.error(e);
      });
  };

  /**
   * Copies a file from one folder to another.
   *
   * @param sourceFolder
   * @param fileName
   * @param targetFolder
   * @returns {Promise<UploadResponse>}
   */
  copy = (sourceFolder, fileName, targetFolder) => {
    const source = `${sourceFolder}/${fileName}`;
    const destination = `${targetFolder}/${fileName}`;

    logger.debug(`About to copy ${source} to ${destination} in GCS bucket ${this.bucketName}...`);
    return this.bucket.file(source).copy(this.bucket.file(destination))
      .then(async (uploadResponse) => {
        logger.debug(`Done copying ${source} to ${destination} in GCS bucket ${this.bucketName}`);
      })
      .catch((e) => {
        logger.error(`Error when copying ${source} to ${destination} in GCS bucket ${this.bucketName}`);
        logger.error(e);
      });
  }

}
