import React from "react";

export default function StartScreen({ numQuestion, dispatch }) {
  return (
    <div>
      <h3>Ready to start the quiz with {numQuestion} questions?</h3>
      <button onClick={() => dispatch({ type: "active" })}>Start now</button>
    </div>
  );
}
