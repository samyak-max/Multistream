import { createContext, useContext } from "react";

type StreamContextType = {
    platform: string;
    streamId: string;
    viewScreen: string;
    setPlatform: (newPlatform: string) => void;
    setStreamId: (newStreamId: string) => void;
    setViewScreen: (newViewScreen: string) => void;
}

const initialState = {
    platform: "",
    streamId: "",
    viewScreen: "1",
    setPlatform: () => {},
    setStreamId: () => {},
    setViewScreen: () => {},
}

const StreamContext = createContext<StreamContextType | null>(initialState);

export const StreamProvider = StreamContext.Provider;

export const useStream = () => {
    const context = useContext(StreamContext);
    if (!context) {
        throw new Error("useStream must be used within a StreamProvider");
    }
    return context;
};