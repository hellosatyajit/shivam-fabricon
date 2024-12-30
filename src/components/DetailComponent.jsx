import React, { useState } from "react";

const DetailComponent = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesInModal, setImagesInModal] = useState([]);

  const openModal = (images, index) => {
    setImagesInModal(images);
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < imagesInModal.length - 1 ? prevIndex + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imagesInModal.length - 1
    );
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div class="space-y-2 col-span-6 mb-16">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 lg:mb-0 mb-4">
          {data.title}
        </h1>
        <p class="text-gray-600 lg:max-w-lg">{data.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(data.images) ? (
          data.images.map((img, imgIndex) => (
            <div
              key={imgIndex}
              className="flex items-center justify-center border bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() =>
                openModal(
                  data.images.map((img) => img.src),
                  imgIndex
                )
              }
            >
              <img
                src={img.src}
                alt={data.alt || `Image for ${data.title}`}
                className="object-cover rounded-lg w-full h-40 lg:h-48 hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))
        ) : (
          <div
            className="flex items-center justify-center border bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => openModal([item.images], 0)}
          >
            <img
              src={data.images.src}
              alt={data.images.alt || `Image for ${data.title}`}
              className="object-cover rounded-lg w-full h-64 lg:h-80 hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg w-[70%] h-[70%] max-w-4xl max-h-4xl flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white bg-[#072F6A] rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800"
              onClick={closeModal}
            >
              ✕
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300"
              onClick={prevImage}
            >
              <img src="/leftarrowgallery.svg" alt="Previous" />
            </button>

            <img
              src={imagesInModal[currentImageIndex]}
              alt="Gallery Image"
              className="max-w-full max-h-full object-contain"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300"
              onClick={nextImage}
            >
              <img src="/rightarrowgallery.svg" alt="Next" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailComponent;
