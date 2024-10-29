import React from "react";
import Header from "../components/Headers";

const NoPages = () => {
  return (
    <>
      <Header />
      <section className="text-gray-400 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="/error40.jpeg"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black">
              404 Not Found
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default NoPages;
