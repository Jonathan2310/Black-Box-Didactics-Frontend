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

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #105bd8;
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
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      alert("El formato del correo electrónico no es válido.");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          correo: email,
          contraseña: password,
          confirmarContraseña: form.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuario registrado exitosamente");
        localStorage.setItem("auth", "true");
        navigate("/");
      } else {
        alert(data.error || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Ocurrió un error inesperado");
    }
  };

  return (
    <Container>
      <Form>
        <Title>Crear cuenta</Title>

        <Label>Nombre completo:</Label>
        <Input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Label>Correo electrónico:</Label>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Label>Contraseña:</Label>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <Label>Confirmar contraseña:</Label>
        <Input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <Button onClick={handleRegister}>Registrarse</Button>

        <BottomText>
          ¿Ya tienes cuenta?{" "}
          <a onClick={() => navigate("/login")}>Inicia sesión</a>
        </BottomText>
      </Form>
    </Container>
  );
};

export default Register;
