import { useEffect, useReducer } from "react";
import "./App.css";
import Main from "./components/Main";
import allQuestions from "./data/questions.json";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.allQuestions,
        status: action.status,
      };
    case "datFailed":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active" };
    case "newAnswer":
      return { ...state, answer: action.payload };
  }
}

function App() {
  const [{ questions, status, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const numQuestion = questions.length;

  console.log;
  useEffect(() => {
    dispatch({ type: "dataReceived", payload: allQuestions, status: "ready" });
  }, []);
  return (
    <div className="app">
      <h1>The Dumb quiz for dumb people</h1>
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[0]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
