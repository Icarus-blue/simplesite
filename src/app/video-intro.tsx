"use client";

import React from "react";

const YOUTUBE_ID = "tpuEgfIcmH0";
const YOUTUBE_URL = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;

export function VideoIntro() {
  // Prevent click on video from propagating to the page
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  // Open YouTube in new tab on page click
  const openYoutube = () => window.open(YOUTUBE_URL, "_blank");

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4 cursor-pointer"
      onClick={openYoutube}
    >
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 drop-shadow-lg">
          Larry: Portrait of A Predator Part - U.S. Gymnastics Scandal
        </h1>
        <p className="text-gray-200 text-center mb-8 max-w-xl mx-auto">
          The rise of Bela Karolyi and America&apos;s love affair with gymnastics.
        </p>
        <div
          className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl mx-auto"
          onClick={stopPropagation}
        >
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&rel=0&showinfo=0&controls=1`}
            title="Larry: Portrait of A Predator Part - U.S. Gymnastics Scandal"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default VideoIntro;
