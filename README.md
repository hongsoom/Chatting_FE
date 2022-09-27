## 🤝 프로젝트 소개
`'속닥속닥와글와글?'`은 랜덤 유저 채팅으로, 유저들끼리 랜덤으로 만나서 채팅하며 일상에서 탈출하여 스트레스를 풀기위한 서비스입니다.<br/>

➡ ['속닥속닥와글와글 바로가기](http://mychatting.s3-website.ap-northeast-2.amazonaws.com/)  
<br/>

## ✨ 프로젝트 개요

✔ 개발 인원 : 2명 (프론트 1, 백엔드 1)
<br/>
✔ 프로젝트 기간 : 2022.08.29 ~ 2022.09.28 (5주)

### 1주차

- 랜덤 유저 채팅 기획 확정
- API 및 와이어프레임 설계
- 로그인, 회원가입 기능 구현 

### 2주차

- 로그인, 회원가입 기능 구현 
- 마이페이지 기능 구현 완료

### 3주차

- 채팅 기능 구현 완료
- 유저 
- Github Action을 통한 CI/CD 구현

### 4주차

- SSE를 이용한 채팅 알림 기능 구현

### 5주차

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

## 📖 서비스 아키텍쳐
![](https://velog.velcdn.com/images/hongsoom/post/92befbec-cc10-48c3-ba34-fb6411a312c2/image.png)


## 🎥사이트 데모

<summary>데모영상</summary>
  
|회원가입|로그인|마이페이지| 
|:---:|:---:|:---:| 
|<img src="https://velog.velcdn.com/images/hongsoom/post/cbb7a088-439f-472d-b1d1-7b4f4fccff0c/image.gif" />|<img src="https://velog.velcdn.com/images/hongsoom/post/6fb8813a-a5f8-4ddc-88d5-2d40ab79898b/image.gif"/>|<img src="https://velog.velcdn.com/images/hongsoom/post/96baf7ad-1a81-41e4-ad4f-363b8bce81b4/image.gif" />|
|메인페이지|상세페이지|
|<img src="https://velog.velcdn.com/images/hongsoom/post/4cd61f5b-b3bf-4c87-8b68-88c7aac36432/image.gif" />|<img src="https://velog.velcdn.com/images/hongsoom/post/cbbefcaf-8a21-4417-b47a-d776e97c74bd/image.gif" />|
|게시글작성|게시글 수정,삭제|댓글|
|<img src="https://velog.velcdn.com/images/hongsoom/post/152c55c0-7e27-4ce1-9e75-16ddb5cc1632/image.gif" />|<img src="https://velog.velcdn.com/images/hongsoom/post/b41390f1-fb4e-4e96-968e-6151c7fd879a/image.gif" />|<img src="https://velog.velcdn.com/images/hongsoom/post/fbce1f69-1a65-4b90-b601-9721f6ed32e2/image.gif" />|
|검색|필터|좋아요,북마크,공유|
|<img src="https://velog.velcdn.com/images/hongsoom/post/23f9c1aa-d549-4f89-b2f8-64b54d533ef4/image.gif" />|<img src="https://velog.velcdn.com/images/hongsoom/post/3a73dcaa-260a-480e-b851-f5f5b4779573/image.gif" />|<img src="https://velog.velcdn.com/images/hongsoom/post/d7343e7e-837e-4490-9b46-a3a812acf8f2/image.gif" />|

<br />
