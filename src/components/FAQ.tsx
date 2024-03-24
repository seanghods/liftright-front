import { Collapse } from "react-daisyui";

export const FAQ = () => {
  return (
    <section className="py-8 lg:py-20" id="faq">
      <div className="container">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-base-content text-gradient-light">
            FAQs
          </h2>
          <p className="mt-2 text-lg">
            Understand more regarding the use of LiftRight AI and Pricing.
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-6">
          <div className="space-y-4 lg:w-1/2">
            <Collapse className="border border-base-content/10" icon="arrow">
              <Collapse.Title className="text-xl font-medium">
                Why is it expensive?
              </Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  LiftRight takes considerably more resources to parse videos,
                  analyze the frames, and return personalized feedback. This
                  comes at a direct cost to us, which factors into the pricing.
                  This is also why we cannot provide free trials.
                </p>
              </Collapse.Content>
            </Collapse>
            <Collapse className="border border-base-content/10" icon="arrow">
              <Collapse.Title className="text-xl font-medium">
                What requirements are there for uploading my video?
              </Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  Video length must be 20 seconds or less. Videos must be in an
                  .mov or .mp4 format. For optimal analysis, ensure you and your
                  exercise is able to be clearly seen in the video.
                </p>
              </Collapse.Content>
            </Collapse>
            <Collapse className="border border-base-content/10" icon="arrow">
              <Collapse.Title className="text-xl font-medium">
                What does LiftRight know and how?
              </Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  LiftRight is trained on a wide variety of widely-accepted
                  sources on weightlifting, including fitness manuals, expert
                  articles, and scientific studies. This allows LR to provide
                  feedback on best practices, common mistakes, and safety tips
                  for common exercises.
                </p>
              </Collapse.Content>
            </Collapse>

            <Collapse className="border border-base-content/10" icon="arrow">
              <Collapse.Title className="text-xl font-medium">
                How are payments handled?
              </Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  All payment processing is securely handled by Stripe. We do
                  not store or have access to your credit card information. For
                  more information on how Stripe protects your payment
                  information, please visit{" "}
                  <a
                    href="https://stripe.com/docs/security"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500"
                  >
                    Stripe&apos;s Security Page.
                  </a>
                </p>
              </Collapse.Content>
            </Collapse>

            <Collapse className="border border-base-content/10" icon="arrow">
              <Collapse.Title className="text-xl font-medium">
                How is data security handled on your platform?
              </Collapse.Title>
              <Collapse.Content>
                <p className="text-base">
                  We prioritize data security. Our platform employs encryption,
                  access controls, and industry-leading database storage to
                  safeguard your data. We comply with industry standards to
                  ensure your information is secure.
                </p>
              </Collapse.Content>
            </Collapse>
          </div>
        </div>
      </div>
    </section>
  );
};
