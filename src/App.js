import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isMuted, setIsMuted] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [isPortraitPhone, setIsPortraitPhone] = useState(false);

  const handleVideoLoaded = () => {
  document.getElementById("bgVideo");
  };

  const toggleSound = () => {
    const video = document.getElementById("bgVideo");
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleAbout = () => {
    setShowAbout((prev) => !prev);
  };

  // Detect phone + portrait orientation
  useEffect(() => {
    const checkOrientation = () => {
      const isPhone = window.innerWidth <= 768; // or another breakpoint for phones
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsPortraitPhone(isPhone && isPortrait);
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return (
    <div className="App">
      <video
        id="bgVideo"
        autoPlay
        muted
        loop
        playsInline
        src="/ExcerptEverydayEncores.mp4"
        type="video/mp4"
        onLoadedMetadata={handleVideoLoaded}
      />

      {isPortraitPhone && (
        <div className="rotateMessage">
          Please rotate your phone.
        </div>
      )}

      <div className="rightControls">
        <button className="aboutButton" onClick={toggleAbout}>
          <img src="/about.png" alt="About" className="aboutIcon" />
        </button>
        {showAbout && (
          <div className="aboutText">
            Johanna Odersky is an artist and musician based in Berlin.
          </div>
        )}
      </div>

      <img
        src={isMuted ? "/ON.png" : "/OFF.png"}
        alt={isMuted ? "Sound On" : "Sound Off"}
        className="soundIcon"
        onClick={toggleSound}
      />
    </div>
  );
}

export default App;
