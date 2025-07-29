import React, { useEffect ,useState } from "react";
import { Text } from "../atoms/Text";
import { Search, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductCard from "../molecules/ProductCard";

const SectionContainer = styled.section`
  padding: 30px;
  font-family: "Rubik", sans-serif;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 300px;
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  flex-wrap: wrap;
  gap: 12px;
`;

const SectionButton = styled.button<{ active: boolean }>`
  padding: 0px 60px;
  background-color: ${({ active }) => (active ? "#212121" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-bottom: ${({ active }) =>
    active ? "4px solid #212121" : "4px solid transparent"};
  cursor: pointer;
  font-family: "Rubik";
  height: 100%;
  width: 200px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 32px;
  flex-wrap: wrap;
  gap: 12px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid black;
  border-radius: 25px;
  padding: 8px 16px;
  width: 100%;
  max-width: 400px;

  input {
    border: none;
    outline: none;
    margin-left: 10px;
    width: 100%;
    font-size: 15px;
    font-family: "Inter";
  }
`;

const CartButton = styled.button`
  background-color: #1e40af;
  color: white;
  padding: 18px 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  border: none;
  font-weight: bold;
  font-size: 15px;
  font-family: "Rubik";
  cursor: pointer;

  svg {
    margin-right: 8px;
  }
`;

interface Product {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  categoria?: string;
  precio?: string;
}

const sections = ["Didactics", "Dynamics", "UAVs"];

const ProductMenuSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(() => {
    const sectionFromURL = new URLSearchParams(window.location.search).get("section");
    return sectionFromURL || "Didactics";
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [sectionProducts, setSectionProducts] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetch(`http://localhost:3000/productos/categoria/${activeSection}`)
        .then((res) => res.json())
        .then((data) => {
          setSectionProducts(data);
          setSearchResults([]); 
        })
        .catch((err) => {
          console.error(err);
          setSectionProducts([]);
        });
    }
  }, [activeSection, searchTerm]);

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/productos?section=${section}`);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const response = await fetch(`http://localhost:3000/productos/buscar?query=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Error en la búsqueda");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleGoToCart = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Debes iniciar sesión para ver tu carrito");
      navigate("/login");
      return;
    }
    navigate("/carrito");
  };

  const productsToShow = searchTerm.trim() !== "" ? searchResults : sectionProducts;


  return (
    <SectionContainer>

      <TopRow>
        <LeftColumn>
          <Text font="Rubik" variant="body">
            <strong style={{ fontSize: "24px" }}>Descubre todos nuestros productos</strong>
          </Text>
          <Text font="Inter" variant="caption">
            <i>Explora, compara y elige el que mejor se adapta a tu nivel y objetivos</i>
          </Text>
        </LeftColumn>
        <RightColumn>
          {sections.map((section) => (
            <SectionButton
              key={section}
              active={activeSection === section}
              onClick={() => handleSectionClick(section)}
            >
              {section}
            </SectionButton>
          ))}
        </RightColumn>
      </TopRow>

      <BottomRow>
        <SearchBar>
          <Search size={20} color="#105BD8" />
          <input
            type="text"
            placeholder="Buscar productos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={onKeyPress}
          />
        </SearchBar>

        <CartButton onClick={handleGoToCart}>
          <ShoppingCart size={20} />
          Carrito
        </CartButton>
      </BottomRow>

      {searching && <p>Cargando resultados...</p>}

      {!searching && productsToShow.length === 0 && (
        <p>No se encontraron productos para "{searchTerm}"</p>
      )}

      {!searching && productsToShow.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {productsToShow.map((product) => (
            <ProductCard
              key={product.id}
              title={product.nombre}
              description={product.descripcion || ""}
              image={product.imagen ? `http://localhost:3000/uploads/${product.imagen}` : ""}
              link={`/producto/${product.id}`}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
};

export default ProductMenuSection;