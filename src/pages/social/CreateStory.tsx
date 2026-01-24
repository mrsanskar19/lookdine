"use client";

import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import { Camera, X, Zap, RefreshCw, Image as ImageIcon, Check, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateStory() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } } 
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      alert("Camera access denied or not available.");
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/jpeg"));
      stopCamera();
    }
  };

  const handleClose = () => {
    stopCamera();
    navigate("/");
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* 🔴 Close Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-6 left-6 z-50 text-white bg-black/20 backdrop-blur-md rounded-full"
        onClick={handleClose}
      >
        <X size={24} />
      </Button>

      {/* 📸 Viewport Area */}
      <div className="relative w-full h-full flex items-center justify-center">
        {capturedImage ? (
          <img src={capturedImage} className="h-full w-full object-cover animate-in fade-in zoom-in-95 duration-300" />
        ) : stream ? (
          <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover mirror" />
        ) : (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <Camera size={40} className="text-white/20" />
            </div>
            <Button onClick={startCamera} className="rounded-full px-8 bg-white text-black hover:bg-white/90 font-bold">
              Enable Camera
            </Button>
          </div>
        )}
      </div>

      {/* 🛠 Interactive Controls */}
      <div className="absolute bottom-12 w-full px-10 flex items-center justify-between z-50">
        {!capturedImage && stream ? (
          <>
            <Button variant="ghost" size="icon" className="text-white bg-white/10 rounded-full h-12 w-12">
              <ImageIcon size={20} />
            </Button>
            
            {/* Main Shutter Button */}
            <button 
              onClick={capturePhoto}
              className="group relative flex items-center justify-center"
            >
              <div className="absolute h-20 w-20 rounded-full border-4 border-white/30 group-active:scale-90 transition-transform" />
              <div className="h-16 w-16 rounded-full bg-white group-active:scale-95 transition-transform" />
            </button>

            <Button variant="ghost" size="icon" className="text-white bg-white/10 rounded-full h-12 w-12">
              <RefreshCw size={20} />
            </Button>
          </>
        ) : capturedImage ? (
          <div className="w-full flex gap-4 animate-in slide-in-from-bottom-10">
            <Button 
              variant="secondary" 
              className="flex-1 h-14 rounded-2xl font-bold bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={() => { setCapturedImage(null); startCamera(); }}
            >
              <Trash2 className="mr-2 h-5 w-5" /> Retake
            </Button>
            <Button 
              className="flex-[2] h-14 rounded-2xl font-bold bg-primary text-white"
              onClick={() => alert("Story Uploaded! (Connect to API)")}
            >
              <Check className="mr-2 h-5 w-5" /> Share Story
            </Button>
          </div>
        ) : null}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}