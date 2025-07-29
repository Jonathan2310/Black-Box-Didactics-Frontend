import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  margin-bottom: 2rem;
  color: #444;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
`;

const TitleLink = styled.a`
  font-weight: bold;
  color: #0066cc;
  font-size: 1rem;
  text-decoration: none;
`;

const Tags = styled.div`
  margin: 0.5rem 0;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
`;

const Button = styled.button`
  background-color: #005be4;
  color: white;
  border: none;
  padding: 0.7rem;
  border-radius: 20px;
  margin: 0.5rem auto 1rem;
  width: 80%;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #0041a3;
  }
`;

interface Curso {
  id: number;
  titulo: string;
  fecha: string;
  imagenUrl: string;
  cursoUrl: string;
  etiquetaPrecio: string;
  etiquetaNivel: string;
}

function CoursesSection() {
  const [courses, setCourses] = useState<Curso[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/cursos')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Section>
      <Title>Cursos</Title>
      <Subtitle>
        Explora nuestros cursos diseñados para ti: prácticos, guiados y pensados para todos los niveles.
      </Subtitle>
      <Grid>
        {courses.map((course, index) => (
          <Card key={index}>
            <Image src={course.imagenUrl} alt={course.titulo} />
            <CardContent>
              <TitleLink href={course.cursoUrl} target="_blank" rel="noopener noreferrer">
                {course.titulo}
              </TitleLink>
              <Tags>
                <Tag>{course.etiquetaPrecio}</Tag>
                <Tag>{course.etiquetaNivel}</Tag>
              </Tags>
            </CardContent>
            <Button onClick={() => window.open(course.cursoUrl, '_blank')}>
              Empezar curso
            </Button>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

export default CoursesSection;
