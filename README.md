## 🤝 프로젝트 소개

`'속닥속닥와글와글?'`은 랜덤 유저 채팅으로, 유저들끼리 랜덤으로 만나서 채팅하며 일상에서 탈출하여 스트레스를 풀기위한 서비스입니다.<br/>

➡ ['속닥속닥와글와글 바로가기](http://mychatting.s3-website.ap-northeast-2.amazonaws.com/)  
<br/>

## ✨ 프로젝트 개요

✔ 개발 인원 : 2명 (프론트 1, 백엔드 1)
<br/>
✔ 프로젝트 기간 : 2022.08.29 ~ 2022.09.26 (4주)

### 1주차

- 랜덤 유저 채팅 기획 확정
- API 및 와이어프레임 설계
- 로그인, 회원가입 기능 구현

### 2주차

- 로그인, 회원가입 기능 구현
- 마이페이지 기능 구현 완료

### 3주차

- 채팅 기능 구현 완료
- 유저 차단 기능 구현 완료
- Github Action을 통한 CI/CD 구현

### 4주차

- SSE를 이용한 채팅 알림 기능 구현
- 유저 테스트 피드백 반영
- 테스트 및 버그 수정

<br/>

## 🔧 주요 기능

### ✅ 1:1 채팅 (webSocket)

- 유저 간 1:1 채팅방 생성

### ✅ 채팅 알림 (SSE)

- 사용자에게 채팅이 발송된 경우 알림 표시 기능

### ✅ 마이페이지 내 정보 수정 기능

- 마이페이지에서 내 정보(닉네임, 자기소개) 변경 기능

### ✅ 유저 차단 기능

- 유저 차단 및 차단 해제 기능

<br/>

## 🕹 기술 스택

<div display=flex>
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=black"/>
<img alt="javascript" src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img alt="react-hook-form" src ="https://img.shields.io/badge/react hook form-EC5990.svg?&style=for-the-badge&logo=react hook form&logoColor=black"/>
</div>

<br />

<div display=flex>
<img alt="Redux" src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-badge&logo=Redux&logoColor=black"/>
<img alt="Axios" src ="https://img.shields.io/badge/Axios-6F02B5.svg?&style=for-the-badge&logo=Axios&logoColor=white"/>
<img alt="styledComponents" src="https://img.shields.io/badge/Styled Components-F893D1?style=for-the-badge&logo=styledComponents&logoColor=white">
</div>

<br />

<div display=flex>
<img src="https://img.shields.io/badge/StompJS-008000?style=for-the-badge&logo=stompjs&logoColor=white">
<img src="https://img.shields.io/badge/SockJS-008000?style=for-the-badge&logo=sockjs&logoColor=white">
</div>

<br />

<div display=flex>
<img src="https://img.shields.io/badge/Github-000000?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Github%20Actions-000000?style=for-the-badge&logo=github-actions&logoColor=white">
</div>

<br/>

| Name                      | Appliance                  | Version |
| ------------------------- | -------------------------- | ------- |
| react                     | 리액트                     | 18.2.0  |
| axios                     | HTTP 클라이언트 라이브러리 | 0.27.2  |
| browser-image-compression | 이미지 압축 라이브러리     | 2.0.0   |
| dotenv                    | 환경변수 라이브러리        | 16.0.2  |
| immer                     | 불변성 유지                | 9.0.15  |
| dayjs                     | 날짜, 시간 출력            | 1.11.7  |
| react-dom                 | 브라우저 렌더링            | 18.2.0  |
| react-hook-form           | 입력상태관리 라이브러리    | 18.2.0  |
| react-icons               | 아이콘                     | 4.4.0   |
| react-redux               | 상태관리                   | 8.0.2   |
| react-router-dom          | 라우터                     | 6.3.0   |
| redux                     | 상태 관리                  | 4.2.0   |
| redux-actions             | 액션 관리                  | 2.6.5   |
| redux-thunk               | 리덕스 미들웨어            | 2.4.1   |
| sockjs-client             | 채팅                       | 4.4.1   |
| stompjs                   | 채팅                       | 4.4.1   |
| styled-components         | CSS in JS                  | 5.3.5   |

## ⚓️ Links

**Project homepage** : http://mychatting.s3-website.ap-northeast-2.amazonaws.com/

**백엔드 깃허브 주소** : https://github.com/lky8967/chatting

<br/>

## 🔥 트러블 슈팅

<details>
<summary><strong>Websocket 메세지 보낼때 발생하는 오류</strong></summary>
  <br/>
  <ul>
<li><strong>문제상황</strong>
<p>- 
InvalidStateError: The connection has not been established yet<br/>
메세지를 보내는 trigger 를 발생시킬때마다 위와같은 오류가 나왔다. 
<li><strong>원인</strong>
<p>- 아직 웹소켓이 준비가 되지않았는데, 계속 trigger 를 시키니깐 오류가 난것.
<li><strong>해결방안</strong>
<p>-Stomp.Client 안에는 ws.readyState 라는 integer 값이 있으며, 연결되었을 경우에(준비가된 경우) 1을 반환한다고 한다. 그 사실을 이용해서 새로운 함수를 만들어줬다
<pre>
<code>
// 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (stompClient, callback) => {
    setTimeout(function () {
     // 연결되었을 때 콜백함수 실행
      if (stompClient.ws.readyState === 1) {
        callback();
        // 연결이 안 되었으면 재호출
      } else {
        waitForConnection(stompClient, callback);
      }
    }, 0.1); // 밀리초 간격으로 실행
  };
