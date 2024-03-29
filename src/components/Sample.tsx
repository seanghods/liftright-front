import React from "react";
import example from "../assets/landing/example.mov";
import Typewriter from "typewriter-effect";
import { Badge } from "react-daisyui";

export const Sample: React.FC = () => {
  return (
    <section className="relative py-8" id="sample">
      <div className="absolute start-[10%] z-0">
        <div className="pointer-events-none aspect-square w-60 rounded-full bg-gradient-to-r from-primary/10 via-violet-500/10 to-purple-500/10 blur-3xl [transform:translate3d(0,0,0)] lg:w-[600px]"></div>
      </div>

      <div className="container">
        <div data-aos="fade-up" className="flex flex-col items-center">
          <h2 className="inline text-gradient-light text-4xl font-semibold">
            Real-Time Form Insights
          </h2>

          <p className="mt-4 text-lg sm:text-center">
            Upload a video and have specific, personalized feedback within
            seconds.
          </p>
          <p className="mt-4 text-lg sm:text-center">
            LiftRight gives you initial-lift, mid-lift, and ending-lift
            positional feedback.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="relative z-[2] mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12"
        >
          <div className="w-full flex justify-center">
            <div className="w-4/5 overflow-hidden rounded-lg shadow-md transition-all hover:shadow-xl">
              {/* <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-sky-400 to-indigo-900 p-2"> */}
              <video
                width="100%"
                height="auto"
                autoPlay
                className="rounded-lg"
                muted
                loop
                playsInline
              >
                <source src={example} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="lg:mt-8">
            <Badge className="hidden md:block" color="primary">
              Examine
            </Badge>
            <h3 className="my-2 text-3xl font-semibold">Analysis</h3>
            <Typewriter
              options={{ delay: 6, cursor: "#" }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("")
                  .typeString(
                    `It appears you're performing a series of bicep curls with dumbbells. Let's look at your form across the three stages: initial lift, mid-lift, and final position of the lift.<br /><br />`
                  )
                  .typeString("<strong>Initial Lift:</strong><br />")
                  .typeString(
                    `In the initial lift, you’re starting with the dumbbells at your sides. Your grip seems to be neutral, which is good for targeting the brachialis along with the biceps. A potential area of concern is the stance; ensure your feet are shoulder-width apart to maintain balance. Your shoulder positioning looks relaxed and not elevated, which is proper form for a bicep curl.<br /><br />`
                  )
                  .typeString(`<strong>Mid-lift:</strong><br />`)
                  .typeString(
                    `As you move into the curl, the path of the bar (dumbbells in this case) should be vertical. Avoid swinging the weights or using momentum to lift them, which it looks like you might be doing slightly. Focus on slow, controlled movements, keeping your elbows stationary and only moving your forearms. Any swaying in the torso should be minimized – the core should be activated to stabilize the body during the lift...<br />`
                  )
                  .typeString("<strong>...</strong>")
                  .start();
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
