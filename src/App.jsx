import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPages from "./pages/NoPages";
import Product from "./pages/Product";
import ProductDetail from "./components/ProductDetail";
import Review from "./components/Review";
import Cart from "./components/Cart";

import { CartProvider } from "./service/CartContext";

function App() {
  const item = [
    {
      id: 1,
      imageSrc: "/sateayam.jpg",
      category: "Sate Ayam",
      title: "Menu utama",
      price: 20000,
    },
    {
      id: 2,
      imageSrc: "/mieayamm.jpg",
      category: "Mie Ayam",
      title: "Menu utama",
      price: 13000,
    },
    {
      id: 3,
      imageSrc: "/bakso.jpg",
      category: "Bakso",
      title: "Menu utama",
      price: 13000,
    },
    {
      id: 4,
      imageSrc: "/chickendrumsticks.jpg",
      category: "Chicken Drumsticks",
      title: "Menu utama",
      price: 25000,
    },
    {
      id: 5,
      imageSrc: "/soto.jpg",
      category: "Soto Ayam",
      title: "Menu utama",
      price: 15000,
    },
    {
      id: 6,
      imageSrc: "/shrimpandsquid.jpg",
      category: "Shrimp And Squid",
      title: "Menu utama",
      price: 15000,
    },
    {
      id: 7,
      imageSrc: "/nasikebuli.jpg",
      category: "Nasi Kebuli",
      title: "Menu utama",
      price: 15000,
    },
    {
      id: 8,
      imageSrc: "/perkedel.jpg",
      category: "Perkedel",
      title: "Menu utama",
      price: 2500,
    },
    {
      id: 9,
      imageSrc: "/ayambakar.jpg",
      category: "Ayam Bakar",
      title: "Menu utama",
      price: 16000,
    },
    {
      id: 10,
      imageSrc: "/ayampenyet.jpg",
      category: "Ayam Penyet",
      title: "Menu utama",
      price: 16000,
    },
    {
      id: 11,
      imageSrc: "/noodleswithink.jpg",
      category: "Noodles With Ink",
      title: "Menu utama",
      price: 18000,
      description:
        "Noodles with ink sering dianggap sebagai hidangan yang unikdan eksotis, sering ditemukan dalam hidangan masakan Italiadengan pasta hitam atau hidangan Asia yang menggunakan mieputih, Noodles with ink adalah hidangan masakan yangmenggunakan mie atau pasta yang dimasak bersama dengan tintacumi-cumi atau sotong. Tinta cumi-cumi atau sotong seringdigunakan untuk memberikan warna dan rasa pada hidangantersebut",
    },
    {
      id: 12,
      imageSrc: "/saladwithchickenandsesameseeds.jpg",
      category: "Salad Chicken Sesame Seeds",
      title: "Menu utama",
      price: 20000,
    },
  ];

  return (
    <CartProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Product products={item} />} />
            <Route
              path="/productdetail/:id"
              element={<ProductDetail products={item} />}
            />
            <Route path="/review" element={<Review />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<NoPages />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