</code>
</pre>
<p>- send 만 있던 함수를 새롭게 정의한 waitForConnection 함수로 감싸줬다.
<pre>
<code>
 const SendMessage = () => {
    if (!message) return;

    const _reg =
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    if (_reg.test(message)) {
      swal({
        title: "이모티콘은 사용할 수 없습니다 😢",
        icon: "error",
        closeOnClickOutside: false,
      }).then(function () {
        setMessage("");
      });
      return;
    }

    const data = {
      accType: "TALK",
      reqType: "TALK",
      roomId: roomId,
      senderId: myInfo && myInfo.id,
      nickname: myInfo && myInfo.nickname,
      acceptorId: acceptorId,
      message: message,
      isRead: false,
    };

    waitForConnection(stompClient.current, () => {
      stompClient.current.debug = null;
      stompClient.current.send(
        "/pub/api/chat/message",
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        JSON.stringify(data)
      );
      setMessageState(true);
    });
    setMessage("");

};
</code>

</pre>
<li><strong>결과</strong>
<p>- 몇번이고 메세지를 보내도 아까와 같은 오류가 뜨지 않는것을 확인했다.
  </ul>
</details>

  <details>
    <summary><strong> 채팅 알림 기능 </strong></summary>
        <br/>
      <ul>
<li><strong>문제상황</strong>
<p>- 최초에 webSocket을 이용하여 알림 기능 구현을 시도하였으나, webSocket이 양방향 통신인 것에 비해 채팅 알림은 서버에서 클라이언트로의 단방향 통신만을 요구하였기 때문에, 이에 서버 리소스 낭비를 우려하여 백엔드 팀원과 새로운 통신 방법을 모색했다.
      <li><strong>해결방안</strong>
<p>- webSocket 이외의 통신 방법을 찾아본 결과, 서버에서 클라이언트로의 단방향 통신만을 지원하는 SSE를 알림에 사용하는 것이 적합하다고 판단했다.
<pre>
<code>
  useEffect(() => {
    if (myId) {
      eventSource.current = new EventSource(
        `${process.env.REACT_APP_API_URL}/api/subscribe/${myId}`
      );

      eventSource.current.onmessage = (message) => {
        if (!message.data.includes("EventStream Created")) {
          dispatch(userAction.chatListDB());
        }
      };
    }
    return () => {
      if (eventSource.current) {
        eventSource.current.close();
        eventSource.current = null;
      }
    };

}, [myId, dispatch, notifications]);
</code>

