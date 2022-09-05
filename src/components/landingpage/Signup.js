import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Text } from "../../elements";
import { userActions } from "../../redux/modules/user";

const Signup = ({ checkClient }) => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.user.status);

  const [inputs, setInputs] = useState({});
  const [idMessage, setIdMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [Message, setMessage] = useState("");

  const [stateUsername, setStateUsername] = useState(false);
  const [stateNickname, setStateNickname] = useState(false);
  const [state, setState] = useState(false);

  const [signupState, setSignupState] = useState(false);
  const [usernameState, setUsernameState] = useState(false);
  const [nicknameState, setNicknameState] = useState(false);

  useEffect(() => {
    if (status === 200 && signupState) {
      setMessage("회원가입에 성공했습니다.");
      setState(true);
    }

    if (status === 200 && usernameState) {
      setIdMessage("사용 가능한 ID 입니다.");
      setStateUsername(true);
      setUsernameState(false);
    }

    if (status === 200 && nicknameState) {
      setNicknameMessage("사용 가능한 닉네임 입니다.");
      setStateNickname(true);
      setNicknameState(false);
    }

    if (status === 400 && signupState) {
      setMessage("이미 존재하는 계정입니다.");
    }

    if (status === 400 && usernameState) {
      setIdMessage("이미 사용중인 ID 입니다.");
      setUsernameState(false);
    }

    if (status === 400 && nicknameState) {
      setNicknameMessage("이미 사용중인 닉네임 입니다.");
      setNicknameState(false);
    }
  }, [status, signupState, usernameState, nicknameState]);

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [id]: value }));

    if (
      (e.target.value === "" && id === "username") ||
      (e.target.value && id === "username")
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

  const idCondition = () => {
    let _reg = /^[a-zA-Z0-9]*$/;

    if (!_reg.test(inputs.username)) {
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
    setUsernameState(true);
    dispatch(userActions.idCheckDB(inputs.username));
  };

  const nicknameCondition = () => {
    let _reg = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$/;

    if (!_reg.test(inputs.nickname)) {
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

    setNicknameState(true);
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

    if (usernameState && nicknameState) {
      setSignupState(true);
      dispatch(
        userActions.signUpDB(
          inputs.username,
          inputs.nickname,
          inputs.password,
          inputs.passwordCheck
        )
      );
    } else {
      setMessage("아이디, 닉네임 중복확인을 해주세요!");
    }
  };

  return (
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
            width="350px"
            height="50px"
            style={{
              borderRadius: "4px",
              borderColor: "#DBDBDB",
              color: "#D9D9D9",
            }}
          />
          <CheckButton onClick={idCondition}>중복확인</CheckButton>
          <span
            style={{
              color: stateUsername === true ? "	#9ACD32" : "red",
            }}
          >
            {idMessage}
          </span>
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
            width="350px"
            height="50px"
            style={{ borderRadius: "4px", borderColor: "#DBDBDB" }}
          />
          <CheckButton onClick={nicknameCondition}>중복확인</CheckButton>
          <span
            style={{
              color: stateNickname === true ? "#9ACD32" : "red",
            }}
          >
            {nicknameMessage}
          </span>
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
            width="350px"
            height="50px"
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
            width="350px"
            height="50px"
            style={{ borderRadius: "4px", borderColor: "#DBDBDB" }}
          />
          <span
            style={{
              color: state === true ? "#9ACD32" : "red",
            }}
          >
            {Message}
          </span>
        </InputBox>
      </Box>
      <Box>
        <Button
          L
          onClick={handleSubmit}
          color="#fff"
          borderColor="#000"
          borderRadius="4px"
          width="350px"
          height="6vh"
          fontSize="14px"
        >
          회원가입
        </Button>
        <MsgBox>
          <p>
            계정이 있으신가요? &nbsp;
            <span onClick={() => checkClient(false)}>로그인</span>
          </p>
        </MsgBox>
      </Box>
    </SignUpWrap>
  );
};

const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
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
    background-color: #000000;
    :hover {
      background: #a9a9a9;
      border-color: #a9a9a9;
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
  }
`;

const CheckButton = styled.button`
  position: absolute;
  width: 70px;
  height: 50px;
  border-radius: 3px;
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
  & > p > span {
    cursor: pointer;
    font-size: 15px;
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 15px;
  }
`;

export default Signup;
