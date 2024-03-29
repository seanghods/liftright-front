import { useUser } from "@/UserContext";
import PaymentForm from "@/components/sub-components/PaymentForm";
import React from "react";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  const { user } = useUser();
  return (
    <div className="container flex flex-col items-center gap-12 mb-12">
      <h1
        data-aos="fade-down"
        className="text-gradient text-2xl font-black tracking-tighter lg:text-3xl lg:leading-none text-center mt-12"
      >
        Profile
      </h1>
      {user ? (
        <>
          <div>Email: {user?.email}</div>
          <div>Credits: {user?.credits || 0}</div>
          <div className="w-2/3 md:w-1/3">
            <PaymentForm alternative={true} />
          </div>
        </>
      ) : (
        <>
          <div>
            You are not logged in. Please{" "}
            <Link className="text-blue-400 hover:text-blue-300" to="/log-in">
              log in
            </Link>{" "}
            to continue.
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