</pre>
     <li><strong>결과</strong>
<p>- webSocket과 달리 SSE는 별도의 프로토콜을 사용하지 않고 HTTP를 이용하기 때문에 webSocket을 사용할 때 보다 리소스 낭비를 감소시킬 수 있을 것으로 기대된다.
 
   </details>
   
  <details>
    <summary><strong>용량이 큰 이미지 업로드 시 브라우저 성능이 저하되는 문제</strong></summary>
        <br/>
        <ul>
<li><strong>문제상황</strong>
<p>- 게시물 작성하기 단계에서 용량이 큰(10MB 이상) 이미지를 업로드하는 경우, 클라이언트 측에서 브라우저 성능이 저하되는 문제가 발생했다.
 <li><strong>원인</strong>
<p>- 대용량 이미지가 업로드되어도, 압축을 진행하지 않고 그대로 사용하고 있기 때문에 리렌더링이 발생하면 성능 저하가 발생했다.
 <li><strong>해결 방안</strong>
<p>- browser-image-compression을 사용하여 이미지를 2MB 이하로 압축시키는 방법으로 해결했다.
<pre>
<code>
  const loadProfilImg = async (e) => {
    const file = e.target.files[0];

    const options = {
      maxSizeMb: 1,
      maxWidthOrHeight: 400,
    };
    try {
      const compressedImage = await imageCompression(file, options);
      const resultFile = new File([compressedImage], compressedImage.name, {
        type: compressedImage.type,
      });

      const Url = URL.createObjectURL(compressedImage);

      setUserImgUrl(resultFile);
      setPreviewUrl(Url);
    } catch (error) {}

};
</code>

</pre>
  </details>

<br/>

## 📖 서비스 아키텍쳐

![](https://velog.velcdn.com/images/hongsoom/post/96ee6cae-330d-4ca9-9149-18fb943f02bd/image.PNG)

## 👀 스크린 샷

|                                                  회원가입                                                  |                                                  로그인                                                   |                                                 마이페이지                                                 |                                              마이페이지 수정                                               |
| :--------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| <img src="https://velog.velcdn.com/images/hongsoom/post/1368a89d-2ea7-4818-9f85-d1effa8662f0/image.png" /> | <img src="https://velog.velcdn.com/images/hongsoom/post/ae5bcd97-487e-4841-88ee-16ff3cf0a83c/image.png"/> | <img src="https://velog.velcdn.com/images/hongsoom/post/1851330e-f340-4cd7-b355-a4c7a2ca8af3/image.png" /> | <img src="https://velog.velcdn.com/images/hongsoom/post/f390180d-a530-4b74-8538-4c1ac87cbd9e/image.png" /> |

|                                                  랜덤채팅                                                  |                                                  채팅목록                                                  |                                                  차단목록                                                  |
| :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| <img src="https://velog.velcdn.com/images/hongsoom/post/1b9b3352-1306-420c-9a2c-e17546bc2076/image.png" /> | <img src="https://velog.velcdn.com/images/hongsoom/post/27dc8e7d-8d4a-4d72-8c58-9b56ae3ba541/image.png" /> | <img src="https://velog.velcdn.com/images/hongsoom/post/f03edb3d-9162-409a-a633-c253fe34faa2/image.png" /> |

|                                                   채팅방                                                   |                                                    알림                                                    |
| :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| <img src="https://velog.velcdn.com/images/hongsoom/post/0740cd10-43ab-4bd8-b850-0c67095b8104/image.png" /> | <img src="https://velog.velcdn.com/images/hongsoom/post/b69ec708-8165-4a9e-80ad-361c7e2353f7/image.png" /> |
