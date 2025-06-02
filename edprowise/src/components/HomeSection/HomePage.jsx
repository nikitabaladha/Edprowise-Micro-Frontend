import HomeMainSection from "./HomeMainSection.jsx";
import Category from "./Category.jsx";
import VisionMissionSection from "./MissionVision.jsx";
import WhyChooseEdProwise from "./WhyChooseEdProwise.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import TestimonialSection from "./Testimonial.jsx";
import EdprowiseTalk from "./EdprowiseTalk.jsx";
import BlogSection from "./BlogSection.jsx";
import FaqContactUsComponent from "./FaqContactUsComponent.jsx";

const HomePage = () => {
  return (
    <>
      <HomeMainSection />
      <Category />
      <VisionMissionSection />
      <WhyChooseEdProwise />
      <WhyChooseUs />
      <TestimonialSection />
      <EdprowiseTalk />
      <BlogSection />
      <FaqContactUsComponent />
    </>
  );
};

export default HomePage;
