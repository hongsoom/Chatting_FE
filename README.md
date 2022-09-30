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
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img alt="HTML5" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/>
<img alt="CSS3" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/>
</div>
<div display=flex>
<img alt="Redux" src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-badge&logo=Redux&logoColor=black"/>
<img alt="Axios" src ="https://img.shields.io/badge/Axios-6F02B5.svg?&style=for-the-badge&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Styled Components-F893D1?style=for-the-badge&logo=styledComponents&logoColor=white">
<img src="https://img.shields.io/badge/StompJS-008000?style=for-the-badge&logo=stompjs&logoColor=white">
<img src="https://img.shields.io/badge/SockJS-008000?style=for-the-badge&logo=sockjs&logoColor=white">
</div>
<div display=flex>
<img src="https://img.shields.io/badge/Github-000000?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Github%20Actions-000000?style=for-the-badge&logo=github-actions&logoColor=white">
</div>
<br/>

| Name | Appliance | Version |
| --- | --- | --- |
| React | 리액트 | 18.2.0 |
| Axios | HTTP 클라이언트 라이브러리 | 0.27.2 |
| browser-image-compression | 이미지 압축 라이브러리 | 2.0.0 |
| dotenv | 환경변수 라이브러리 | 16.0.2 |
| Immer | 불변성 유지 | 9.0.15 |
| moment | 날짜, 시간 출력 |2.29.4|
| React-dom | 브라우저 렌더링 | 18.2.0 |
| React-icons | 아이콘 | 4.4.0 |
| React-redux | 상태관리 | 8.0.2 |
| React-router-dom | 라우터 | 6.3.0 |
| Redux | 상태 관리 | 4.2.0 |
| Redux-actions | 액션 관리 | 2.6.5 |
| Redux-thunk | 리덕스 미들웨어 |2.4.1 |
| sockjs-client | 채팅 |4.4.1|
| stompjs | 채팅 |4.4.1|
| Styled-components | CSS in JS | 5.3.5 |
| sweetalert | Alert창 | 2.1.2 |


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


## 🎥사이트 데모

<summary>데모영상</summary>
  
|회원가입|로그인|마이페이지| 
|:---:|:---:|:---:| 
|<img src="https://velog.velcdn.com/images/hongsoom/post/c21c84a6-0f07-4ba5-8701-461848a3e685/image.gif" />|<img src="https://velog.velcdn.com/images/hongsoom/post/918a6ddc-9cd1-43d4-bad1-8564d2313907/image.gif"/>|<img src="https://velog.velcdn.com/images/hongsoom/post/07abbf0e-842d-4877-8a1b-cd5110b83366/image.gif" />|
|채팅|알림|차단|
|<img src="https://velog.velcdn.com/images/hongsoom/post/c1716bd5-636e-49ca-ac56-b20deffc93b7/image.gif" />|<img src="https://velog.velcdn.com/images/hongsoom/post/b85d2806-7ab3-4d6b-8c54-7de00a36435d/image.gif" />|<img src="https://velog.velcdn.com/images/hongsoom/post/26867e42-8495-4b9b-a2b3-009ac3f9eb1a/image.gif" />|


<br />
