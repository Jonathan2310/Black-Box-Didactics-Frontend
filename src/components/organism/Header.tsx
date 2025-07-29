import styled from "styled-components";
import logo from "../../assets/img/210125 - Logo BBX Blanco.png";
import NavBar from "../molecules/NavBar";
import UserProfile from "../molecules/Userprofile";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  background-color: #212121;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: relative;
`;

const Logo = styled.img`
  height: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <NavBar />
      <Logo src={logo} alt="Logo" onClick={handleLogoClick} />
      <UserProfile />
    </HeaderContainer>
  );
}
