import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/modules/user";
import { Button, Input, Text } from "../../elements";

const Login = ({ checkClient }) => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.user.status);

  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");
  const [state, setState] = useState(false);
  const [click, setClick] = useState(false);

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [id]: value }));

    if (
      (e.target.value === "" && id === "username") ||
      (e.target.value && id === "username")
    ) {
      setMessage("");
    }

    if (
      (e.target.value === "" && id === "password") ||
      (e.target.value && id === "password")
    ) {
      setMessage("");
    }
  };

  const login = () => {
    if (!inputs.username || !inputs.password) {
      setMessage("아이디, 비밀번호를 입력해주세요!");
      return;
    }
    dispatch(userActions.logInDB(inputs.username, inputs.password, setClick));
  };

  const LoginEnter = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    if (status === 200 && click === false) {
      setState(true);
      setMessage("로그인에 성공했습니다.");
    }

    if (status === 400 && click) {
      setState(false);
      setMessage(
        "아이디, 비밀번호가 틀렸습니다. \n로그인 정보를 확인해주세요."
      );
      setClick(false);
    }
  }, [status, state, click]);

  return (
    <LoginWrap>
      <Text S3 style={{ margin: "0px" }}>
        로그인
      </Text>
      <Box>
        <InputBox>
          <Input
            M
            id="username"
            className="myInput"
            type="text"
            onChange={handleChange}
            value={inputs.username ? inputs.username : ""}
            placeholder="아이디를 입력해주세요."
            margin="0 0 8px 0"
            padding="10px"
            width="350px"
            height="50px"
            style={{ borderRadius: "4px", borderColor: "#DBDBDB" }}
          ></Input>
        </InputBox>
        <InputBox>
          <Input
            M
            id="password"
            className="myInput"
            type="password"
            onChange={handleChange}
            value={inputs.password ? inputs.password : ""}
            placeholder="비밀번호를 입력해주세요."
            margin="0 0 8px 0"
            padding="10px"
            width="350px"
            height="50px"
            style={{ borderRadius: "4px", borderColor: "#DBDBDB" }}
            onKeyPress={(e) => LoginEnter(e)}
          ></Input>
          <span
            style={{
              color: state === true ? "	#9ACD32" : "red",
            }}
          >
            {message}
          </span>
        </InputBox>
      </Box>
      <Box>
        <Button
          L
          onClick={login}
          color="#fff"
          borderColor="#fff"
          borderRadius="4px"
          width="350px"
          height="6vh"
          fontSize="14px"
        >
          로그인
        </Button>
        <MsgBox>
          <p>
            계정이 없으신가요? &nbsp;
            <span onClick={() => checkClient(true)}>회원가입</span>
          </p>
        </MsgBox>
      </Box>
    </LoginWrap>
  );
};

const LoginWrap = styled.div`
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
  margin: 15px 0 0;
  button {
    background-color: #000;
    :hover {
      background: #a9a9a9;
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 11px;
  & > span {
    font-size: 11px;
    margin: 0;
    white-space: pre-wrap;
    line-height: 15px;
  }
`;

const MsgBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 16px;
  & > p > span {
    cursor: pointer;
    font-size: 15px;
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
`;

export default Login;
