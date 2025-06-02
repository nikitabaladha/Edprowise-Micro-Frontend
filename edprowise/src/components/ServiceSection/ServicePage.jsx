import ServiceMainSection from "./ServiceMainSection.jsx";

const ServicePage = () => {
  return (
    <>
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Services</h2>
                <ol className="wpo-breadcumb-wrap">
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>Services</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="assets/website-images/shape/1.svg" alt="" />
        </div>
        <div className="shape-2">
          <img src="assets/website-images/shape/2.svg" alt="" />
        </div>
        <div className="shape-3">
          <img src="assets/website-images/shape/3.svg" alt="" />
        </div>
        <div className="shape-4">
          <img src="assets/website-images/shape/4.svg" alt="" />
        </div>
      </section>
      <ServiceMainSection />
    </>
  );
};

export default ServicePage;
