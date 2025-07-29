import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Container = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  font-family: 'Inter', sans-serif;
  min-height: 120vh;
`;

const Image = styled.img`
  max-width: 500px;
  width: 100%;
  max-height: 600px;
  height: 100%;
  border-radius: 10px;
  padding-top: 80px;
`;

const Info = styled.div`
  width: 520px;
`;

const Category = styled.p`
  color: #0B3D91;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const TitlePriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-family: 'Rubik', sans-serif;
  font-style: italic;
  font-weight: 700;
  font-size: 1.8rem;
  margin: 0;
`;

const Price = styled.p`
  font-weight: bold;
  font-style: italic;
  font-size: 1.1rem;
  margin: 0;
  color: #000;
`;

const Description = styled.p`
  margin: 1rem 0;
  text-align: justify;
`;

const Characteristics = styled.ul`
  margin-top: 1rem;
  list-style-type: circle;
`;

const DocumentsAndButtons = styled.div`
  margin-top: 5rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const Documents = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 140px;
`;

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${(props) => (props.primary ? "#105BD8" : "#000")};
  color: #fff;
  padding: 20px 20px;
  border-radius: 35px;
  border: none;
  cursor: pointer;
  font-weight: bold;
`;

interface Product {
  id: number;
  nombre: string;
  precio: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  caracteristicas: string[];
  documentos: { label: string; link: string }[];
}


export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/productos/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;


  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Debes iniciar sesión para agregar al carrito.");
      return;
    }

    if (!product?.id) {
      alert("No se pudo determinar el ID del producto.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/carrito/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_id: parseInt(userId),
          producto_id: product.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Producto agregado al carrito.");
        navigate('/carrito');
      } else {
        alert(data.error || "No se pudo agregar el producto.");
      }
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      alert("Error inesperado.");
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;

    try {
      const productosParaPago = [{
        nombre: product.nombre,
        precio: Number(product.precio),
        cantidad: 1
      }];

      const response = await fetch('http://localhost:3000/api/pagos/pagar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productos: productosParaPago })
      });

      if (!response.ok) {
        throw new Error('Error al crear la sesión de pago');
      }

      const { url } = await response.json();

      window.location.href = url;

    } catch (error) {
      console.error('Error en el pago:', error);
      alert('Error al procesar el pago. Intente de nuevo.');
    }
  };


  return (
    <Container>
      <Image src={`http://localhost:3000/uploads/${product.imagen}`} alt={product.nombre} />

      <Info>
        <Category>Categoría: {product.categoria}</Category>

        <TitlePriceRow>
          <Title>{product.nombre}</Title>
          <Price>${product.precio}</Price>
        </TitlePriceRow>

        <h3>Descripción</h3>
        <Description>{product.descripcion}</Description>

        <h3>Características</h3>
        <Characteristics>
          {product.caracteristicas && product.caracteristicas.length > 0 ? (
            product.caracteristicas.map((carac, i) => <li key={i}>{carac}</li>)
          ) : (
            <li>No hay características disponibles.</li>
          )}
        </Characteristics>

        <DocumentsAndButtons>
          <Documents>
            <h3>Documentos</h3>
            {product.documentos && product.documentos.length > 0 ? (
              product.documentos.map((doc, i) => (
                <p key={i}>
                  <a href={doc.link} target="_blank" rel="noopener noreferrer">
                    {doc.label}
                  </a>
                </p>
              ))
            ) : (
              <p>No hay documentos disponibles.</p>
            )}
          </Documents>

          <Buttons>
            <Button primary onClick={handleAddToCart}>Agregar al carrito</Button>
            <Button onClick={handleBuyNow}>Comprar ahora</Button>
          </Buttons>
        </DocumentsAndButtons>
      </Info>
    </Container>
  );
}
