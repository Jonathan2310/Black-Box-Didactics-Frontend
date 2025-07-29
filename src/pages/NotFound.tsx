import styled from "styled-components";
import TextRubik from "../components/atoms/TextRubik"; 
import Header from "../components/organism/Header";
import Footer from "../components/organism/Footer"

const StyledDiv = styled.div`
  height: 90vh;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

function NotFound() {
  return (
    <>
      <Header />
      <StyledDiv>
        <TextRubik size="24px" weight="600" color="#212121" align="center" as="h1">
          Error 404: Página no encontrada
        </TextRubik>
      </StyledDiv>

      <Footer/>
    </>
    
  );
}


export default NotFound;
