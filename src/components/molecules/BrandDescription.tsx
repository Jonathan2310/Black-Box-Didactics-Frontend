import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  text-align: left;

  img {
    width: 100px;
    height: auto;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  color: #ccc;
  line-height: 1.6;
`;

export const BrandDescription: React.FC = () => (
  <Container>
    <img src="/src/assets/img/210125 - Logo BBX Blanco.png" alt="Logo" />
    <Title>Black Box Didactics</Title>
    <Description>
      Dedicada al diseño y desarrollo de herramientas didácticas basadas en tecnología, orientadas a enriquecer la enseñanza de ciencia, ingeniería y exploración.
    </Description>
  </Container>
);
