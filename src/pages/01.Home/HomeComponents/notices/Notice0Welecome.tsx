import { Link } from "react-router-dom";

const Notice0Welecome = () => {
  return (
    <>
      <span>안녕하세요.</span>
      <span>CMWORLD의 춘몽입니다.</span>
      <br />
      <span>
        해당 사이트는 CYWORLD를 모티브로 하여 제작한 포트폴리오 사이트입니다.
      </span>
      <br />
      <span>
        위치정보를 이용하여 화면 오른쪽에 보이는 날씨 탭의 정보를 위치에 맞게
        업데이트하고, 배경을 날씨에 맞게 변경하고 있으며, 한국이 아닌 지역에
        대한 접근을 차단하고 있으므로 위치정보를 허용해주세요.
      </span>
      <br />
      <span>
        둘러보시기 전에 <Link to="/jukbox">쥬크박스</Link>에 방문하여 배경노래를
        먼저 세팅해보세요.
      </span>
      <br />
      <span>서로를 알아가는 좋은 시간이 되셨으면 좋겠습니다.</span>
      <br />
      <span>
        현재 페이지는 일반적인 27인치 4K 모니터 사이즈 기준으로 제작되어있으며,
        맥북 14인치 기준(1512px)와 아이패드 11인치 기준(1366px)를 지원합니다.
      </span>
    </>
  );
};

export default Notice0Welecome;
