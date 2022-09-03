import React, { useState } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import { Text, Button, Input } from "../../elements";
import defaultProfile from "../../assets/defaultProfile.png";

const EditMypage = ({ myInfo, editOpen }) => {
  const [userImg, setUserImg] = useState(
    myInfo && myInfo.userImgUrl ? myInfo.userImgUrl : null
  );
  const [previewUrl, setPreviewUrl] = useState(
    myInfo && myInfo.userImgUrl ? myInfo.userImgUrl : null
  );
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

      setUserImg(resultFile);
      const Url = URL.createObjectURL(compressedImage);
      setPreviewUrl(Url);
    } catch (error) {}
  };
  return (
    <EditMypageWrap>
      {myInfo && myInfo.userImgUrl === null ? (
        <img src={defaultProfile} alt="defaultProfile" />
      ) : (
        <img src={myInfo && myInfo.userImgUrl} alt="userprofile" />
      )}
      <Label for="EditProfile">프로필 사진 바꾸기</Label>
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
      <UserName>
        <Text S3 size="17px" style={{ marginRight: "20px" }}>
          닉네임
        </Text>
        <Input
          placeholder="닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다."
          size="14px"
          padding="5px 5px 0 5px"
          margin="3px 0 0 0"
          style={{ borderBottom: "1px solid #DBDBDB", color: "#DBDBDB" }}
        />
      </UserName>
      <UserInfo>
        <Text S3 size="17px" style={{ marginRight: "20px" }}>
          소개
        </Text>
        <Input
          placeholder="소개는 150자까지 가능합니다."
          size="14px"
          padding="5px 5px 0 5px"
          margin="3px 0 0 0"
          style={{ borderBottom: "1px solid #DBDBDB", color: "#DBDBDB" }}
        />
      </UserInfo>
      <UserBtn>
        <Button
          L
          width="200px"
          height="50px"
          margin="0 40px 0 0"
          onClick={editOpen}
        >
          취소
        </Button>
        <Button L width="200px" height="50px" onClick={editOpen}>
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
  max-width: 500px;
  width: 100%;
  & > img {
    width: 200px;
    border-radius: 50%;
  }
`;

const Label = styled.label`
  color: #ffb6c1;
  font-size: 17px;
  font-weight: 600;
  margin-top: 20px;
`;

const UserName = styled.div`
  display: flex;
  flex-direction: row;
  width: 350px;
  margin-top: 30px;
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
