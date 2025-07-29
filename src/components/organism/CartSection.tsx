import styled from "styled-components";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  font-family: "Rubik", sans-serif;
  padding: 40px 20px;
  max-width: 900px;
  height: auto;
  margin: 0 auto;
  color: #000;
`;

const Title = styled.h2`
  font-style: italic;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 30px;
`;

const Item = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  flex-wrap: wrap;
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ItemImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
`;

const ItemInfo = styled.div``;

const ItemName = styled.h3`
  font-weight: 800;
  font-size: 16px;
`;

const ItemLinks = styled.div`
  margin-top: 8px;
  font-size: 13px;

  a {
    margin-right: 12px;
    text-decoration: underline;
    color: #000;
    cursor: pointer;
  }
`;

const ItemPrice = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const Totals = styled.div`
  margin-top: 40px;
  max-width: 350px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TotalsRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-bottom: 10px;
`;

const TotalFinal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const BuyButton = styled.button`
  padding: 20px 25px;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  align-self: flex-end;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
`;

interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

interface CarritoResponse {
  productos: Product[];
  total: number;
  envio: number;
  totalGeneral: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<CarritoResponse>({
    productos: [],
    total: 0,
    envio: 0,
    totalGeneral: 0,
  });

  const userId = localStorage.getItem('userId');

  const fetchCart = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:3000/carrito/${userId}`);
      const data: CarritoResponse = await res.json();
      setCartData(data);
    } catch (err) {
      console.error('Error al cargar el carrito:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleDelete = async (productId: number) => {
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:3000/carrito/${userId}/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchCart();
      } else {
        console.error('No se pudo eliminar el producto del carrito');
      }
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
    }
  };

  const handleCheckout = async () => {
    try {
      const productosParaPago = productos.map(p => ({
        nombre: p.nombre,
        precio: Number(p.precio),
        cantidad: 1
      }));

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

  const { productos, total, envio, totalGeneral } = cartData;

  return (
    <Container>
      <Title>Tu carrito</Title>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {productos.map((item) => (
          <Item key={item.id}>
            <ItemLeft>
              <ItemImage src={`http://localhost:3000/uploads/${item.imagen}`} alt={item.nombre} />
              <ItemInfo>
                <ItemName>{item.nombre}</ItemName>
                <ItemLinks>
                  <a onClick={() => handleDelete(item.id)}>Eliminar</a>
                  <a onClick={() => navigate(`/producto/${item.id}`)}>Ver detalles del producto</a>
                </ItemLinks>
              </ItemInfo>
            </ItemLeft>
            <ItemPrice>${item.precio.toLocaleString()}</ItemPrice>
          </Item>
        ))}
      </div>

      <Totals>
        <TotalsRow>
          <span>Subtotal</span>
          <span>${total.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}</span>
        </TotalsRow>
        <Divider />
        <TotalsRow>
          <span>Envío</span>
          <span>{envio.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}</span>
        </TotalsRow>
        <Divider />
        <TotalFinal>
          <span>Total</span>
          <span>${totalGeneral.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}</span>
        </TotalFinal>
        <BuyButton onClick={handleCheckout}>Comprar ahora</BuyButton>
      </Totals>
    </Container>
  );
};

export default Cart;
