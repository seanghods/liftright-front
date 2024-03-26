import { API_ROUTES } from "@/utils/constants";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  setFeedbackSubmitted: (value: boolean) => void;
};

const FeedbackForm: React.FC<Props> = ({ setFeedbackSubmitted }) => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState({
    usefulness: "",
    accuracy: "",
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ROUTES.feedback, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...feedback, id }),
      });
      if (response.ok) {
        setFeedbackSubmitted(true);
      } else {
        // Handle errors or unsuccessful submission
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-12">
      <h2 className="text-xl font-semibold">
        Please let us know how you feel about LiftRight AI's Analysis.
      </h2>
      <div>
        <p className="mt-5 mb-1">I found the AI feedback useful</p>
        <p className="text-sm mb-3">(1 to Least Useful - 5 to Most Useful)</p>
        <div className="flex justify-between">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="form-control">
              <label className="label flex gap-2 cursor-pointer">
                <span className="label-text font-bold">{index + 1}</span>
                <input
                  type="radio"
                  name="usefulness"
                  className="radio radio-primary"
                  value={index + 1}
                  onChange={handleChange}
                  checked={feedback.usefulness === `${index + 1}`}
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mt-5 mb-1">I found the AI feedback accurate</p>
        <p className="text-sm mb-3">(1 to Least Useful - 5 to Most Useful)</p>
        <div className="flex space-x-2 justify-between">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="form-control">
              <label className="label flex gap-2 cursor-pointer">
                <span className="label-text font-bold">{index + 1}</span>
                <input
                  type="radio"
                  name="accuracy"
                  className="radio radio-primary"
                  value={index + 1}
                  onChange={handleChange}
                  checked={feedback.accuracy === `${index + 1}`}
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comments" className="block mb-2 text-sm font-medium">
          Any additional comments or concerns
        </label>
        <textarea
          id="comments"
          name="comments"
          rows={4}
          className="textarea textarea-bordered w-full"
          placeholder="Your comments..."
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
