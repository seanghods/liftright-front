import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import landingVid from "../assets/landing/landing-vid3.mov";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="py-8 lg:py-20" id="home">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-2">
          <div data-aos="fade-right">
            <h1 className="text-4xl font-black tracking-tighter lg:text-6xl lg:leading-none">
              Upgrade your weightlifting form with
              <span className="text-gradient"> LiftRight </span>
              AI.
            </h1>
            <p className=" mt-8 text-lg">
              Hiring a personal trainer is hard. And expensive.{" "}
            </p>
            <p className=" mt-8 text-lg">
              Utilize our state-of-the-art Vision AI & GPTs to analyze your
              weightlifting form and offer feedback and advice. Upload a video
              and LiftRight will analyze it directly and return improvements.
            </p>
            <div className="mt-16 inline-flex gap-3">
              <Button color="primary">Get Started</Button>
              <Button color="ghost">Learn More</Button>
              <Button onClick={() => navigate("/upload")} color="ghost">
                Upload
              </Button>
            </div>
          </div>

          <div>
            <div
              data-aos="fade-left"
              className="h-full flex flex-col justify-center"
            >
              {/* <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-sky-400 to-indigo-900 p-2"> */}
              <video
                width="100%"
                height="auto"
                autoplay="true"
                className="rounded-lg"
                muted
                loop
              >
                <source src={landingVid} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* </div> */}
          </div>
        </div>

        {/* <h2 className="mt-12 text-center text-2xl font-semibold text-base-content/60 lg:mt-32">
          Our Partners
        </h2>

        <div className="mt-12 grid grid-cols-2 justify-center gap-8 sm:grid-cols-3 md:grid-cols-5">
          <img
            className="mx-auto h-8 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0"
            src={googleImage}
            alt="google logo"
          />
          <img
            className="mx-auto h-6 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0"
            src={microsoftImage}
            alt="microsoft logo"
          />
          <img
            className="mx-auto hidden h-6 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0 md:inline"
            src={netflixImage}
            alt="netflix logo"
          />
          <img
            className="mx-auto hidden h-8 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0 md:inline"
            src={spotifyImage}
            alt="spotify logo"
          />
          <img
            className="mx-auto hidden h-8 cursor-pointer grayscale transition-all duration-500 hover:grayscale-0 sm:inline"
            src={paypalImage}
            alt="paypal logo"
          />
        </div> */}
      </div>
    </section>
  );
};
