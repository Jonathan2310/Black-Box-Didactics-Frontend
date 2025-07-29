import { useEffect, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 40px;
  background-color: #ffffff;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  row-gap: 40px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Thumbnail = styled.img`
  width: 350px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
  color: #0047ba;
  margin-bottom: 10px;
`;

interface Tutorial {
  titulo: string;
  imgUrl: string;
  tutorialUrl: string;
}


const TutorialSection = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/tutoriales")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los tutoriales");
        }
        return res.json();
      })
      .then((data) => setTutorials(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Section>
      <Title>Tutoriales</Title>
      <Grid>
        {tutorials.map((tutorial, index) => (
          <Card key={index}>
            <Subtitle>{tutorial.titulo}</Subtitle>
            <a
              href={tutorial.tutorialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Thumbnail src={tutorial.imgUrl} alt={tutorial.titulo} />
            </a>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default TutorialSection;
