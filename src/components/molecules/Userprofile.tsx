import styled from "styled-components";
import perfilIcon from "../../assets/img/User.png";
import Text from "../atoms/TextRubik";
import { useNavigate } from "react-router-dom";

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: #f0f0f0;
  }
`;

const ProfileIcon = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 8px;
  background: white;
  padding: 3px;
`;

export default function UserProfile() {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/perfil");
    } else {
      navigate("/login");
    }
  };

  return (
    <ProfileButton onClick={handleClick} aria-label="Ir a perfil">
      <ProfileIcon src={perfilIcon} alt="Perfil" />
      <Text size="16px" color="white" as="span">
        Mi perfil
      </Text>
    </ProfileButton>
  );
}
