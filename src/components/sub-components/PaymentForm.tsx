import { useUser } from "@/UserContext";
import { API_ROUTES } from "@/utils/constants";
import React from "react";

const PaymentForm: React.FC = () => {
  const { user } = useUser();
  const createCheckoutSession = async (type: string) => {
    const response = await fetch(API_ROUTES.createCheckoutSession, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });
    const { url } = await response.json();
    if (url) window.location.href = url;
  };
  return (
    <>
      <div data-aos="fade-left ">
        <div className="space-y-1 text-black my-3">
          <h3 className="text-sm">Purchase 1 Credit for $5:</h3>
          <div className="w-full flex justify-center">
            <button
              onClick={() => createCheckoutSession("one")}
              className="btn mt-3 btn-sm"
            >
              Purchase
            </button>
          </div>
        </div>
        <div className="border-t-2 space-y-1 text-black py-3">
          <h3 className="text-sm">Purchase 5 Credits for $20:</h3>
          <div className="w-full flex justify-center">
            <button
              onClick={() => createCheckoutSession("five")}
              className="btn btn-sm btn-primary mt-3"
            >
              Purchase
            </button>
          </div>
        </div>{" "}
        <div className="border-t-2 space-y-1 text-black py-3">
          <h3 className="text-sm">Purchase 15 Credit for $50:</h3>
          <div className="w-full flex justify-center">
            <button
              onClick={() => createCheckoutSession("fifteen")}
              className="btn btn-sm border-0 mt-3"
            >
              Purchase
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-500 w-[200px] mt-6">
          You will be redirected to Stripe to complete payment.
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
