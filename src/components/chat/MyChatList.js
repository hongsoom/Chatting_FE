import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { Text } from "../../elements";

const MyChatList = ({ myInfo, chatList, reqOut, accOut }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  return (
    <MyChatListWrap>
      {chatList &&
        chatList.map((list, index) => {
          return (
            <MyChatListContainer
              /*  onClick={() => navigator(`/chat/${list.roomId}`)} */
              onClick={() => {
                list.myId === null
                  ? dispatch(
                      userAction.addRoomDB(
                        myInfo.id,
                        list.yourId,
                        reqOut,
                        accOut
                      )
                    )
                  : dispatch(
                      userAction.addRoomDB(
                        list.yourId,
                        list.myId,
                        reqOut,
                        accOut
                      )
                    );
              }}
              key={index}
            >
              <Text S3 size="18px" style={{ margin: "15px 10px 5px 10px" }}>
                {list.yourNickname}
              </Text>
              <Text B2 style={{ margin: "10px" }}>
                {list.message}
              </Text>
            </MyChatListContainer>
          );
        })}
    </MyChatListWrap>
  );
};

const MyChatListWrap = styled.div`
  max-height: 720px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MyChatListContainer = styled.div`
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

export default MyChatList;
