import React from "react";

const Review = () => {
  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-12">
          <div className="flex flex-wrap mt-2">
            <div className="lg:w-1/2 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <div className="w-12 h-12 mx-auto mb-8 rounded-full overflow-hidden">
                  <img
                    alt="testimonial"
                    className="object-cover object-center w-full h-full"
                    src="/elara.jpg"
                  />
                </div>
                <span className="inline-block h-0.5 w-10 rounded bg-indigo-500 mt-6 mb-2"></span>
                {/* Mengurangi tebal span */}
                <h2 className="text-white font-medium title-font tracking-wider text-sm">
                  Bules
                </h2>
                <p className="text-gray-500">Senior Product Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
