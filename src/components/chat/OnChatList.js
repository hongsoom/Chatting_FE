import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { Text } from "../../elements";

const OnChatList = ({ myInfo, chatList, reqOut, accOut, roomId }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { id } = useParams();

  return (
    <OnChatListWrap>
      {chatList && chatList.length === 0 ? (
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
      ) : (
        <>
          {chatList &&
            chatList.map((list) => {
              return (
                <div>
                  {list.isBanned === false && (
                    <OnChatListContainer
                      key={roomId}
                      onClick={() => {
                        list.requesterId === Number(myInfo && myInfo.id)
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

                        navigator(`/chat/${list.roomId}`);
                      }}
                    >
                      <ChatUser key={list.roomId}>
                        <Text B1 style={{ margin: "13px 10px 5px 10px" }}>
                          {list.requesterId === Number(myInfo && myInfo.id)
                            ? list.yourNickname
                            : list.myNickname}
                        </Text>
                        <Text B2 style={{ margin: "5px 10px" }}>
                          {list.message}
                        </Text>
                      </ChatUser>
                      {list.unreadCnt === 0 || list.roomId === id ? null : (
                        <ChatCount key={list.unreadCnt}>
                          <Text
                            B2
                            color="#fff"
                            fontWeight="700"
                            style={{ margin: "5px 8x", padding: "5px" }}
                          >
                            {list.unreadCnt}
                          </Text>
                        </ChatCount>
                      )}
                    </OnChatListContainer>
                  )}
                </div>
              );
            })}
        </>
      )}
    </OnChatListWrap>
  );
};

const OnChatListWrap = styled.div`
  max-height: 800px;
  max-width: 500px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OnChatListContainer = styled.div`
  max-height: 100px;
  height: 100%;
  width: 100%;
  padding: 0 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  width: 250px;
`;

const ChatCount = styled.div`
  display: flex;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffb6c1;
`;

export default OnChatList;
