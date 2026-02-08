import React from "react";

export default function Question({ question, dispatch, answer }) {
  const hasAnswered = answer !== null && answer !== undefined;
  return (
    <div>
      <h3>question: {question.question}</h3>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={option}
            onClick={() => {
              dispatch({ type: "newAnswer", payload: index });
            }}
            className={`${index === answer ? "answer" : ""} ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
