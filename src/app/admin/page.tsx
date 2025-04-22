"use client";
import { useState } from "react";

export default function AdminPage() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<null | string>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Uploading...");
    try {
      const res = await fetch("https://simplebackend-qxl1.onrender.com/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl, title, description }),
      });
      if (res.ok) {
        setStatus("✅ Video info saved!");
        setYoutubeUrl("");
        setTitle("");
        setDescription("");
      } else {
        const data = await res.json();
        setStatus("❌ " + (data.error || "Failed to save. Please try again."));
      }
    } catch (err) {
      setStatus("❌ An error occurred.");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-24 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Admin: Upload YouTube Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="YouTube Video URL"
          className="w-full border p-2 rounded"
          value={youtubeUrl}
          onChange={e => setYoutubeUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Video Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>
      {status && (
        <div className="mt-4 text-center text-sm">
          {status}
        </div>
      )}
    </div>
  );
}
