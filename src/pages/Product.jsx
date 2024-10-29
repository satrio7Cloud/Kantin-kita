import React, { useEffect, useState } from "react";
import Header from "../components/Headers";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useCart } from "../service/CartContext";

const Product = ({ products }) => {
  const { addToCart, cartCount } = useCart();
  const [showDetail, setShowDetail] = useState(
    Array(products.length).fill(false)
  );
  const delay = 1000;

  const handleOrderNow = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    localStorage.setItem("cartCount", cartCount.toString());
  }, [cartCount]);

  const handleMouseEnter = (index) => {
    setTimeout(() => {
      const updatedShowDetail = [...showDetail];
      updatedShowDetail[index] = true;
      setShowDetail(updatedShowDetail);
    }, delay);
  };

  const handleMouseLeave = (index) => {
    setTimeout(() => {
      const updatedShowDetail = [...showDetail];
      updatedShowDetail[index] = false;
      setShowDetail(updatedShowDetail);
    }, delay);
  };

  return (
    <>
      <Header />
      <section className="text-gray-400 body-font">
        <div className="container px-4 py-2 mx-auto flex text-center">
          <h1 className="md:text-3xl text-2xl font-medium title-font">
            Menu kantin Kita
          </h1>
        </div>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((product, index) => (
              <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                {/* Menggunakan Link untuk mengarahkan ke halaman detail produk */}
                {/* <Link
                  to={{
                    pathname: `/productdetail/${product.id}`,
                    state: { description: product.description },
                  }} // Menambahkan ID produk ke URL
                  className="block relative h-48 rounded overflow-hidden"
                >
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block cursor-pointer"
                    src={product.imageSrc}
                  />
                </Link> */}
                <Link
                  to={{
                    pathname: `/productdetail/${product.id}`,
                    state: { description: product.description },
                  }}
                  className="block relative h-48 rounded overflow-hidden"
                >
                  <div className="relative">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block cursor-pointer"
                      src={product.imageSrc}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                    />
                    {showDetail[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                        <span>Lihat Detail</span>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-600 text-2xl tracking-widest title-font mb-1">
                    {product.category}
                  </h3>
                  <h2 className="title-font text-lg font-medium">
                    {product.title}
                  </h2>
                  <p className="mt-1">
                    {product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                  <button
                    onClick={() => handleOrderNow(product)}
                    className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-2 w-24 focus:outline-none hover:bg-blue-600 rounded"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      {/* Footer */}
    </>
  );
};

export default Product;
