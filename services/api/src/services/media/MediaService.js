import { createReadStream } from "fs";
import config from "../../config.js";

const MIME = {
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
};

export const MediaService = {

  /**
   * Fetch a media asset by ID.
   */
  read: (id, res) => {
    const file = `${config.storage.disk.path}/${id}`;
    const stream = createReadStream(file);
    const ext = file.split(".");
    const mime = MIME[ext.pop()];

    stream.on('open', () => {
      res.set('Content-Type', mime || "image/jpg");
      stream.pipe(res);
    });
    stream.on('error', () => {
      res.set('Content-Type', 'text/plain');
      res.status(404).end('Not found');
    });
  },
};
