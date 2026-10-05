"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

function getEmbedUrl(url: string): {
  src: string;
  type: "youtube" | "gdrive" | "raw";
} {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id =
      url.match(/embed\/([^?]+)/)?.[1] ||
      url.match(/[?&]v=([^&]+)/)?.[1] ||
      url.match(/youtu\.be\/([^?]+)/)?.[1] ||
      url.match(/shorts\/([^?]+)/)?.[1] || // ✅ ADD THIS LINE
      "";

    return {
      src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`,
      type: "youtube",
    };
  }

  if (url.includes("drive.google.com")) {
    const id = url.match(/\/d\/([^/]+)/)?.[1] ?? "";
    return {
      src: `https://drive.google.com/file/d/${id}/preview`,
      type: "gdrive",
    };
  }

  return { src: url, type: "raw" };
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
}: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { src, type } = getEmbedUrl(videoUrl);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Pause raw video on close
  useEffect(() => {
    if (!isOpen) videoRef.current?.pause();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden bg-[#0c0c18] border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-4 duration-250">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
          <span className="flex-1 text-xs font-medium text-white/40 uppercase tracking-widest">
            Live Demo
          </span>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 text-white/50 transition-all duration-150 hover:bg-white/[0.12] hover:text-white active:scale-95 cursor-pointer"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <line x1="1" y1="1" x2="11" y2="11" />
              <line x1="11" y1="1" x2="1" y2="11" />
            </svg>
          </button>
        </div>

        {/* Video */}
        <div className="relative w-full aspect-video bg-black">
          {type === "raw" ? (
            <video
              ref={videoRef}
              src={src}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={isOpen ? src : ""}
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Demo video"
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>
      </div>
    </div>
  );
}
