import { createContext, useContext } from "react";

type TopStreamsType = {
    topTwitchStreams: {}[];
    topYoutubeStreams: {}[];
    twitchLoading: boolean;
    youtubeLoading: boolean;
    setTopTwitchStreams: (stream: object[]) => void;
    setTopYoutubeStreams: (stream: object[]) => void;
    setTwitchLoading: (loading: boolean) => void;
    setYoutubeLoading: (loading: boolean) => void;
}

const initialState: TopStreamsType = {
    topTwitchStreams: [],
    topYoutubeStreams: [],
    twitchLoading: true,
    youtubeLoading: true,
    setTopTwitchStreams: () => {},
    setTopYoutubeStreams: () => {},
    setTwitchLoading: () => {},
    setYoutubeLoading: () => {}
}

const topStreamContext = createContext<TopStreamsType | null>(initialState);

export const TopStreamProvider = topStreamContext.Provider;

export const useTopStream = () => {
    const context = useContext(topStreamContext);
    if (!context) {
        throw new Error("useStream must be used within a StreamProvider");
    }
    return context;
};