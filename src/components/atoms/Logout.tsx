import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LogoutButtonStyled = styled.button`
  background-color: #e63946;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    background-color: #d62828;
  }
`;

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return <LogoutButtonStyled onClick={handleLogout}>Cerrar sesión</LogoutButtonStyled>;
}
