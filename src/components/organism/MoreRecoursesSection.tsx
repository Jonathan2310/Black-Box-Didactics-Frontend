import styled from "styled-components";
import placaImg from "../../assets/img/Esp 32.png";
import { Link } from "react-router-dom";
import flechaIcon from "../../assets/img/Forward Button Black.png";

const SectionContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    height: 90vh;
    gap: 2rem;
    flex-wrap: wrap;
`;

const TextContainer = styled.div`
    flex: 1 1 400px;
    max-width: 600px;
`;

const Title = styled.h2`
    font-family: 'Rubik', sans-serif;
    font-style: italic;
    font-weight: 700;
    font-size: 1.8rem;
    margin-bottom: 1rem;
`;

const Description = styled.p`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: justify;
`;

const Image = styled.img`
    max-width: 400px;
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
  color: #000000;

  &:hover {
    text-decoration: underline;
  }
`; 

export default function MoreRecoursesSection() {

    return (
        <SectionContainer>
            <TextContainer>
                <Title>ESP 32</Title>
                <Description>El ESP32 es un microcontrolador revolucionario que se ha vuelto esencial en la tecnología moderna. Es un sistema en chip (SoC) económico y de bajo consumo que combina funciones Wi-Fi y Bluetooth. Se ha convertido en una opción popular para una amplia gama de aplicaciones, desde sistemas de domótica hasta dispositivos médicos. Su fácil integración con otros dispositivos y su pequeño tamaño lo convierten en una excelente opción para cualquier proyecto.</Description>
                <CTAButton to="/bibliotecaRecursos">
                    <span>Encuentra más material relacionado</span>
                    <img src={flechaIcon} alt="Flecha" width="30" height="30" />
                </CTAButton>
            </TextContainer>
            <Image src={placaImg} alt="ESP 32" />
        </SectionContainer>
    );
}
