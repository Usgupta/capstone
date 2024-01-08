'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaStop, FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

// Options for wavesurfer
const formWaveSurferOptions = (ref: HTMLDivElement) => ({
    container: ref,
    waveColor: "#4c98ed",
    progressColor: "#507DBC",
    cursorColor: "#A1C6EA",
    barWidth: 4,
    barRadius: 3,
    responsive: true,
    normalize: true,
    partialRender: true,
    dragToSeek: true,
});

interface Props {
    audioFile: File;
    resetBtn: () => void;
}

export default function Audioplayer({ audioFile, resetBtn }: Props) {
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<any | null>(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [mute, setMute] = useState(false);

    let created = false
    useEffect(() => {
        // To prevent useEffect from running twice in React Strict mode
        if (!created) {
            created = true
            create();
        }
        return () => {
            if (wavesurfer.current) {
                // Destroys wavesurfer instance when component unmounts to prevent duplicates
                wavesurfer.current.destroy();
            }
        };
    }, []);

    // Sets playing to false when track has finished playing
    useEffect(() => {
        if (wavesurfer.current) {
            wavesurfer.current.on('finish', () => {
                setPlaying(false)
            })
        }
    }, [wavesurfer.current])

    const create = async () => {
        // Next.js dynamic import
        const WaveSurfer = (await import("wavesurfer.js")).default;
        if (waveformRef.current) {
            const options = formWaveSurferOptions(waveformRef.current);
            wavesurfer.current = WaveSurfer.create(options);
        }
        // Creating a new FileReader to read the uploaded audioFile
        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
            if (e.target) {
                const result: ArrayBuffer = e.target.result as ArrayBuffer;
                // Create a Blob providing as first argument a typed array with the file buffer
                const blob = new window.Blob([new Uint8Array(result)]);
                // Load the blob into Wavesurfer
                wavesurfer.current.loadBlob(blob);
            }
        }
        // Read File as an ArrayBuffer
        reader.readAsArrayBuffer(audioFile);
    };

    const handlePlayPause = () => {
        setPlaying(!playing);
        if (wavesurfer.current) {
            wavesurfer.current.playPause();
        }
    };

    const handleStopButton = () => {
        wavesurfer.current.stop()
        if (playing) {
            setPlaying(!playing)
        }
    }

    const handleVolumeSlider = (e: ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        if (newVolume === 0) {
            setMute(true)
        }
        else {
            setMute(false)
        }
        setVolume(newVolume)
        wavesurfer.current.setVolume(newVolume)
    }

    const handleMuteUnmute = () => {
        if (mute) {
            setVolume(0.5)
            wavesurfer.current.setVolume(0.5)
        }
        else {
            setVolume(0)
            wavesurfer.current.setVolume(0)
        }
        setMute(!mute);
    };

    return (
        <div className="relative w-full shadow-md rounded-md overflow-hidden">
            {/* <div className="absolute top-2 left-2">The name of the track</div> */}
            <div id="waveform" className="bg-gray-200 dark:bg-gray-600 w-full" ref={waveformRef}></div>
            <div className="buttons flex dark:bg-gray-300">
                <div className="basis-4/5">
                    <button onClick={handlePlayPause} className="mr-1 w-6 p-4 cursor-pointer inline-block">
                        {playing ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={handleStopButton} className="mr-1 w-6 p-4 cursor-pointer inline-block">
                        <FaStop />
                    </button>
                    <button onClick={handleMuteUnmute} className="mr-2 w-6 p-4 cursor-pointer inline-block">
                        {mute ? <FaVolumeXmark /> : <FaVolumeHigh />}
                    </button>
                    <input onChange={e => handleVolumeSlider(e)} className="w-[42%] max-xs:w-4/5 max-xs:ml-4" type="range" min="0" max="1" step="0.1" value={volume} />
                </div>
                <button className="basis-1/5 px-4 font-medium hover:text-blue-700 max-sm:text-sm" onClick={resetBtn}>Reupload</button>
            </div>
        </div>
    )
}
