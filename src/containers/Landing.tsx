import { Sample, FAQ, Feature, Hero, Pricing } from "@/components";
import React, { useEffect } from "react";

const Landing: React.FC = () => {
  useEffect(() => {
    document.title = "LiftRight";
  }, []);
  return (
    <>
      <Hero />
      <Sample />
      <Feature />
      <Pricing />
      <FAQ />
    </>
  );
};

export default Landing;
