import { useUser } from "@/UserContext";
import React from "react";
import { Button, Input } from "react-daisyui";
import { Link } from "react-router-dom";
import { xSvg } from "./sub-components/Icons";

type Props = {
  fullLoadingPage: boolean;
};

export const Footer: React.FC<Props> = ({ fullLoadingPage }) => {
  const { user } = useUser();
  return (
    <footer className="bg-neutral text-neutral-content" data-theme="dark">
      <div className="grid lg:grid-cols-[1.5fr,1fr]">
        <div>
          <div className="md-12  p-8 sm:p-10 md:px-16 xl:px-40 xl:py-16">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              <div className="flex flex-col gap-5">
                <h2 className="text-xl font-medium">LiftRight</h2>
                <div className="space-y-2">
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="/"
                    >
                      Landing
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="#"
                    >
                      Our Team
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="#"
                    >
                      Blogs
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="/#faq"
                    >
                      FAQs
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="text-xl font-medium">Quick Links</h2>
                <div className="space-y-2">
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="/#sample"
                    >
                      Sample
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="/#features"
                    >
                      Features
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="/#pricing"
                    >
                      Pricing
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="text-xl font-medium">Connecting</h2>
                <div className="space-y-2">
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="/contact-us"
                    >
                      Contact Us
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="/contact-us"
                    >
                      Support
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="text-base transition-all duration-500 hover:text-primary"
                      to="/terms-of-service"
                    >
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {fullLoadingPage ? (
          <div className="skeleton md-12 p-8 sm:m-10 md:mx-16 xl:mx-20 xl:my-16"></div>
        ) : user ? (
          <div className="order-first lg:order-last">
            <div className="md-12 p-8 sm:p-10 md:px-16 xl:px-20 xl:py-16">
              <h2 className="mt-4 text-3xl font-medium text-gradient">
                LiftRight AI
              </h2>
              <div className="mt-4 space-y-2">
                <div>
                  <div className="form-control w-full lg:max-w-xs">
                    <div>
                      Follow us on X:{" "}
                      <a
                        className="pl-2 text-blue-400 hover:brightness-125"
                        href="https://twitter.com/liftrightai"
                        target="_blank"
                        rel="noreferrer"
                      >
                        LiftRight AI on {xSvg()}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="order-first lg:order-last">
            <form className="md-12 p-8 sm:p-10 md:px-16 xl:px-20 xl:py-16">
              <h2 className="mt-4 text-3xl font-medium">
                Help to get started?
              </h2>
              <div className="mt-4 space-y-2">
                <div>
                  <div className="form-control w-full lg:max-w-xs">
                    <label className="label" htmlFor="email">
                      <span className="label-text">Email</span>
                    </label>
                    <Input
                      autoComplete="email"
                      id="email"
                      className="input join-item input-bordered w-full lg:max-w-xs"
                      placeholder="name@site.com"
                      type="email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button color="primary">Register</Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </footer>
  );
};
