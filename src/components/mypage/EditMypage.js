import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions, cleanStatus } from "../../redux/modules/user";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import { Text, Button, Input } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.jpg";
import camera from "../../assets/camera.png";

const EditMypage = ({ myInfo, editOpen, setInfo }) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);

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

  const [nickNameMessage, setNicknameMessage] = useState("");
  const [nicknameState, setNicknameState] = useState(false);

  const [isShowOptions, setShowOptions] = useState(false);

  const nicknameCondition = (e) => {
    let _reg = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$/;

    if (!_reg.test(e.target.value)) {
      setNicknameState(false);
      setNicknameMessage(
        "닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다."
      );
      return;
    }

    if (!e.target.value) {
      setNicknameState(false);
      setNicknameMessage(
        "닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다."
      );
      return;
    }

    if (e.target.value.length < 2 || e.target.value.length > 8) {
      setNicknameState(false);
      setNicknameMessage("닉네임은 2자리 이상, 8자리 미만입니다.");
      return;
    }
    dispatch(cleanStatus());
    setNickname(e.target.value);
    dispatch(userActions.nicknameCheckDB(nickname));
  };

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

  const formData = new FormData();
  formData.append("nickname", nickname);
  formData.append("userImgUrl", userImgUrl);
  formData.append("introduction", introduction);

  const onEditSave = () => {
    dispatch(userActions.editInfoDB(formData));
  };

  const onDeleteImg = () => {
    setShowOptions((prev) => !prev);
    dispatch(userActions.deleteImgDB());
    setInfo(true);
  };

  useEffect(() => {
    if (status === 200) {
      setNicknameMessage("사용 가능한 닉네임 입니다.");
      setNicknameState(true);
    }

    if (status === 400) {
      setNicknameMessage("이미 사용중인 닉네임 입니다.");
      setNicknameState(false);
    }
  }, [status, nicknameState]);

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
          <SelectOptions show={isShowOptions}>
            <Option onClick={onDeleteImg}>
              <label>기본 이미지로 변경</label>
            </Option>
            <Option>
              <label htmlFor="EditProfile">사진 변경</label>
              <Input
                type="file"
                id="EditProfile"
                name="EditProfile"
                accept="image/*"
                onChange={(e) => {
                  loadProfilImg(e);
                }}
                onClick={() => setShowOptions((prev) => !prev)}
                style={{ display: "none" }}
              />
            </Option>
          </SelectOptions>
        </UserProfileSelect>
      </UserProfile>
      <UserNick>
        <UserNickEdit>
          <Text S3 size="17px" style={{ marginRight: "18px" }}>
            닉네임
          </Text>
          <Input
            id="nickname"
            placeholder="닉네임 (2 ~ 8자, 한글, 영문, 숫자만)"
            size="14px"
            padding="5px 5px 0 5px"
            margin="3px 0 0 0"
            defaultValue={myInfo && myInfo.nickname}
            onChange={(e) => {
              nicknameCondition(e);
            }}
            style={{ borderBottom: "1px solid #DBDBDB", color: "#000" }}
            autocomplete="off"
          />
        </UserNickEdit>
        <ErrorMessage>
          <Text
            B3
            style={{
              color: nicknameState === true ? "	#9ACD32" : "red",
            }}
          >
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
          placeholder="소개 ( 150 자 )"
          size="14px"
          padding="5px 5px 0 5px"
          margin="3px 0 0 0"
          maxlength="150"
          defaultValue={myInfo && myInfo.introduction}
          onChange={(e) => {
            setintroduction(e.target.value);
          }}
          style={{ borderBottom: "1px solid #DBDBDB", color: "#000" }}
          autocomplete="off"
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
  top: 18px;
  left: 0;
  width: 150px;
  overflow: hidden;
  display: ${(props) => (props.show ? "0" : "none")};
  height: 60px;
  padding: 5px;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
`;

const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  &:hover {
    background-color: #595959;
  }
`;

const UserNick = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  width: 100%;
  margin-top: 30px;
`;

const UserNickEdit = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  margin-top: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 350px;
  width: 100%;
  margin-top: 10px;
`;

const UserBtn = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 350px;
  width: 100%;
  margin-top: 30px;
`;

export default EditMypage;
