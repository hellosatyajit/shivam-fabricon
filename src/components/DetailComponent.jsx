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

  const getYouTubeEmbedUrl = (url) => {
    // Extract the YouTube video ID from the URL
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="space-y-2 col-span-6 mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 lg:mb-0 mb-4">
          {data.title}
        </h1>
        <p className="text-gray-600 lg:max-w-lg pb-8">{data.shortDescription}</p>
        {data.shortDescription && (
          <p className="text-gray-500 italic">{data.longDescription}</p>
        )}
      </div>

      {/* YouTube Video Section */}
      {data.videoUrl && (
        <div className="mb-8">
          <iframe
            src={getYouTubeEmbedUrl(data.videoUrl)}
            title="YouTube Video"
            className="w-full h-64 lg:h-96 rounded-lg shadow-md"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

     
      <div className="py-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            onClick={() => openModal([data.images.src], 0)}
          >
            <img
              src={data.images.src}
              alt={data.images.alt || `Image for ${data.title}`}
              className="object-cover rounded-lg w-full h-64 lg:h-80 hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>
      {data.testimonials && data.testimonials.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What People Are Saying</h2>
          <div className="space-y-6">
            {data.testimonials.map((testimonial, index) => (
              <div key={index} className="flex items-start space-x-4">
                {testimonial.imageSrc && (
                  <img
                    src={testimonial.imageSrc}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="mt-2">{testimonial.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
              <svg
                fill="#072F6A"
                height="30px"
                width="30px"
                viewBox="0 0 330 330"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001 l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996 C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z" />
              </svg>
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
              <svg
                fill="#072F6A"
                height="30px"
                width="30px"
                viewBox="0 0 330.002 330.002"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailComponent;
