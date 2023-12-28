import { createContext, useContext } from "react";

type StreamScreenContextType = {
    platform: string;
    streamId: string;
}

type StreamContextType = {
    stream1: StreamScreenContextType;
    stream2: StreamScreenContextType;
    stream3: StreamScreenContextType;
    stream4: StreamScreenContextType;
    streamScreen: string;
    setStream1: (platform: string, streamId: string) => void;
    setStream2: (platform: string, streamId: string) => void;
    setStream3: (platform: string, streamId: string) => void;
    setStream4: (platform: string, streamId: string) => void;
    setStreamScreen: (streamScreen: string) => void;
}

const initialState = {
    stream1: {
        platform: "",
        streamId: "",
    },
    stream2: {
        platform: "",
        streamId: "",
    },
    stream3: {
        platform: "",
        streamId: "",
    },
    stream4: {
        platform: "",
        streamId: "",
    },
    streamScreen: "",
    setStream1: () => {},
    setStream2: () => {},
    setStream3: () => {},
    setStream4: () => {},
    setStreamScreen: () => {},
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