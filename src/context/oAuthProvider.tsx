import { createContext, useContext } from "react";

type OAuthProviderContextType = {
    twitchState: { twitchToken: string; twitchUserId: string};
    youtubeState: { youtubeToken: string; youtubeUserId: string };
    setTwitchState: (newState: any) => void;
    setYoutubeState: (newState: any) => void;
};

const initialState = {
    twitchState: {
        twitchToken: "",
        twitchUserId: ""
    },
    youtubeState: {
        youtubeToken: "",
        youtubeUserId: ""
    },
    setTwitchState: () => {},
    setYoutubeState: () => {},
}

const OAuthProviderContext = createContext<OAuthProviderContextType | null>(initialState);

export const OAuthProvider = OAuthProviderContext.Provider;

export const useOAuth = () => {
    const context = useContext(OAuthProviderContext);
    if (!context) {
        throw new Error("useOAuth must be used within an OAuthProvider");
    }
    return context;
};