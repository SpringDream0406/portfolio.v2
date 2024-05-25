import { useEffect } from "react";
import "../../styles/Main.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import SideWeather from "./MainConponents/SideWeather";
import NavigationBar from "./MainConponents/NavigationBar";
import SideClock from "./MainConponents/SideClock";
import { useSelector } from "react-redux";
import { Utils } from "../../utils/utils";
import { RootState } from "../../redux/store";

const Main = () => {
  const nowWeather = useSelector((state: RootState) => state.music.nowWeather);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    "/images/backgrounds/clear.gif"
  );

  useEffect(() => {
    Utils.changeBackground(setBackgroundImage, nowWeather);
  }, [nowWeather]);

  // console.log("load count");

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="outerBlue">
        <div className="whiteSolid">
          <div className="outerbox">
            <div className="wrapper">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <NavigationBar />
      <div className="side">
        <div className="music" id="music">
          <MusicPlayer />
        </div>
        <div className="weather">
          <SideWeather />
        </div>
        <div className="time">
          <SideClock />
        </div>
      </div>
    </div>
  );
};

export default Main;
