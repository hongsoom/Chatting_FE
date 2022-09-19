import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { Text } from "../../elements";

const OnChatList = ({ myInfo, chatList, reqOut, accOut, roomId }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  console.log(chatList);

  return (
    <OnChatListWrap>
      {chatList &&
        chatList.map((list, index) => {
          return (
            <>
              {list.isBanned === false && (
                <OnChatListContainer
                  onClick={() => {
                    roomId
                      ? navigator(`/chat/${list.roomId}`)
                      : list.requesterId === Number(myInfo && myInfo.id)
                      ? dispatch(
                          userAction.addRoomDB(
                            list.requesterId,
                            list.acceptorId,
                            reqOut,
                            accOut
                          )
                        )
                      : dispatch(
                          userAction.addRoomDB(
                            list.acceptorId,
                            list.requesterId,
                            reqOut,
                            accOut
                          )
                        );
                  }}
                  key={index}
                >
                  <ChatUser>
                    <Text B1 style={{ margin: "13px 10px 5px 10px" }}>
                      {list.requesterId === Number(myInfo && myInfo.id)
                        ? list.yourNickname
                        : list.myNickname}
                    </Text>
                    <Text B2 style={{ margin: "5px 10px" }}>
                      {list.message}
                    </Text>
                  </ChatUser>
                </OnChatListContainer>
              )}
            </>
          );
        })}
    </OnChatListWrap>
  );
};

const OnChatListWrap = styled.div`
  max-height: 800px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OnChatListContainer = styled.div`
  max-height: 100px;
  height: 100%;
  padding: 0 18px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(175, 176, 179);
  cursor: pointer;
  @media screen and (max-width: 768px) {
    max-height: 90px;
  }
`;

const ChatUser = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
`;

export default OnChatList;
