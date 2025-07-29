import { useEffect, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 40px 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 12px;
`;

const ResourceTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #0066cc;
`;

const Description = styled.p`
  font-size: 0.75rem;
  margin-top: 8px;
  color: #333;
  white-space: pre-wrap;
`;

const Button = styled.a`
  background: #1565ef;
  color: white;
  padding: 10px 0;
  font-size: 0.85rem;
  border: none;
  width: 100%;
  text-align: center;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #004ecb;
  }
`;

interface Recurso {
  id: number;
  imgUrl: string;
  titulo: string;
  descripcion: string;
  recursoUrl: string;
}

const ResourceLibraryCard = () => {
  const [resources, setResources] = useState<Recurso[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/recursos")
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error("Error cargando recursos:", err));
  }, []);

  return (
    <Section>
      <Title>Biblioteca de recursos</Title>
      <Grid>
        {resources.map((res) => (
          <Card key={res.id}>
            <Image src={res.imgUrl} alt={res.titulo} />
            <Content>
              <ResourceTitle>{res.titulo}</ResourceTitle>
              <Description>{res.descripcion}</Description>
            </Content>
            <Button href={res.recursoUrl} target="_blank" rel="noopener noreferrer">
              Ver recurso
            </Button>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default ResourceLibraryCard;
