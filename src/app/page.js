import Catalog from "./components/catalog/Catalog";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Catalog />
      <Footer />
    </div>
  );
};