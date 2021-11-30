import { Signal } from '@dropdeck/schema';
import { logger } from "../../util/logger";

export const SignalService = {

  create: (signal, user) => {
    const signalPayload = {
      ...signal,
      created: new Date(),
      user: user ? user._id : null,
      company: user && user.company !== undefined ? user.company : null
    };
    Signal.create(signalPayload)
      .then(() => logger.trace("Signal received"))
      .catch((e) => logger.error(e));
  }

};
