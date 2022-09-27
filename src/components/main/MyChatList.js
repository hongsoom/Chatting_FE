import React from "react";
import styled from "styled-components";
import OnChatList from "../chat/OnChatList";
import BanChatList from "../chat/BanChatList";

const MyChatList = ({
  myInfo,
  chatList,
  reqOut,
  accOut,
  roomId,
  banmodal,
  state,
  setState,
  notifications,
}) => {
  return (
    <MyChatListWrap>
      {banmodal ? (
        <BanChatList state={state} setState={setState} />
      ) : (
        <OnChatList
          chatList={chatList}
          myInfo={myInfo}
          reqOut={reqOut}
          accOut={accOut}
          roomId={roomId}
          notifications={notifications}
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
  overflow: hidden;
`;

export default MyChatList;
