import React from "react";
import LoadingStateComponent from "../../composer/components/LoadingStateComponent";

/**
 * Overlay to show while player is loading when using the preview player.
 *
 * @param firstReady
 * @param ready
 * @param progress
 * @param deck
 * @returns {JSX.Element}
 * @constructor
 */
export const LoadingComponent = ({ firstReady, ready, progress, deck }) => (
  <div style={{ display: ready ? "none" : "flex", height: "100vh", position: "absolute", top: 0, width: "100%", zIndex: 2, WebkitBackdropFilter: "blur(5px)", backdropFilter: "blur(5px)", backgroundColor: `rgba(0, 0, 0, ${firstReady ? 0.85 : 1})` }}>
    <LoadingStateComponent progress={progress > 0 ? progress : 2} message={`Opening '${deck.name ? deck.name : "Untitled"}'...`} player />
  </div>
);
