const WAITING_MESSAGES = [
  'One moment please.',
  'Good things are happening...',
  "When I'm ready, I'm ready...",
  "It's Happening...",
  "Giddy Up...",
  "Sharpening Pencils...",
  "Dimming the lights...",
  'Prepare for magic...',
  'Mars is there, waiting to be reached...',
];

const ERROR_MESSAGES = [
  "We're sorry!",
  "Oops...didn't mean for that to happen!",
  "Sorry! I've done something wrong here...",
  "Erm...yeah, sorry, this one is on us.",
  "It's not you, it's me. Sorry."
];

const NOT_FOUND_MESSAGES = [
  "Nothing to see here.",
  "Sorry, wrong place.",
];

const WELCOME_MESSAGES = [
  "Let's get this show on the road...",
  "Rock 'n' roll!",
  "You're about to create slides like never before.",
  "Ready for a productivity boost?"
];

export const StatusMessage = {
  Waiting: "waiting",
  Error: "error",
  NotFound: "notFound",
  Welcome: "welcome"
};

const random = (messages) => messages[Math.floor(Math.random() * messages.length)];

/**
 * Helper for generating messages for users.
 *
 */
export default class MessageFactory {

  static getText = (status) => {
    switch (status) {
      case StatusMessage.Welcome:
        return random(WELCOME_MESSAGES);
      case StatusMessage.Error:
        return random(ERROR_MESSAGES);
      case StatusMessage.NotFound:
        return random(NOT_FOUND_MESSAGES);
      default:
        return random(WAITING_MESSAGES);
    }
  };

}
