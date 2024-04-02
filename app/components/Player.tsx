import { useContext, useState, useRef, useEffect } from 'react';
import { QueueContext } from "~/components/Queue";
import Icon from "~/components/Icon";
import { ALBUMS, COVERS, PLAYER } from "~/constants";
import { Track } from "~/types";
import Timer from "~/components/Timer";

const Player = () => {
    const { queue, setQueue } = useContext(QueueContext)!;
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const removeFromQueue = (index: number) => {
        setQueue(prevQueue => prevQueue.filter((_, i) => i !== index));
    }

    const [currentTime, setCurrentTime] = useState(0);

    const skipTrack = () => {
        setQueue(prevQueue => {
            if (prevQueue.length > 0) {
                const nextTrack = prevQueue[0];
                setCurrentTrack(nextTrack);
                setIsPlaying(true);
                return prevQueue.slice(1);
            } else {
                setCurrentTrack(null);
                setIsPlaying(false);
                return [];
            }
        });
    };


    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);


    useEffect(() => {
        if (audioRef.current && currentTrack) {
            const audio = audioRef.current;
            audio.src = `${PLAYER}${currentTrack.albumId}/${currentTrack.trackNumber}`;
            audio.load();
            setIsPlaying(true);

            const updateTime = () => setCurrentTime(audio.currentTime);

            audio.addEventListener('timeupdate', updateTime);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
            };
        }
    }, [currentTrack]);

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.src = `${PLAYER}${currentTrack.albumId}/${currentTrack.trackNumber}`;
            audioRef.current.load();
            setIsPlaying(true);
        }
    }, [currentTrack]);

    useEffect(() => {
        if (queue.length > 0 && !currentTrack) {
            setCurrentTrack(queue[0]);
            setIsPlaying(true);
            setQueue(prevQueue => prevQueue.slice(1));
        }
    }, [queue, currentTrack]);

    const moveTrack = (index: number, newIndex: number) => {
        if (index > 0 && index < queue.length) {
            setQueue(prevQueue => {
                const item = prevQueue[index];
                let newQueue = [...prevQueue];
                newQueue.splice(index, 1);
                newQueue.splice(newIndex, 0, item);
                return newQueue;
            });
        }
    }

    const onProgressBarClick = (e: React.MouseEvent<HTMLProgressElement>) => {
        if (audioRef.current && currentTrack) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const clickedValue = x * e.currentTarget.max / rect.width;
            audioRef.current.currentTime = clickedValue;
            setCurrentTime(clickedValue);
        }
    };

    return (
        <div id="queue">
            <div id="player">
                {currentTrack && (
                    <>
                        <audio ref={audioRef} autoPlay={isPlaying} />
                        <div className="track-info">
                            <img className="cover" src={`${ALBUMS}${currentTrack.albumId}/cover`}  alt={currentTrack.title} />
                            <div className="title-artist-bloc">
                                <p className="title">{currentTrack.title}</p>
                                <p className="artist">{currentTrack.artist}</p>
                            </div>
                            <div className="progress-bar">
                                <progress value={currentTime} max={currentTrack.length} onClick={onProgressBarClick} />
                            </div>
                            <div className='time'>
                                <p className="current"><Timer seconds={currentTime} /></p>
                                <p className="total"><Timer seconds={currentTrack.length} /></p>
                            </div>
                        </div>
                        <div className="controls">
                            {/* vvv fix this one vvv */}
                            <button onClick={skipTrack}><Icon name="skip_previous" /></button>
                            <button onClick={() => { setIsPlaying(!isPlaying) }}>
                                {isPlaying ? <Icon name="pause" /> : <Icon name="play_arrow" />}
                            </button>
                            <button onClick={skipTrack}><Icon name="skip_next" /></button>
                            {/* volume controls to-be */}
                        </div>
                    </>
                )}
            </div>
            {queue !== null && (
                <div id="queue-list">
                    {queue.map((item, index) => (
                        <div className="track" key={index}>
                            <img className="cover" src={`${ALBUMS}${item.albumId}/cover`} alt={item.title} />
                            <div className="title-artist-bloc">
                                <p className="title">{item.title}</p>
                                <p className="artist">{item.artist}</p>
                            </div>
                            <p className="duration">
                                <Timer seconds={item.length} />
                            </p>
                            <button onClick={() => removeFromQueue(index)}><Icon name="clear" /></button>
                            <button onClick={() => moveTrack(index, index - 1)}><Icon name="arrow_upward" /></button>
                            <button onClick={() => moveTrack(index, 0)}> <Icon name="arrow_warm_up" /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Player;