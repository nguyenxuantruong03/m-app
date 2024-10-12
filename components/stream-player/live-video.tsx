"use client";

import { useEffect, useRef, useState } from "react";

import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";
import { PlayPauseControl } from "./play-pause-control";
import { PictureInPictureControl } from "./picture-in-picture";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ShoppingCardInLive from "./shopping-cart";

interface LiveVideoProps {
  participant: Participant;
  showExtension: boolean;
  nameuser: string;
}

export const LiveVideo = ({
  participant,
  showExtension,
  nameuser
}: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleAutoPlay = () => {
        if (!isPlaying) {
          videoElement.pause(); // Ngăn video tự động phát lại nếu không ở trạng thái phát
        }
      };

      videoElement.addEventListener("play", handleAutoPlay);

      return () => {
        videoElement.removeEventListener("play", handleAutoPlay);
      };
    }
  }, [isPlaying]);

  const togglePlayPause = async () => {
    if (videoRef.current) {
      const isPaused = videoRef.current.paused; // Kiểm tra nếu video đang tạm dừng
      if (!isPaused) {
        try {
          await videoRef.current.pause(); // Đảm bảo dừng phát
          setIsPlaying(false); // Cập nhật trạng thái phát/tạm dừng
        } catch (error) {
          console.error("Error pausing video:", error);
        }
      } else {
        try {
          await videoRef.current.play(); // Đảm bảo phát lại
          setIsPlaying(true); // Cập nhật trạng thái phát/tạm dừng
        } catch (error) {
          console.error("Error playing video:", error);
        }
      }
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      {
        showExtension ? (
          <video ref={videoRef} width="100%" />
        ): (
          <Link href={`/live/${nameuser}`}><video ref={videoRef} width="100%" /></Link>
        )
      }
      <div
        className={cn(
          showExtension
            ? "xl:opacity-0 xl:hover:opacity-100 xl:hover:transition-all absolute top-0 h-full w-full"
            : ""
        )}
      >
        <div
          className={cn(
            "absolute bottom-0 flex h-14 w-full items-center justify-between px-4",
            showExtension ? "xl:bg-gradient-to-r xl:from xl:neutral-900" : "z-50 right-0"
          )}
        >
          <div className="flex items-center space-x-2">
          {showExtension && (
            <ShoppingCardInLive isPin={false}/>
          )}
            <PlayPauseControl
              isPlaying={isPlaying}
              onToggle={togglePlayPause}
            />
            <VolumeControl
              onChange={onVolumeChange}
              value={volume}
              onToggle={toggleMute}
            />
          </div>
          {showExtension && (
            <div className="flex items-center space-x-2">
              <FullscreenControl
                isFullscreen={isFullscreen}
                onToggle={toggleFullscreen}
              />
              <PictureInPictureControl videoElement={videoRef.current} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
