// This hook provides webcam access and basic face detection using face-api.js
// It returns { webcamRef, faceDetected } for use in components
import { useEffect, useRef, useState, MutableRefObject } from "react";
import * as faceapi from "face-api.js";

declare global {
  interface Window {
    faceapi?: typeof faceapi;
  }
}

export function useWebcamFaceDetection() {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const [faceDetected, setFaceDetected] = useState(true); // Assume present initially

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let stream: MediaStream | undefined;
    let faceapiLoaded = false;
    let video: HTMLVideoElement | null = null;

    async function loadFaceApi() {
      if (!window.faceapi) {
        window.faceapi = faceapi;
      }
      await window.faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      faceapiLoaded = true;
    }

    async function startWebcam() {
      video = webcamRef.current;
      if (!video) return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
      } catch (err) {
        setFaceDetected(true); // fallback: always play
      }
    }

    loadFaceApi().then(() => {
      startWebcam();
      interval = setInterval(async () => {
        if (video && faceapiLoaded && video.readyState === 4) {
          const detections = await window.faceapi!.detectAllFaces(video, new window.faceapi!.TinyFaceDetectorOptions());
          setFaceDetected(detections.length > 0);
        }
      }, 2000);
    });

    return () => {
      if (interval) clearInterval(interval);
      if (stream) stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    };
  }, []);

  return { webcamRef, faceDetected };
}
