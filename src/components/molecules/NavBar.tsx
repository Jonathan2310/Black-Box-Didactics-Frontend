import styled from "styled-components";
import Text from "../atoms/TextRubik";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    color: #f0f0f0;
  }
`;

const navItems = [
  { label: "Productos", path: "/productos" },
  { label: "Noticias", path: "/noticias" },
  { label: "Comunidad", path: "/comunidad" },
  { label: "Biblioteca de recursos", path: "/bibliotecaRecursos" },
];

export default function NavBar() {
  return (
    <Nav>
      {navItems.map((item, index) => (
        <StyledLink to={item.path} key={index}>
          <Text size="16px" weight="500" color="white" as="span">
            {item.label}
          </Text>
        </StyledLink>
      ))}
    </Nav>
  );
}
