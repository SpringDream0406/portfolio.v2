import React from "react";
import { IMusicData } from "../interface/music";
import { NavigateFunction } from "react-router-dom";
import { musicActions } from "../redux/reducer";
import { IWeatherData } from "../interface/main";

export class Utils {
  static isEmptyObject(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
  }

  static getSize(id: string): { width: number; height: number } {
    const element = document.getElementById(id);
    if (element) {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      return { width, height };
    } else return { width: 0, height: 0 };
  }

  static ellipsisText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  static formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }

  static shufflePlaylist = (playlist: IMusicData[]): IMusicData[] => {
    const shuffledPlaylist = [...playlist];
    for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlaylist[i], shuffledPlaylist[j]] = [
        shuffledPlaylist[j],
        shuffledPlaylist[i],
      ];
    }
    return shuffledPlaylist;
  };

  static moveGeoPage = (
    navigate: NavigateFunction,
    inputCode: number
  ): void => {
    navigate("geolocation", { state: { code: inputCode } });
  };

  static filterShowData = (
    playlist: string | undefined,
    musicData: IMusicData[]
  ): IMusicData[] => {
    if (playlist === "total" || undefined) {
      return musicData;
    }
    const filteredMusic = musicData.filter((music) =>
      music.playlists.includes(playlist as string)
    );
    return filteredMusic;
  };

  static playSong = (dispatch: any, music: IMusicData[]): void => {
    dispatch(musicActions.setPlayMusics(music));
  };

  static changeBackground = (
    setBackgroundImage: any,
    nowWeather: IWeatherData
  ): void => {
    if (!Utils.isEmptyObject(nowWeather)) {
      const weather = nowWeather.weather[0].main;
      const imageURL = `/images/backgrounds/${weather}.gif`;
      setBackgroundImage(imageURL);
    }
  };

  static getObjLocalData(id: string): any | undefined {
    const localData = localStorage.getItem(id);
    if (localData) return JSON.parse(localData);
  }

  static setObjLocalData(id: string, data: any): void {
    localStorage.setItem(id, JSON.stringify(data));
  }
}
