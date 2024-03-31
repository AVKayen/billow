import { useContext } from "react";
import { Track } from "~/types";
import { QueueContext } from "~/components/Queue";
import Icon from "~/components/Icon";
import Timer from "~/components/Timer";


function Track({ track }: { track: Track }) {
    const { addToQueue } = useContext(QueueContext)!;
    return (
        <div className="track">
            <p className="title">{track.track_number}. {track.title}</p>
            <p className="artist">{track.artist}</p>
            <div className="duration">
                <p><Timer seconds={track.duration} /></p>
                <button onClick={() => addToQueue(track)}>
                    <Icon name="add" />
                </button>
            </div>
        </div>
    );
}

export default Track;