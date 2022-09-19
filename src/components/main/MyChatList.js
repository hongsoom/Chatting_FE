import React, { useState } from "react";
import styled from "styled-components";
import OnChatList from "../chat/OnChatList";
import BanChatList from "../chat/BanChatList";
import { Text } from "../../elements";

const MyChatList = ({ myInfo, chatList, reqOut, accOut, roomId }) => {
  const [banmodal, setBanModal] = useState(false);

  const BanModalOpen = () => {
    setBanModal(!banmodal);
  };

  return (
    <MyChatListWrap>
      <MyChatTitle>
        <Text
          S1
          style={{
            width: "250px",
            height: "80px",
            padding: "25px",
            borderBottom: banmodal === false && "5px solid rgb(175, 176, 179)",
          }}
          onClick={BanModalOpen}
        >
          채팅목록
        </Text>
        <Text
          S1
          style={{
            width: "250px",
            height: "80px",
            padding: "25px",
            borderBottom: banmodal === true && "5px solid rgb(175, 176, 179)",
          }}
          onClick={BanModalOpen}
        >
          차단목록
        </Text>
      </MyChatTitle>
      {banmodal ? (
        <BanChatList />
      ) : (
        <OnChatList
          chatList={chatList}
          myInfo={myInfo}
          reqOut={reqOut}
          accOut={accOut}
          roomId={roomId}
        />
      )}
    </MyChatListWrap>
  );
};

const MyChatListWrap = styled.div`
  max-height: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MyChatTitle = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
`;

export default MyChatList;
