import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from '../atoms/Logout';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  background-color: #fff;
  padding: 60px 20px;
`;

const Form = styled.div`
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #000;
  margin-bottom: 30px;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
`;

const FieldGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 15px;
  border: 1px solid #aaa;
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #666;
  &:disabled {
    background-color: #f0f0f0;
    color: #999;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 30px;
  align-items: flex-start;
`;

const Button = styled.button`
  background-color: #105BD8;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #0a49b8;
  }
`;

const Profile = () => {
  const navigate = useNavigate(); 
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPerfil = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/usuarios/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al obtener perfil");
        const data = await res.json();
        setUsuario({ nombre: data.nombre, correo: data.correo, contraseña: "" });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [token, navigate]);

  const handleGuardar = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuario),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Error al actualizar perfil");
        return;
      }

      alert("Perfil actualizado correctamente");
      setEditando(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar perfil");
    }
  };

  if (loading) return <div>Cargando perfil...</div>;

  return (
    <Container>
      <Form>
        <Title>Perfil</Title>
        <AvatarContainer>
          <Avatar src="/src/assets/img/User.png" alt="avatar" />
        </AvatarContainer>

        <FieldGroup>
          <Label>Nombre completo:</Label>
          <Input
            type="text"
            name="nombre"
            value={usuario.nombre}
            disabled={!editando}
            onChange={(e) =>
              setUsuario({ ...usuario, [e.target.name]: e.target.value })
            }
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Correo electrónico:</Label>
          <Input
            type="email"
            name="correo"
            value={usuario.correo}
            disabled={!editando}
            onChange={(e) =>
              setUsuario({ ...usuario, [e.target.name]: e.target.value })
            }
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Contraseña:</Label>
          <Input
            type="password"
            name="contraseña"
            placeholder={editando ? "Nueva contraseña" : "********"}
            value={usuario.contraseña}
            disabled={!editando}
            onChange={(e) =>
              setUsuario({ ...usuario, [e.target.name]: e.target.value })
            }
          />
        </FieldGroup>

        <ButtonContainer>
          {editando ? (
            <>
              <Button onClick={handleGuardar}>Guardar cambios</Button>
              <Button
                style={{ marginLeft: "10px", backgroundColor: "#999" }}
                onClick={() => {
                  setEditando(false);
                  setUsuario({ ...usuario, contraseña: "" });
                }}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditando(true)}>Editar perfil</Button>
          )}
          <LogoutButton />
        </ButtonContainer>

      </Form>
    </Container>
  );
};

export default Profile;