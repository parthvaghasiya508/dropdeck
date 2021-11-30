import { playerTransform } from "./player/playerTransform";

const transform = (data, request) => {
  return playerTransform(data, request);
};

export default transform;
