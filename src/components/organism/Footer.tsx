import React from "react";
import styled from "styled-components";
import { BrandDescription } from "../molecules/BrandDescription";
import { LinkList } from "../molecules/LinkList";
import { SocialIcons } from "../molecules/SocialIcons";

const FooterContainer = styled.footer`
  background-color: #212121;
  color: white;
  font-family: 'Rubik', sans-serif;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 3rem 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 3fr 1fr;
  }
`;

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

const BottomBar = styled.div`
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #ccc;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    text-align: center;
  }
`;

const CenteredTopLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #ccc;
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    color: #ccc;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer: React.FC = () => {
  const footerLinks = {
    Productos: [
      { name: "Didactics", href: "http://localhost:5173/productos?section=Didactics" },
      { name: "Dynamics", href: "http://localhost:5173/productos?section=Dynamics" },
      { name: "UAV", href: "http://localhost:5173/productos?section=UAVs" }
    ],
    Noticias: [
      { name: "Eventos", href: "http://localhost:5173/noticias?section=eventos" },
      { name: "Documentos", href: "http://localhost:5173/noticias?section=documentos" },
      { name: "Cursos", href: "http://localhost:5173/noticias?section=cursos" }
    ],
    Comunidad: [
      { name: "Opiniones", href: "http://localhost:5173/comunidad?section=opiniones" },
      { name: "Testimonios", href: "http://localhost:5173/comunidad?section=testimonios" },
      { name: "Foro de preguntas y respuestas", href: "http://localhost:5173/comunidad?section=preguntasRespuestas" },
      { name: "Fotografías", href: "http://localhost:5173/comunidad?section=fotografias" },
    ],
    "Bibliotecas de recursos": [
      { name: "Recursos", href: "http://localhost:5173/bibliotecaRecursos" },
      { name: "Tutoriales", href: "http://localhost:5173/bibliotecaRecursos" },
      { name: "Galería", href: "http://localhost:5173/bibliotecaRecursos" }
    ]
  };

  const bottomLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Marca de la empresa", href: "/marca-de-la-empresa" },
    { name: "Contacto", href: "/contacto" },
    { name: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
    { name: "Soporte", href: "/soporte" },
    { name: "Términos y condiciones", href: "/términos-y-condiciones" }
  ];

  return (
    <FooterContainer>
      <TopSection>
        <BrandDescription />
        <LinksGrid>
          {Object.entries(footerLinks).map(([title, links]) => (
            <LinkList key={title} title={title} links={links} />
          ))}
        </LinksGrid>
        <div>
          <h4 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Síguenos en</h4>
          <SocialIcons />
        </div>
      </TopSection>

      <CenteredTopLinks>
        {bottomLinks.map(link => (
          <a key={link.name} href={link.href}>
            {link.name}
          </a>
        ))}
      </CenteredTopLinks>

      <div style={{ borderTop: "1px solid #ffffff", margin: "0 2.5rem" }} />

      <BottomBar>
        <p>Copyright © 2025 Black Box Didactics. Todos los derechos reservados</p>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
