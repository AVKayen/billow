import React, { createContext, useState } from 'react';
import { Track } from '~/types';

export const QueueContext = createContext<{
    queue: Track[],
    addToQueue: (item: any, index?: number) => void,
    setQueue: React.Dispatch<React.SetStateAction<any[]>>
} | null>(null);

export function QueueProvider({ children }: { children: React.ReactNode }) {
    const [queue, setQueue] = useState<any[]>([]);

    const addToQueue = (item: any, index: number = queue.length) => {
        if (index !== undefined) {
            setQueue(oldQueue => [...oldQueue.slice(0, index), item, ...oldQueue.slice(index)]);
        } else {
            setQueue(oldQueue => [...oldQueue, item]);
        }
    }

    return (
        <QueueContext.Provider value={{ queue, addToQueue, setQueue }}>
            {children}
        </QueueContext.Provider>
    );
}