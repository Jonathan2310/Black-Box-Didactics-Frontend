import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  nombre: string;
  imagen: string;
  categoria: string;
}

const Section = styled.section`
  padding: 3rem 2rem;
  background-color: #ffffff;
  margin-bottom: 7rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ProductsContainer = styled.div`
  display: flex;
  gap: 8rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ProductCard = styled.div`
  text-align: center;
  max-width: 240px;
  min-width: 200px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductName = styled.p`
  font-size: 1rem;
  font-style: italic;
  font-weight: 600;
  margin: 0.5rem 0;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 9999px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;

  &:hover {
    background-color: #333;
  }
`;

interface Props {
  categoria: string;
  idProducto: number;
}

export default function RelatedProductsSection({ categoria, idProducto }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/productos/relacionados/${categoria}/${idProducto}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al obtener productos relacionados:", err));
  }, [categoria, idProducto]);

  return (
    <Section>
      <Title>Productos relacionados</Title>
      <ProductsContainer>
        {products.map((p) => (
          <ProductCard key={p.id}>
            <ProductImage
              src={`http://localhost:3000/uploads/${p.imagen}`}
              alt={p.nombre}
            />
            <ProductName>{p.nombre}</ProductName>
            <Button to={`/producto/${p.id}`}>Ver producto</Button>
          </ProductCard>
        ))}
      </ProductsContainer>
    </Section>
  );
}
