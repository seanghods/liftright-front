import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "LiftRight - Page Not Found";
  }, []);
  return (
    <>
      <div className="flex-1">
        <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl px-4 items-center gap-12 md:px-8 flex-1">
          <div className="md:mb-24 space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
            <h1 className="text-gradient font-bold text-4xl">404</h1>
            <h2 className="text-gradient font-bold text-3xl">Page Not Found</h2>
          </div>
          <div className="text-gradient w-full text-center font-bold text-xl flex flex-col gap-12 items-center justify-center my-12 md:my-0">
            <div>Error - this page does not exist.</div>
            <div className="w-[200px]">
              <Link to="/">
                <button className="btn btn-primary my-20">Return Home</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NotFound;
