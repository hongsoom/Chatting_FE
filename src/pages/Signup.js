import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button, Input, Text } from "../elements";
import { userActions } from "../redux/modules/user";
import Manual from "../components/share/Manual";

const Signup = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [idMessage, setIdMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [Message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [id]: value }));

    if (
      (e.target.value === "" && id === "email") ||
      (e.target.value && id === "email")
    ) {
      setIdMessage("");
      setMessage("");
    }

    if (
      (e.target.value === "" && id === "nickname") ||
      (e.target.value && id === "nickname")
    ) {
      setNicknameMessage("");
      setMessage("");
    }

    if (
      (e.target.value === "" && id === "password") ||
      (e.target.value === "" && id === "passwordCheck") ||
      (e.target.value && id === "password") ||
      (e.target.value && id === "passwordCheck")
    ) {
      setMessage("");
    }
  };

  const idCheck = () => {
    const idCheck = (username) => {
      let _reg = /^[a-zA-Z0-9]*$/;

      return _reg.test(username);
    };

    if (!idCheck(inputs.username)) {
      setIdMessage("아이디는 6 ~ 20자로 영문, 숫자만 사용할 수 있습니다.");
      return;
    }

    if (!inputs.username) {
      setIdMessage("아이디는 6 ~ 20자로 영문, 숫자만 사용할 수 있습니다.");
      return;
    }

    if (inputs.username.length < 6 || inputs.username.length > 20) {
      setIdMessage("아이디는 6자리 이상, 20자리 미만입니다.");
      return;
    }

    dispatch(userActions.idCheckDB(inputs.username));
  };

  const nicknameCheck = () => {
    const nickCheck = (nickname) => {
      let _reg = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$/;

      return _reg.test(nickname);
    };

    if (!nickCheck(inputs.nickname)) {
      setNicknameMessage(
        "닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다."
      );
      return;
    }

    if (!inputs.nickname) {
      setNicknameMessage(
        "닉네임은 2 ~ 8자로 한글, 영문, 숫자만 사용할 수 있습니다."
      );
      return;
    }

    if (inputs.nickname.length < 2 || inputs.nickname.length > 8) {
      setNicknameMessage("닉네임은 2자리 이상, 8자리 미만입니다.");
      return;
    }

    dispatch(userActions.nicknameCheckDB(inputs.nickname));
  };

  const handleSubmit = () => {
    if (!inputs.username || !inputs.password || !inputs.nickname) {
      setMessage("아이디, 닉네임, 비밀번호를 입력해주세요! ");
      return;
    }

    if (inputs.password !== inputs.passwordCheck) {
      setMessage("비밀번호와 비밀번호확인 값이 다릅니다.");
      return;
    }

    if (inputs.password.length < 6 || inputs.password.length > 16) {
      setMessage("비밀번호는 6자리 이상, 16자리 미만입니다.");
      return;
    }

    const { username, nickname, password, passwordCheck } = inputs;

    dispatch(userActions.signUpDB(inputs));
  };

  return (
    <>
      <div>
        <SignUpContainer>
          <ManualWrap>
            <Manual />
          </ManualWrap>
          <SignUpWrap>
            <Text S3 style={{ margin: "0px" }}>
              회원가입
            </Text>
            <Box>
              <InputBox>
                <Input
                  M
                  id="username"
                  className="myInput"
                  placeholder="아이디 입력 (6~20자)"
                  onChange={handleChange}
                  value={inputs.username || ""}
                  margin="0 0 8px 0"
                  padding="10px"
                  width="300px"
                  height="30px"
                  style={{
                    borderRadius: "4px",
                    borderColor: "#DBDBDB",
                    color: "#D9D9D9",
                  }}
                />
                <CheckButton onClick={idCheck}>중복확인</CheckButton>
                <span>{idMessage}</span>
              </InputBox>
              <InputBox>
                <Input
                  M
                  id="nickname"
                  className="myInput"
                  placeholder="닉네임 입력 (2~8자)"
                  onChange={handleChange}
                  value={inputs.nickname || ""}
                  margin="0 0 8px 0"
                  padding="10px"
                  width="300px"
                  height="30px"
                  style={{ borderRadius: "4px", borderColor: "#DBDBDB" }}
                />
                <CheckButton onClick={nicknameCheck}>중복확인</CheckButton>
                <span>{nicknameMessage}</span>
              </InputBox>
              <InputBox>
                <Input
                  M
                  id="password"
                  className="myInput"
                  type="password"
                  placeholder="비밀번호 입력 (8~16자)"
                  onChange={handleChange}
                  value={inputs.password || ""}
                  margin="0 0 8px 0"
                  padding="10px"
                  width="300px"
                  height="30px"
                  style={{ borderRadius: "4px", borderColor: "#DBDBDB" }}
                />
              </InputBox>
              <InputBox>
                <Input
                  M
                  id="passwordCheck"
                  className="myInput"
                  type="password"
                  placeholder="비밀번호 재입력"
                  onChange={handleChange}
                  value={inputs.passwordCheck || ""}
                  margin="0 0 8px 0"
                  padding="10px"
                  width="300px"
                  height="30px"
                  style={{ borderRadius: "4px", borderColor: "#DBDBDB" }}
                />
                <span>{Message}</span>
              </InputBox>
            </Box>
            <Box>
              <Button
                L
                onClick={handleSubmit}
                color="#fff"
                borderColor="#fff"
                borderRadius="4px"
                width="325px"
                height="6vh"
                fontSize="14px"
              >
                회원가입
              </Button>
              <MsgBox>
                <p>
                  계정이 있으신가요? &nbsp;
                  <a href={"/Login"}>로그인</a>
                </p>
              </MsgBox>
            </Box>
          </SignUpWrap>
        </SignUpContainer>
      </div>
    </>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  }
`;

const ManualWrap = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .myInput {
    :focus {
      box-shadow: none;
      outline: none !important;
      border-color: #6371f7 !important;
    }
  }
`;
const Box = styled.div`
  margin: 24px 0 0;
  button {
    background-color: rgba(99, 113, 247, 1);
    :hover {
      background: rgba(50, 69, 245, 1);
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18px;
  position: relative;
  & > span {
    font-size: 11px;
    margin: 0;
    color: red;
  }
`;

const CheckButton = styled.button`
  position: absolute;
  width: 70px;
  height: 52px;
  border-radius: 3px;
  border: 1px solid rgba(99, 113, 247, 1);
  right: 0;
  color: white;
  font-size: 11px;
`;

const MsgBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 16px;
  & > p {
    font-size: 15px;
  }
  & > p > a {
    cursor: pointer;
    font-size: 15px;
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 15px;
  }
`;

export default Signup;
