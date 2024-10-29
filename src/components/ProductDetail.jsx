import React, { useState } from "react";
import Header from "../components/Headers";
import Footer from "../components/Footer";
import { useLocation, useParams } from "react-router-dom";
import Review from "./Review";
// import { Link } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const [showReview, setShowReview] = useState(false);
  const location = useLocation();

  // Gunakan useParams untuk menangkap ID produk dari URL
  const { id } = useParams();

  //   Temukan produk yang sesuai berdasarkan ID yang diterima
  const selectedProduct = products.find(
    (product) => product.id === parseInt(id)
  );

  const description = location.state
    ? location.state.description
    : selectedProduct.description;

  if (!selectedProduct) {
    return <div>Produk tidak ditemukan</div>;
  }

  return (
    <>
      <Header />
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden pb-40">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-2xl title-font text-white tracking-widest">
                {selectedProduct.category}
              </h2>
              <h1 className="text-gray-500 text-sm title-font font-medium mb-4">
                {selectedProduct.title}
              </h1>
              <div className="flex mb-4 text-white">
                <button
                  onClick={() => setShowReview(false)}
                  className={`flex-grow border-b-2 hover:border-indigo-500 text-lg px-1 ${
                    !showReview ? "border-indigo-500" : "border-gray-800"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setShowReview(true)}
                  className={`flex-grow border-b-2 border-gray-800 py-2 text-lg hover:border-indigo-500 ${
                    showReview ? "border-indigo-500" : ""
                  }`}
                >
                  Reviews
                </button>
              </div>
              <div className={!showReview ? "block" : "hidden"}>
                <p className="leading-relaxed mb-4">
                  {selectedProduct.description}
                </p>
                <div className="text-center pb-4">
                  <p>{description}</p>
                </div>
                <div className="flex border-t border-gray-800 py-2">
                  <span className="text-gray-500"></span>
                  <span className="ml-auto text-white">
                    {selectedProduct.size}
                  </span>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-white">
                    {selectedProduct.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Order Now
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5 hover:text-gray-700"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={showReview ? "block" : "hidden"}>
                {showReview && <Review />}
              </div>
              {/* ... Informasi detail produk lainnya ... */}
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-50 lg:h-auto h-50 object-cover object-center rounded"
              src={selectedProduct.imageSrc}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetail;
