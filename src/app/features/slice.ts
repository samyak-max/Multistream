import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "",
    clientId: "",
    channelId: "",
    twitchChannels: {
        data: [],
        platform: "twitch"
    },
    youtubeChannels: {
        data: [],
        platform: "youtube"
    },
    loginSession: "",
    platform: "",
    twitch: {
        clientId: "",
        session: "",
        clientSecret: "",
        redirectUri: "",
        scopes: ""
    },
    youtube: {
        clientId: "",
        session: "",
        clientSecret: "",
        redirectUri: "",
        scopes: ""
    },
    view: "single",
    screen: "1",
    search: {},
    selectedPlatform: "youtube"
};

export const Slice = createSlice({
    name: "selector",
    initialState,
    reducers: {
        setLoginSession: (state, action) => {
            state.loginSession = action.payload;
        },
        setTwitchChannels: (state, action) => {
            state.twitchChannels = action.payload;
        },
        setYoutubeChannels: (state, action) => {
            state.youtubeChannels = action.payload;
        },
        setSelectedChannel: (state, action) => {
            state.channelId = action.payload.id;
            state.platform = action.payload.platform;
            state.name = action.payload.name;
        }
    }
});