export const Animations = {
  imagePan() {
    return {
      '& img': {
        "ms-animation": "$move 80s infinite",
        "webkit-animation": "$move 80s infinite",
        "0-animation": "$move 80s infinite",
        "moz-animation": "$move 80s infinite",
        animation: "$move 80s ease-out infinite",
      },
    };
  },
};
