import React from "react";

export default function NextButton({ dispatch }) {
  return (
    <button onClick={() => dispatch({ type: "nextQuestion" })}>next</button>
  );
}
