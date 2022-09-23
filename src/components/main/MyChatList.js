import React from "react";
import styled from "styled-components";
import OnChatList from "../chat/OnChatList";
import BanChatList from "../chat/BanChatList";
import { Text } from "../../elements";

const MyChatList = ({
  myInfo,
  chatList,
  reqOut,
  accOut,
  roomId,
  banmodal,
  state,
  setState,
}) => {
  return (
    <MyChatListWrap>
      {banmodal ? (
        <BanChatList state={state} setState={setState} />
      ) : (
        <>
          {chatList && chatList.length !== 0 ? (
            <OnChatList
              chatList={chatList}
              myInfo={myInfo}
              reqOut={reqOut}
              accOut={accOut}
              roomId={roomId}
            />
          ) : (
            <Text
              B2
              style={{
                height: "80px",
                padding: "30px",
                borderBottom: "1px solid rgb(175, 176, 179)",
              }}
            >
              진행 중인 채팅이 없습니다.
            </Text>
          )}
        </>
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
