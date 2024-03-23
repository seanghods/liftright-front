import feature1Image from "@/assets/landing/feature-1.png";
import feature2Image from "@/assets/landing/feature-2.png";
import { Badge } from "react-daisyui";

export const Feature = () => {
  return (
    <section className="relative py-8 lg:py-20" id="features">
      <div className="absolute start-[10%] z-0">
        <div className="pointer-events-none aspect-square w-60 rounded-full bg-gradient-to-r from-primary/10 via-violet-500/10 to-purple-500/10 blur-3xl [transform:translate3d(0,0,0)] lg:w-[600px]"></div>
      </div>

      <div className="container">
        <div className="flex flex-col items-center">
          <h2 className="inline text-4xl font-semibold">Real-Time Insights</h2>

          <p className="mt-4 text-lg sm:text-center">
            Upload a video and have specific, personalized feedback within
            seconds.
          </p>
          <p className="mt-4 text-lg sm:text-center">
            LiftRight gives you initial-lift, mid-lift, and ending-lift
            positional feedback.
          </p>
        </div>

        <div className="relative z-[2] mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl">
            <img
              alt="saas img"
              className="overflow-hidden rounded-ss-lg"
              src={feature1Image}
            />
          </div>

          <div className="lg:mt-8">
            <Badge color="primary">Identify</Badge>
            <h3 className="mt-2 text-3xl font-semibold">
              Exercise Identification
            </h3>
            <p className="mt-2 text-base font-medium">
              Whether you're working on bench press, deadlift, squat, snatch, or
              any other exercise. LiftRight can identify the workout and give
              you exercise-specific feedback.
            </p>

            <ul className="mt-4 list-inside list-disc text-base">
              <li>Bodybuilding</li>
              <li>Powerlifting</li>
              <li>Olympic Lifting</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
          <div>
            <Badge color={"primary"}>Analysis</Badge>
            <h3 className="mt-2 text-3xl font-semibold">
              Holistic & Isolated Feedback
            </h3>
            <p className="mt-2 text-base">
              LiftRight analyzes your overall form, as well as looks at
              particular points of concern to improve your form. These include:
            </p>

            <ul className="mt-4 list-inside list-disc text-base">
              <li>Posture</li>
              <li>Grip</li>
              <li>Foot Placement</li>
              <li>Back Alignment</li>
              <li>Path of the Bar / Dumbbells</li>
            </ul>
          </div>

          <div className="order-first lg:order-last">
            <div className="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl">
              <img
                alt="saas img"
                className="overflow-hidden rounded-ss-lg"
                src={feature2Image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
