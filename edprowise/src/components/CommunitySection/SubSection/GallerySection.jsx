import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js";

const GallerySection = () => {
  const [shuffledItems, setShuffledItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const portfolioItems = [
    { id: 1, image: "/assets/website-images/portfolio/11.webp" },
    { id: 2, image: "/assets/website-images/portfolio/12.webp" },
    { id: 3, image: "/assets/website-images/portfolio/13.webp" },
    { id: 4, image: "/assets/website-images/portfolio/14.webp" },
    { id: 5, image: "/assets/website-images/portfolio/15.png" },
    { id: 6, image: "/assets/website-images/portfolio/16.png" },
    { id: 7, image: "/assets/website-images/portfolio/17.png" },
    { id: 8, image: "/assets/website-images/portfolio/18.png" },
    { id: 9, image: "/assets/website-images/portfolio/19.png" },
    { id: 10, image: "/assets/website-images/portfolio/20.png" },
    { id: 11, image: "/assets/website-images/portfolio/21.png" },
    { id: 12, image: "/assets/website-images/portfolio/22.png" },
    { id: 13, image: "/assets/website-images/portfolio/23.png" },
    { id: 14, image: "/assets/website-images/portfolio/24.png" },
    { id: 15, image: "/assets/website-images/portfolio/25.png" },
    { id: 16, image: "/assets/website-images/portfolio/26.png" },
    { id: 17, image: "/assets/website-images/portfolio/27.png" },
  ];

  // Function to shuffle the images
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Shuffle the portfolio items when the component mounts
    setShuffledItems(shuffleArray([...portfolioItems]));
  }, []);

  // Handle image click to show in the modal
  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <section className="wpo-portfolio-section section-padding">
      <h2 className="hidden">hidden</h2>
      <div className="container">
        <div className="sortable-gallery">
          <div className="gallery-filters"></div>
          <div className="row">
            <div className="col-lg-12">
              <div className="portfolio-grids gallery-container clearfix">
                {shuffledItems.map((item) => (
                  <div className="grid-web" key={item.id}>
                    <div className="img-holder-web">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          handleImageClick(item.image);
                        }}
                        className="fancybox"
                        data-fancybox-group="gall-1"
                      >
                        <img
                          src={item.image}
                          alt="Portfolio"
                          className="img img-responsive"
                        />
                        <div className="hover-content hover-content-web">
                          <FaPlus />
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="image-modal">
          <div className="modal-contentt">
            <img src={modalImage} alt="Modal" className="modal-image" />
            <div className="modal-close" onClick={closeModal}>
              <IoIosCloseCircleOutline />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
