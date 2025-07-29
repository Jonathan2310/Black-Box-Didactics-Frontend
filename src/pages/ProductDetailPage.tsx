import Header from "../components/organism/Header";
import ProductDetail from "../components/organism/ProductDetail";
import UserReviewsSection from "../components/organism/UserReviewsSection";
import RelatedProductsSection from "../components/organism/RelatedProductsSection";
import Footer from "../components/organism/Footer";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();
  const categoria = "Didactics";

  return (
    <>
      <Header />
      <ProductDetail />
      <UserReviewsSection/>
      <RelatedProductsSection categoria={categoria} idProducto={Number(id)} />
      <Footer />
    </>
  );
}
