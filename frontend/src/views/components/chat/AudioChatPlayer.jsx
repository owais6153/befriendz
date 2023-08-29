import { Images } from "config/images";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Sound from "./sound.mp3";
const AudioChatPlayer = (props) => {
  const { sender } = props;
  const [playStatus, setPlayStatus] = useState(false);
  const { playIcon } = Images;
  const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#eee",
    progressColor: "OrangeRed",
    cursorColor: "OrangeRed",
    barWidth: 3,
    barRadius: 3,
    responsive: true,
    height: 150,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
  });
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const [count, setCount] = useState(null);
  useEffect(() => {
    // setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(Sound);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      //   wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(0.5);
        wavesurfer.current.setHeight(40);
        wavesurfer.current.setWaveColor(sender ? "#FD6769" : "#FFFFFF");
        wavesurfer.current.setProgressColor(sender ? "#FD6769" : "#FFFFFF");
        // wavesurfer.current.setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, []);

  useEffect(() => {
    if (playStatus) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  }, [playStatus]);

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <div>
          <button
            onClick={() => {
              setPlayStatus(!playStatus);
            }}
          >
            <img src={playIcon.default} className="h-8 w-8" />
          </button>
        </div>
        <div className="md:w-[130px] w-[80px] h-10" ref={waveformRef} />
        <div>2:12</div>
      </div>
    </>
  );
};

export default AudioChatPlayer;
