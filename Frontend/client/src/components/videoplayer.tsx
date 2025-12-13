import React from "react";

interface VideoPlayerProps {
  videoSrc: string;
  title?: string;
  onBack?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, title, onBack }) => (
  <div className="p-8">
    {onBack && (
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-gray-200 rounded">
        Back
      </button>
    )}
    {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
    <video controls autoPlay style={{ maxWidth: "100%" }}>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);
export default VideoPlayer;
