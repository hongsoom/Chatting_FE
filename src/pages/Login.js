import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/modules/user";
import { Button, Input, Text } from "../elements";
import Manual from "../components/share/Manual";

const Login = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = React.useState({});

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [id]: value }));
  };

  const login = () => {
    dispatch(userActions.loginDB(inputs));
  };

  return (
    <LoginContainer>
      <ManualWrap>
        <Manual />
      </ManualWrap>
      <LoginWrap>
        <Text S3 style={{ margin: "0px" }}>
          로그인
        </Text>
        <Box>
          <InputBox>
            <Input
              M
              id="email"
              className="myInput"
              type="text"
              onChange={handleChange}
              value={inputs.email ? inputs.email : ""}
              placeholder="아이디를 입력해주세요."
              margin="0 0 8px 0"
              padding="10px"
              width="300px"
              height="30px"
              style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
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
              width="300px"
              height="30px"
              style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
            ></Input>
          </InputBox>
        </Box>
        <Box>
          <Button
            L
            onClick={() => {
              if (!inputs.email || !inputs.password) {
                alert("아이디, 비밀번호를 입력해주세요!");
                return;
              }
              login();
            }}
            color="#fff"
            borderColor="#fff"
            borderRadius="12px"
            width="325px"
            height="6vh"
          >
            로그인
          </Button>
          <MsgBox>
            <p>
              계정이 없으신가요? &nbsp;
              <a href={"/Signup"}>회원가입</a>
            </p>
          </MsgBox>
        </Box>
      </LoginWrap>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
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

const ManualWrap = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
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
  .line {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    font-size: 14px;
    margin: 8px 0px;
  }
  .line::before {
    content: "";
    flex-grow: 1;
    margin: 0px 16px 0 0;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
  .line::after {
    content: "";
    flex-grow: 1;
    margin: 0px 0 0 16px;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
  }
`;

const InputBox = styled.div`
  margin-top: 11px;
`;

const MsgBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 16px;
  & > p > a {
    cursor: pointer;
    font-size: 15px;
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
`;

export default Login;
