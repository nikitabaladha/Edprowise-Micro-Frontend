import React from "react";

const EdprowiseTalkSection = () => {
  
  return (
    <section className="wpo-choose-section-s2 section-padding pt-3 pb-3 " style={{background:"#fafaff"}} >
    <div className="container edprowise-choose-container">
      {/* <div className="row"  >
        <div className="col-12">
          <div className="wpo-section-title-s2">
            <h2 className="font-family-web">Edprowise Talk</h2>
          </div>
        </div>
      </div> */}
      <div className="right-img mb-0 ">
        
           <iframe
        width="100%"
        height="325"
        src="https://www.youtube.com/embed/KzMNx8h7RbY?si=7eEmdFNCVHPkdYBp"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      </div>
      
    </div>
  </section>
  );
};

export default EdprowiseTalkSection;
