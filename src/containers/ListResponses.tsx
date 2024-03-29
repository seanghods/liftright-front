import { useUser } from "@/UserContext";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ListResponses: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col items-center gap-12 mb-12">
      <h1
        data-aos="fade-down"
        className="text-gradient text-2xl font-black tracking-tighter lg:text-3xl lg:leading-none text-center mt-12"
      >
        All Responses
      </h1>
      {user ? (
        user.responses?.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {user.responses.map((response, index) => {
                    return (
                      <tr
                        onClick={() => navigate(`/response/${response._id}`)}
                        className="hover:bg-gray-800 hover:cursor-pointer"
                        key={index}
                      >
                        <th>{index + 1}</th>
                        <td>{response.createdAt.split("T")[0]}</td>
                        <td>{response.message.slice(0, 100)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div>
            You have no responses yet generated. Please{" "}
            <Link className="text-blue-400 hover:text-blue-300" to="/upload">
              upload a video
            </Link>{" "}
            to generate a response.
          </div>
        )
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

export default ListResponses;