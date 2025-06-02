import React from 'react';
// // import './ArtCollection.css'; 

const ArtCollection = () => {
  const cardsData = [
    {
      bgColor: "#d0eaff",
      imgSrc: "https://storage.googleapis.com/a1aa/image/43422710-d441-4c9e-da0f-e3cc49b7b693.jpg",
      price: "Rs. 499",
      alt: "Golden Era Painting in a light blue background frame",
    },
    {
      bgColor: "#ffd9d0",
      imgSrc: "https://storage.googleapis.com/a1aa/image/3e45ef31-017b-4b5f-54c6-a9a48c74d3d7.jpg",
      price: "Rs. 699",
      alt: "Golden Era Painting in a light peach background frame",
    },
    {
      bgColor: "#e6d7ff",
      imgSrc: "https://storage.googleapis.com/a1aa/image/8adc7060-87a4-448c-c071-16b9fdc24197.jpg",
      price: "Rs. 399",
      alt: "Golden Era Painting in a light purple background frame",
    },
    {
      bgColor: "#d9ffd0",
      imgSrc: "https://storage.googleapis.com/a1aa/image/b13baf1a-443c-4048-5f37-58bd0608c2b7.jpg",
      price: "Rs. 299",
      alt: "Golden Era Painting in a light green background frame",
    },
    {
      bgColor: "#d0eaff",
      imgSrc: "assets/website-images/kunalCEO-preview (1).jpg",
      price: "Rs. 499",
      alt: "Golden Era Painting in a light blue background frame",
    },
    {
      bgColor: "#ffd9d0",
      imgSrc: "/assets/website-images/terms/howtosuccessfulstudent.jpg",
      price: "Rs. 499",
      alt: "Golden Era Painting in a light peach background frame",
    },
    {
      bgColor: "#e6d7ff",
      imgSrc: "https://storage.googleapis.com/a1aa/image/8adc7060-87a4-448c-c071-16b9fdc24197.jpg",
      price: "Rs. 299",
      alt: "Golden Era Painting in a light purple background frame",
    },
    {
      bgColor: "#d9ffd0",
      imgSrc: "https://storage.googleapis.com/a1aa/image/b13baf1a-443c-4048-5f37-58bd0608c2b7.jpg",
      price: "Rs. 399",
      alt: "Golden Era Painting in a light green background frame",
    },
  ];

  const Card = ({ bgColor, imgSrc, price, alt }) => {
    return (
      <article className="mb-4">
        <div 
          className="position-relative p-3 rounded" 
          style={{ backgroundColor: bgColor }}
        >
          <img
            src={imgSrc}
            alt={alt}
            className="img-fluid rounded"
            style={{ width: '100%' }}
          />
          <button
            aria-label="Add to favorites"
            className="position-absolute top-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '24px', height: '24px', margin: '8px', border: 'none' }}
          >
            {/* <FontAwesomeIcon icon={farHeart} style={{ color: '#6c757d', fontSize: '12px' }} /> */}
          </button>
        </div>
        <p className="text-muted mb-1" style={{ fontSize: '9px', fontWeight: '600' }}>Highly Rated</p>
        <p className="text-muted mb-1" style={{ fontSize: '9px' }}>Owned by Celebrated Classics</p>
        <h3 className="h6 fw-bold mt-1">Golden Era Paintings</h3>
        <p className="text-muted d-flex align-items-center gap-1 mt-1" style={{ fontSize: '12px' }}>
          {/* <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107', fontSize: '10px' }} />
          4.8(120 Reviews) */}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fw-semibold" style={{ fontSize: '12px' }}>{price}</span>
        </div>
        <div className="d-flex gap-2 mt-2">
          <button 
            className="btn btn-outline-dark rounded-pill" 
            style={{ fontSize: '9px', padding: '2px 8px' }}
          >
            ADD TO CART
          </button>
          <button 
            className="btn btn-dark rounded-pill fw-bold" 
            style={{ fontSize: '9px', padding: '2px 8px' }}
          >
            BUY NOW
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="bg-white d-flex flex-column align-items-center px-4 py-5 min-vh-100">
      <p className="fst-italic text-center text-secondary mb-5" style={{ maxWidth: '700px' }}>
        Explore paintings, sculptures, vintage pieces, and exclusive
        collections from around the world.
      </p>
      
      <nav className="d-flex justify-content-center flex-wrap gap-3 mb-5">
        <a href="#" className="text-decoration-none text-danger fw-semibold" style={{ fontSize: '12px' }}>
          Photoshop
        </a>
        <a href="#" className="text-decoration-none text-secondary fw-semibold" style={{ fontSize: '12px' }}>
          Best of Behance
        </a>
        {/* ... other nav links */}
      </nav>
      
      <div className="row g-4 mb-5" style={{ maxWidth: '1200px' }}>
        {cardsData.map(({ bgColor, imgSrc, price, alt }, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Card
              bgColor={bgColor}
              imgSrc={imgSrc}
              price={price}
              alt={alt}
            />
          </div>
        ))}
      </div>
      
      <button 
        className="btn btn-outline-secondary rounded-1 px-4 py-2 fw-semibold"
        style={{ borderColor: '#8b7f6a', color: '#8b7f6a' }}
      >
        View Collection
      </button>
    </div>
  );
};

export default ArtCollection;