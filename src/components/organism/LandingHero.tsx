import styled from "styled-components";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/img/Fondo Home.jpg";
import Text from "../atoms/TextRubik";
import flechaIcon from "../../assets/img/Forward Button.png";

const HeroContainer = styled.section`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 90vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.486);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const CTAButton = styled(Link)`
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-style: italic;
  font-weight: 500;
  font-size: 20px;
  color: #ffffff;

  &:hover {
    text-decoration: underline;
  }
`; 

export default function Hero() {
  return (
    <HeroContainer>
      <Overlay />
      <Content>
        <Text
          as="h1"
          size="48px"
          weight="700"
          color="#ffffff"
          lineHeight="1.2"
          align="center"
        >
          Empieza hoy a construir tus <br /> propios proyectos <br /> tecnológicos
        </Text>

        <CTAButton to="/productos">
          <span>Ver productos</span>
          <img src={flechaIcon} alt="Flecha" width="30" height="30" />
        </CTAButton>
      </Content>
    </HeroContainer>
  );
}
