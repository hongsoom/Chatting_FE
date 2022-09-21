import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userAction } from "../../redux/modules/chat";
import styled from "styled-components";
import { IoClose, IoReorderFourSharp } from "react-icons/io5";

const ChatUser = ({ socketDisconnect, roomId, myInfo }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { id } = useParams();

  const [isShowOptions, setShowOptions] = useState(false);

  const chatList = useSelector((state) => state.chat.chatList);
  console.log("chatList", chatList);

  const ExitModal = () => {
    socketDisconnect();
    navigator("/chat");
  };

  const ExitRoom = () => {
    dispatch(userAction.exitRoomDB(roomId));
    ExitModal();
  };

  return (
    <ChatUserWrap>
      <IoClose
        className="exitmodal"
        size="40"
        color="#000"
        onClick={ExitModal}
      />
      <IoReorderFourSharp
        className="openmenu"
        size="40"
        color="#000"
        onClick={() => setShowOptions((prev) => !prev)}
      />
      <SelectOptions show={isShowOptions}>
        <Option>
          {chatList &&
            chatList.map((list, index) => {
              return (
                <>
                  {list.roomId === Number(id) && (
                    <label
                      key={index}
                      onClick={() => {
                        list.requesterId === Number(myInfo && myInfo.id)
                          ? dispatch(userAction.banUserDB(list.acceptorId))
                          : dispatch(userAction.banUserDB(list.requesterId));
                        ExitModal();
                      }}
                    >
                      사용자 차단하기
                    </label>
                  )}
                </>
              );
            })}
        </Option>
        <Option>
          <label onClick={ExitRoom}>채팅방 나가기</label>
        </Option>
        <Option>
          <label onClick={ExitModal}>채팅방 닫기</label>
        </Option>
      </SelectOptions>
    </ChatUserWrap>
  );
};

const ChatUserWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  .exitmodal {
    margin: 10px 5px;
    cursor: pointer;
  }
  .openmenu {
    position: relative;
    margin: 10px 5px;
    cursor: pointer;
  }
`;

const SelectOptions = styled.ul`
  position: absolute;
  top: 150px;
  width: 150px;
  overflow: hidden;
  display: ${(props) => (props.show ? "0" : "none")};
  padding: 5px;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
  cursor: pointer;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  &:hover {
    background-color: #595959;
  }
`;

export default ChatUser;
