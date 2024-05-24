import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWeatherData } from "../interface/main.interface";
import { IMusicData } from "../interface/music.interface";

const localStorageVolume = parseInt(
  localStorage.getItem("musicPlayerVolume") || "10"
);

interface IMusicState {
  nowWeather: IWeatherData;
  playMusics: IMusicData[];
  volume: number;
}

let initialState: IMusicState = {
  nowWeather: {},
  playMusics: [],
  volume: localStorageVolume,
};

const musicSlice = createSlice({
  name: "music",
  initialState: initialState,
  reducers: {
    setNowWeather(state, action: PayloadAction<IWeatherData>) {
      state.nowWeather = action.payload;
    },
    setPlayMusics(state, action: PayloadAction<IMusicData[]>) {
      state.playMusics = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
});

export const musicActions = musicSlice.actions;
export default musicSlice.reducer;
