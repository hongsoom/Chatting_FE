import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/modules/user";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TbDotsVertical } from "react-icons/tb";

const BasicMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const MypageMove = () => {
    navigate("/mypage");
  };

  const Logout = () => {
    dispatch(userActions.logOutDB());
  };

  return (
    <MenuWrap>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="menubtn"
      >
        <TbDotsVertical size="30" color="#000" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={MypageMove}>My Profile</MenuItem>
        <MenuItem onClick={Logout}>Logout</MenuItem>
      </Menu>
    </MenuWrap>
  );
};

const MenuWrap = styled.div`
  display: flex;
  align-items: center;
  .menubtn {
    @media screen and (max-width: 768px) {
      padding: 0px;
      min-width: 10px;
    }
  }
`;

export default BasicMenu;
