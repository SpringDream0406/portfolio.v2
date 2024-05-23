import ReactPlayer from "react-player";
import "./MobileMusic.css";
import { buttonData } from "../data/playerBtnData";
import { useEffect, useMemo, useRef, useState } from "react";
import { PlayerUtils } from "../utils/playerUtils";
import { playlists } from "../data/musicData";
import { Utils } from "../utils/utils";
import { IMusicData } from "../interface/music.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MobileMusic = () => {
  const dispatch = useDispatch();
  const playlist: IMusicData[] = useSelector(
    (state: RootState) => state.music.playMusics // playlist에서 선택한 노래 담겨있음
  );
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false); // 플레이 리스트 보여주기
  const [showPlayingList, setShowPlayingList] = useState<boolean>(false); // 플레링 리스트 보여주기
  const [seletedPlaylist, setSeletedPlaylist] = useState(""); // 선택된 플레이 리스트
  const [songTitle, setSongTitle] = useState<string>(""); // 제목
  const [songArtist, setSongArtist] = useState<string>(""); // 가수
  const [played, setPlayed] = useState<number>(0); // 곡 재생된 비율
  const [duration, setDuration] = useState("00:00"); // 곡 총 시간
  const playerRef = useRef<ReactPlayer | null>(null); // 플레이어 컨트롤 Ref
  // const [volume, setVolume] = useState<number>(30); // 볼륨
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0); // 현재 노래 인덱스
  const [isPlaying, setIsPlaying] = useState<number>(0); // 0: 정지, 1: 재생, 2:로딩
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false); // 버튼 잠금용
  const [isShuffleOn, setIsShuffleOn] = useState<boolean>(
    localStorage.getItem("isShuffleOn") === "true" || false
  ); // 셔플 기능 on/off
  const [shuffledPlaylist, setShuffledPlaylist] = useState<IMusicData[]>([]); // 셔플된 playlist 담겨있음
  const [realPlaylist, setRealPlaylist] = useState<IMusicData[]>([]); // 일반 or 셔플 된 playlist 담김
  const playerUtils = useMemo(
    () =>
      new PlayerUtils(realPlaylist, currentVideoIndex, setCurrentVideoIndex),
    [realPlaylist, currentVideoIndex]
  ); // 유튜브 컨트롤 하는데 필요한 것들 만들어둠

  // 플레이리스트 바뀌면 0번 인덱스로 바꾸고, localStorage에 저장하고, 랜덤플레이리스트 한 개 만들기
  useEffect(() => {
    setCurrentVideoIndex(0);
    localStorage.setItem("playlist", JSON.stringify(playlist));
    setShuffledPlaylist(Utils.shufflePlaylist(playlist));
  }, [playlist]);

  // 진짜 플레이 리스트 목록 업데이트 해주기
  useEffect(() => {
    setRealPlaylist(isShuffleOn ? shuffledPlaylist : playlist);
  }, [playlist, isShuffleOn, shuffledPlaylist]);

  // 왼쪽 상단의 플레이리스트 아이콘
  const playingListIcon = (
    <img
      onClick={() => {
        setShowPlayingList(!showPlayingList);
        setShowPlaylist(false);
      }}
      className="playing-list-icon"
      src={
        showPlayingList ? "images/playinglist.png" : "images/playinglist2.png"
      }
      alt="playinglist"
    />
  );

  // 왼쪽 상단 아이콘 클릭 했을 때 나오는 playingList
  const playingListHTML = (
    <div className="m-show-playingList">
      {realPlaylist.map((music, index) => (
        <div key={index} className="m-showing-playingList" onClick={() => {}}>
          <div
            className="m-playingList-title"
            onClick={() => {
              setCurrentVideoIndex(index);
              setShowPlayingList(false);
            }}
          >
            {Utils.ellipsisText(music.title, 30)}
          </div>
          <div className="m-playingList-artist">
            {Utils.ellipsisText(music.artist, 30)}
          </div>
        </div>
      ))}
    </div>
  );

  // 중앙 상단의 CM Music
  const cmMusic = (
    <div
      onClick={() => {
        setShowPlaylist(!showPlaylist);
        setShowPlayingList(false);
      }}
    >
      {seletedPlaylist ? seletedPlaylist : "CM Music"}
    </div>
  );

  // 중앙 상단 클릭 했을 때 나오는 playlist
  const playlistHTML = (
    <div className="m-show-playlist">
      {Object.entries(playlists).map(([key, value]) => (
        <div
          className="m-showing-playlist"
          key={key}
          onClick={() => {
            setSeletedPlaylist(key);
            setShowPlaylist(!showPlaylist);
            Utils.playSong(dispatch, Utils.filterShowMusicData(key));
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );

  // 오른쪽 상단의 볼륨
  const volumeBar = (
    <input
      type="range"
      min="0"
      max="100"
      defaultValue="30"
      step="1"
      className="volumerange"
    />
  );

  // 플레이어 컨트롤 버튼
  const playerControlBtn = buttonData(
    playerUtils,
    setIsPlayerReady,
    setIsPlaying,
    isPlaying,
    setIsShuffleOn,
    isShuffleOn
  ).map(({ onClick, icon, className }, index) => (
    <button
      key={index}
      onClick={onClick}
      disabled={
        // 한곡일 때 disabled 안해주면 잠긴거 해제가 안됨.
        //  => 빠른 곡 변경으로 인한 오류를 막기위해 해당 버튼들 누르면 비활성화 했다가 isPlayerReady true일때 해제되는데 1곡이면 이미 ready상태라 onReady의 콜백이 없음.
        (index === 0 && realPlaylist.length === 1) ||
        (index === 3 && realPlaylist.length === 1) ||
        (index === 4 && realPlaylist.length === 1) ||
        !isPlayerReady
      }
    >
      <FontAwesomeIcon
        icon={icon}
        className={className}
        spin={icon === faSpinner} // 로딩 회전
      />
    </button>
  ));

  // reactPlayer
  const reactPlayer = (
    <ReactPlayer
      url={realPlaylist[currentVideoIndex]?.url}
      ref={playerRef}
      playing={!(isPlaying === 0)}
      loop={realPlaylist.length === 1} // 한곡이면 반복
      controls={false} // 유튜브 컨트롤 기능 on/off
      // volume={volume}
      width={"100%"}
      height={"100%"}
      onPlay={() => setIsPlaying(1)}
      onPause={() => setIsPlaying(0)}
      onReady={() => {
        setIsPlayerReady(true); // 버튼 잠금 해제
        setSongTitle(realPlaylist[currentVideoIndex]?.title); // 제목 변경
        setSongArtist(realPlaylist[currentVideoIndex]?.artist); // 아티스트 변경
      }}
      onEnded={() => {
        playerUtils.changeVideoIndex(1); // 다음곡 재생
        setIsPlayerReady(false); // 버튼 잠금
      }}
      onBuffer={() => setIsPlaying(3)} // 로딩 중일 때 플레이 버튼 변경
      onProgress={({ played }) => setPlayed(played)} // 곡 재생 시간
      onDuration={(e) => setDuration(Utils.formatTime(e))} // 곡 총 시간
    />
  );

  // player bar
  const playerBar = (
    <input
      type="range"
      min="0"
      max="0.999999"
      step="any"
      value={played}
      onChange={(e) => {
        setPlayed(parseFloat(e.target.value));
        if (playerRef.current)
          playerRef.current.seekTo(parseFloat(e.target.value));
      }}
      className="play-bar-range"
    />
  );

  console.log("selectedPlaylist", seletedPlaylist);
  console.log("songs", playlist);

  // 본문
  return (
    <div className="m-background">
      <div className="mobile-music">
        <div className="top">
          <div className="playing-list">{playingListIcon}</div>
          <div className="cm-music">{cmMusic}</div>
          <div className="volume">{volumeBar}</div>
        </div>
        <div className="body">
          <div className="m-show-box">
            {showPlaylist && playlistHTML}
            {showPlayingList && playingListHTML}
            <div
              className="m-song-info"
              style={
                showPlaylist || showPlayingList
                  ? { height: "0%" }
                  : { height: "100%" }
              }
            >
              <div className="m-player">{reactPlayer}</div>
              <div className="m-song-info-space"></div>
              <div
                className="m-title"
                style={
                  showPlaylist || showPlayingList ? { display: "none" } : {}
                }
              >
                {songTitle || "CM Music을 눌러 플레이리스트를 선택해주세요"}
              </div>
              <div
                className="m-artist"
                style={
                  showPlaylist || showPlayingList ? { display: "none" } : {}
                }
              >
                {songArtist}
              </div>
            </div>
          </div>
          <div className="controls">
            <div className="play-bar">
              <div className="time-start">{Utils.formatTime(played * 100)}</div>
              {playerBar}
              <div className="time-end">{duration}</div>
            </div>
            <div className="btns">{playerControlBtn}</div>
          </div>
        </div>
        <div className="footer">
          <div className="info">모바일의 경우 뮤직플레이어만 지원합니다.</div>
        </div>
      </div>
    </div>
  );
};

export default MobileMusic;