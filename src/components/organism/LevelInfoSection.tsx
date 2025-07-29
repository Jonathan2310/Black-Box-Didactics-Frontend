import styled from "styled-components";
import { Link } from "react-router-dom";

const SectionContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    height: 80vh;
    gap: 2rem;
    flex-wrap: wrap;
`;

const TextContainer = styled.div`
    flex: 1 1 400px;
    max-width: 500px;
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

const SubtitleLink = styled(Link)`
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-decoration: underline;
    color: black;
    display: block;

    &:hover {
        color: #1e40af;
    }
`;


export default function LevelInfoSection() {
    return (
        <SectionContainer>
            <TextContainer>
                <Title>¿Estas listo?</Title>
                <Description>En Black Box Didactics sabemos que cada persona aprende diferente. Por eso, nuestros kits están organizados por niveles de dificultad, desde lo más básico hasta retos más avanzados. Aprende desde cero, explora nuevas herramientas y crea tus propios proyectos paso a paso.</Description>
            </TextContainer>
            <TextContainer>
                <Title>Tú eliges el nivel, nosotros te damos las herramientas:</Title>
                <SubtitleLink to="/productos?section=Didactics">
                    Nivel 1 : Aprendizaje e introducción a la tecnología
                </SubtitleLink>

                <SubtitleLink to="/productos?section=Dynamics">
                    Nivel 2 : Desarrollo y tecnología avanzada
                </SubtitleLink>
            </TextContainer>
        </SectionContainer>
    );
}
