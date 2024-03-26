import { Sample, FAQ, Feature, Hero, Pricing } from "@/components";
import React from "react";

const Landing: React.FC = () => {
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
