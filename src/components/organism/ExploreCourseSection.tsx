import styled from "styled-components";
import placaImg from "../../assets/img/CursoExample.png";
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
    text-align: center;
`;

const Title = styled.h2`
    font-family: 'Rubik', sans-serif;
    font-weight: 700;
    font-size: 1.8rem;
    margin-bottom: 3rem;
    text-align: center;
`;

const SubTitle = styled.h3`
    font-family: 'Rubik', sans-serif;
    font-style: italic;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    text-align: justify;
`;

const Description = styled.p`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: justify;
`;

const PrimaryButton = styled.button`
    background-color: #0B3D91;
    color: white;
    border: none;
    padding: 1.2rem 2rem;
    border-radius: 9999px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #333333;
    }
`;

const Image = styled.img`
    width: 400px;
    height: 400px;
`;

export default function ExploreCourseSection() {
    const navigate = useNavigate();

    return (
        <SectionContainer>
            <TextContainer>
                <Title>¿No sabes por dónde <br/> empezar?</Title>
                <SubTitle>Explora los cursos que tenemos para ti</SubTitle>
                <Description>Contenido guiado, práctico y pensado para que avances a tu ritmo. Aprende desde cero o mejora tus habilidades con proyectos reales.</Description>
                <PrimaryButton onClick={() => navigate("/noticias?section=cursos")}>Empezar ahora</PrimaryButton>
            </TextContainer>
            <Image src={placaImg} alt="Empezar ahora" />
        </SectionContainer>
    );
}
