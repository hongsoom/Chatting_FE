import React from "react";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { Text } from "../../elements";

const OnChatList = ({ myInfo, chatList, reqOut, accOut }) => {
  const dispatch = useDispatch();

  return (
    <OnChatListWrap>
      {chatList &&
        chatList.map((list, index) => {
          return (
            <OnChatListContainer
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
              }}
              key={index}
            >
              <Text S3 size="18px" style={{ margin: "15px 10px 5px 10px" }}>
                {list.requesterId === Number(myInfo && myInfo.id)
                  ? list.yourNickname
                  : list.myNickname}
              </Text>
              <Text B2 style={{ margin: "10px" }}>
                {list.message}
              </Text>
            </OnChatListContainer>
          );
        })}
    </OnChatListWrap>
  );
};

const OnChatListWrap = styled.div`
  max-height: 720px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const OnChatListContainer = styled.div`
  max-height: 100px;
  height: 100%;
  padding: 0 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: 1px solid rgb(175, 176, 179);
  cursor: pointer;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default OnChatList;
