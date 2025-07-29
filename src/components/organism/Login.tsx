import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #212121;
`;

const Form = styled.div`
  background-color: #121212;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  width: 350px;
  color: white;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  margin-bottom: 20px;
`;

const LinkButton = styled.a`
  display: block;
  font-size: 13px;
  color: #ccc;
  text-align: right;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #fff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #105BD8;
  border: none;
  color: white;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #0b5ed7;
  }
`;

const BottomText = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;

  a {
    color: #ccc;
    text-decoration: underline;

    &:hover {
      color: #fff;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, contraseña: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.usuario.id);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        alert("Inicio de sesión exitoso");
        navigate("/");
      } else {
        alert(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error inesperado, intenta más tarde");
    }
  };

  return (
    <Container>
      <Form>
        <Title>Iniciar sesión</Title>
        <Label>Correo electrónico:</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Contraseña:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LinkButton href="#">¿Olvidaste tu contraseña?</LinkButton>
        <Button onClick={handleLogin}>Ingresar</Button>
        <BottomText>
          ¿No tienes cuenta?{" "}
          <a onClick={() => navigate("/register")}>Regístrate</a>
        </BottomText>
      </Form>
    </Container>
  );
};

export default Login;
