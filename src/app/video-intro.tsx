"use client";
import React, { useState, useEffect } from "react";

// Utility to extract video ID from various YouTube URL formats
function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Handle youtu.be short URLs
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    }

    // Handle standard watch URLs: ?v=VIDEO_ID
    if (parsed.searchParams.has("v")) {
      return parsed.searchParams.get("v");
    }

    // Handle /embed/VIDEO_ID, /v/VIDEO_ID, /live/VIDEO_ID
    const match = parsed.pathname.match(/\/(embed|v|live)\/([^/?]+)/);
    if (match) return match[2];

    // Handle /shorts/VIDEO_ID
    const shortsMatch = parsed.pathname.match(/\/shorts\/([^/?]+)/);
    if (shortsMatch) return shortsMatch[1];
  } catch {
    // Invalid URL
  }
  return null;
}

interface VideoData {
  youtubeUrl: string;
  title: string;
  description: string;
  createdAt?: string;
}

export default function VideoIntro() {
  const [video, setVideo] = useState<VideoData | null>(null);
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const res = await fetch("https://simpleback-gwkn.onrender.com/api/videos");
        if (!res.ok) throw new Error(`Failed to fetch video: ${res.status}`);
        const latestVideo = await res.json();
        console.log('==============>',latestVideo)
        if (!latestVideo || !latestVideo.youtubeUrl) {
          setError("No video found.");
          setLoading(false);
          return;
        }
        setVideo(latestVideo);
        setYoutubeId(extractYouTubeId(latestVideo.youtubeUrl));
      } catch (err: any) {
        setError(err.message || "Error fetching video.");
      } finally {
        setLoading(false);
      }
    }
    fetchLatestVideo();
  }, []);
  console.log(youtubeId)
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
  const openYoutube = () => {
    if (video?.youtubeUrl) window.open(video.youtubeUrl, "_blank");
  };

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-400">{error}</div>;
  if (!video || !youtubeId) return <div className="text-center py-20 text-white">No video available.</div>;

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4 cursor-pointer"
      onClick={openYoutube}
    >
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2 drop-shadow-lg">
          {video.title}
        </h1>
        <p className="text-gray-200 text-center mb-8 max-w-xl mx-auto">
          {video.description}
        </p>
        <div
          className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl mx-auto"
          onClick={stopPropagation}
        >
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&rel=0&showinfo=0&controls=1`}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
