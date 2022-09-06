import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/modules/user";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import { Text, Button, Input } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.jpg";
import camera from "../../assets/camera.png";

const EditMypage = ({ myInfo, editOpen }) => {
  const dispatch = useDispatch();

  const [userImgUrl, setUserImgUrl] = useState(
    myInfo && myInfo.userImgUrl ? myInfo && myInfo.userImgUrl : ""
  );
  const [previewUrl, setPreviewUrl] = useState(null);
  const [introduction, setintroduction] = useState(
    myInfo && myInfo.introduction ? myInfo && myInfo.introduction : ""
  );
  const [nickname, setNickname] = useState(
    myInfo && myInfo.nickname ? myInfo && myInfo.nickname : ""
  );

  const [nickNameMessage, setNicknameMessage] = useState();
  const [nicknameState, setNicknameState] = useState(false);

  const [isShowOptions, setShowOptions] = useState(false);

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

  const nicknameCondition = () => {
    let _reg = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$/;

    if (!_reg.test(nickname)) {
      setNicknameMessage(
        "닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다."
      );
      return;
    }

    if (!nickname) {
      setNicknameMessage(
        "닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다."
      );
      return;
    }

    if (nickname.length < 2 || nickname.length > 8) {
      setNicknameMessage("닉네임은 2자리 이상, 8자리 미만입니다.");
      return;
    }

    setNicknameState(true);
    dispatch(userActions.nicknameCheckDB(nickname));
  };

  const formData = new FormData();
  formData.append("nickname", nickname);
  formData.append("userImgUrl", userImgUrl);
  formData.append("introduction", introduction);

  const onEditSave = () => {
    dispatch(userActions.editInfoDB(formData));
  };

  return (
    <EditMypageWrap>
      <UserProfile>
        <UserProfileEdit>
          {previewUrl ? (
            <img src={previewUrl} alt="프로필 이미지" />
          ) : (
            <>
              {myInfo && myInfo.userImgUrl ? (
                <img src={myInfo && myInfo.userImgUrl} alt="userImg" />
              ) : (
                <img src={defaultProfile} alt="defaultProfile" />
              )}
            </>
          )}
        </UserProfileEdit>
        <UserProfileSelect>
          <img
            src={camera}
            alt="camera"
            onClick={() => setShowOptions((prev) => !prev)}
          />
          <SelectOptions>
            <Option>1학년</Option>
            <Option>2학년</Option>
          </SelectOptions>
        </UserProfileSelect>
        <Input
          type="file"
          id="EditProfile"
          name="EditProfile"
          accept="image/*"
          onChange={(e) => {
            loadProfilImg(e);
          }}
          style={{ display: "none" }}
        />
      </UserProfile>
      <UserNick>
        <UserNickEdit>
          <Text S3 size="17px" style={{ marginRight: "20px" }}>
            닉네임
          </Text>
          <Input
            id="nickname"
            placeholder="닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다."
            size="14px"
            padding="5px 5px 0 5px"
            margin="3px 0 0 0"
            defaultValue={myInfo && myInfo.nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            style={{ borderBottom: "1px solid #DBDBDB", color: "#000" }}
          />
        </UserNickEdit>
        <ErrorMessage>
          <Text B3 color="red">
            {nickNameMessage}
          </Text>
        </ErrorMessage>
      </UserNick>
      <UserInfo>
        <Text S3 size="17px" style={{ marginRight: "20px" }}>
          소개
        </Text>
        <Input
          id="introduction"
          placeholder="소개는 150자까지 가능합니다."
          size="14px"
          padding="5px 5px 0 5px"
          margin="3px 0 0 0"
          maxlength="150"
          defaultValue={myInfo && myInfo.introduction}
          onChange={(e) => {
            setintroduction(e.target.value);
          }}
          style={{ borderBottom: "1px solid #DBDBDB", color: "#000" }}
        />
      </UserInfo>
      <UserBtn>
        <Button
          L
          width="200px"
          height="50px"
          margin="0 20px 0 0"
          onClick={editOpen}
        >
          취소
        </Button>
        <Button L width="200px" height="50px" onClick={onEditSave}>
          수정
        </Button>
      </UserBtn>
    </EditMypageWrap>
  );
};

const EditMypageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 300px;
  width: 100%;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const UserProfileEdit = styled.div`
  & > img {
    width: 200px;
    border-radius: 50%;
  }
`;

const UserProfileSelect = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #b8b8b8;
  background-color: white;
  right: 5px;
  bottom: 10px;
  cursor: pointer;
  & > img {
    width: 30px;
  }
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 18px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 90px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
`;
const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

const UserNick = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  margin-top: 30px;
`;

const UserNickEdit = styled.div`
  display: flex;
`;

const ErrorMessage = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  margin-top: 10px;
`;

const UserBtn = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  margin-top: 30px;
`;

export default EditMypage;
