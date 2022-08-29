import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Input, Text } from "../elements";
import { userActions } from "../redux/modules/user";
import Manual from "../components/share/Manual";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [id]: value }));
  };

  const handleSubmit = () => {
    const idCheck = (email) => {
      let _reg = /^[a-zA-Z0-9]*$/;

      return _reg.test(email);
    };

    const nickCheck = (nickname) => {
      let _reg = /^[가-힣ㄱ-ㅎa-zA-Z0-9._ -]{2,15}$/;

      return _reg.test(nickname);
    };

    if (!inputs.email || !inputs.password || !inputs.nickname) {
      alert("칸을 다 채워주세요.");
      return;
    }

    if (inputs.password !== inputs.passwordCheck) {
      alert("비밀번호와 비밀번호확인 값이 다릅니다.");
      return;
    }

    if (!idCheck(inputs.email)) {
      alert("아이디는 영어, 숫자 형식으로 6자 이상으로 작성해주세요.");
      return;
    }

    if (!nickCheck(inputs.nickname)) {
      alert("닉네임은 6자 이상으로 특수문자는 불가능합니다.");
      return;
    }

    if (inputs.password.length < 6 || inputs.password.length > 16) {
      alert("비밀번호는 8자리 이상, 16자리 미만입니다.");
      return;
    }

    const { email, nickname, password, passwordCheck } = inputs;

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
                  id="email"
                  className="myInput"
                  placeholder="아이디를 입력해주세요."
                  onChange={handleChange}
                  value={inputs.email || ""}
                  margin="0 0 8px 0"
                  padding="10px"
                  width="300px"
                  height="30px"
                  style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
                />
              </InputBox>
              <InputBox>
                <Input
                  M
                  id="nickname"
                  className="myInput"
                  placeholder="닉네임을 입력해주세요."
                  onChange={handleChange}
                  value={inputs.nickname || ""}
                  margin="0 0 8px 0"
                  padding="10px"
                  width="300px"
                  height="30px"
                  style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
                />
              </InputBox>
              <InputBox>
                <Input
                  M
                  id="password"
                  className="myInput"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={handleChange}
                  value={inputs.password || ""}
                  margin="0 0 8px 0"
                  padding="10px"
                  width="300px"
                  height="30px"
                  style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
                />
              </InputBox>
              <InputBox>
                <Input
                  M
                  id="passwordCheck"
                  className="myInput"
                  type="password"
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  onChange={handleChange}
                  value={inputs.passwordCheck || ""}
                  margin="0 0 8px 0"
                  padding="10px"
                  width="300px"
                  height="30px"
                  style={{ borderRadius: "12px", borderColor: "#DBDBDB" }}
                />
              </InputBox>
            </Box>
            <Box>
              <Button
                L
                onClick={handleSubmit}
                color="#fff"
                borderColor="#fff"
                borderRadius="12px"
                width="325px"
                height="6vh"
              >
                회원가입
              </Button>
              <MsgBox>
                <span onClick={() => navigate("/login")}>
                  로그인으로 돌아가기
                </span>
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
  margin-top: 11px;
`;

const MsgBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 16px;
  & > span {
    cursor: pointer;
    font-family: "Pretendard-Regular";
  }
`;

export default Signup;
