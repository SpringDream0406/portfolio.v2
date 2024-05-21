const Notice2Guestbook = () => {
  return (
    <>
      <span>안녕하세요. 춘몽입니다.</span>
      <br />
      <span>
        현재 춘몽월드는 뮤직플레이와 관계된 정보는 localStorage에 저장하고
        있으며, 방명록과 관련된 내용은 데이터베이스에 저장하고 있습니다.
      </span>
      <br />
      <span>
        데이터베이스는 Google에서 운영하는 firebase라는 서비스를 이용하고
        있으며, firebase에서 지원하는 인증 방식을 통해 사용자를 인증하고
        있습니다.
      </span>
      <span>
        여러 이유로 firebase를 선택했지만, 차후 문제가 생길 경우 변경될 수도
        있습니다.
      </span>
      <br />
      <span>
        그리고 제가 얻는 데이터는 인증할 때 사용하신 수단(GitHub or Google)과
        수단에 등록되어있는 E-Mail주소, firebase에서 인증 후 랜덤하게 생성된
        유저ID인 UID, 인증 후 입력해주시는 이름, 그리고 방명록에 적어주시는
        데이터뿐입니다.
      </span>
      <br />
      <span>
        정리하자면 제가 얻게 되는 개인적인 정보는 E-Mail주소와 입력해주신 이름,
        그리고 방명록에 적어주시게 될 정보들뿐입니다.
      </span>
      <span>
        때문에 춘몽월드를 이용하시는 데 있어 데이터와 관련하여 안심하시고
        이용하시라고 알려 드리고 싶었습니다.
      </span>
      <br />
      <br />
      <span>
        추가로 현재 인증 방법인 Github와 Google의 E-Mail이 겹치면 Google로
        통합됩니다.
      </span>
      <span>
        이 때문에 똑같은 E-Mail로 Github와 Google의 인증 두 가지를 사용하시게
        되면 Github의 인증이 막히게 되니, 이점 참고하시어 이용하시는 데 불편함이
        없으시길 바랍니다.
      </span>
    </>
  );
};

export default Notice2Guestbook;
