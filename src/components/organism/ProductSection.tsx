import styled from "styled-components";
import placaImg from "../../assets/img/240125 - BBD1 IZQ.png";
import { useNavigate } from "react-router-dom";

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
`;

const LevelText = styled.p`
    font-weight: 600;
    margin-bottom: 2rem;
    font-size: 1rem;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const PrimaryButton = styled.button`
    background-color: #000000;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #333333;
    }
`;

const SecondaryButton = styled.button`
    background-color: transparent;
    border: 1px solid #000000;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background-color: #333333;
    }
`;

const Image = styled.img`
    flex: 1 1 300px;
    max-width: 400px;
    object-fit: contain;
`;

export default function ProductSection() {
    const navigate = useNavigate();

    return (
        <SectionContainer>
        <TextContainer>
            <Title>Placa <i>BBD1.0</i></Title>
            <Description>Explora la placa BBD1.0, diseñada para acompañarte en el desarrollo de tus ideas tecnológicas desde cero.</Description>
            <LevelText><strong>Nivel</strong> &nbsp;&nbsp; Básico</LevelText>
            <ButtonsContainer>
                <PrimaryButton onClick={() => navigate("/producto/5")}>
                    Conoce placa BBD1.0
                </PrimaryButton>
                <SecondaryButton onClick={() => navigate("/productos")}>
                    Ver más placas
                </SecondaryButton>
            </ButtonsContainer>
        </TextContainer>
        <Image src={placaImg} alt="Placa BBD1.0" />
        </SectionContainer>
    );
}
