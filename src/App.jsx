import { useEffect, useReducer } from "react";
import "./App.css";
import Main from "./components/Main";
import allQuestions from "./data/questions.json";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.allQuestions,
        status: "ready", // or action.payload.status if you actually send one
      };

    case "dataFailed":
      return { ...state, status: "error" };

    case "active":
      return { ...state, status: "active" };

    case "newAnswer": {
      const question = state.questions?.[state.index];
      const totalQuestions = state.questions.length;
      if (!question) return state;

      if (totalQuestions - 1 === state.index) {
        return { ...state, answer: action.payload, status: "finished" };
      }

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption // verify your field name
            ? state.points + question.points
            : state.points,
      };
    }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finished":
      return { ...state, status: "finished" };

    default:
      return state;
  }
}

function App() {
  const [{ questions, status, answer, index, points }, dispatch] = useReducer(
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
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} />
            {/* <ProgressBar index={index + 1} totalQuestions={numQuestion} /> */}
          </>
        )}
        {status === "finished" && <h2>You scored {points} points</h2>}
      </Main>
    </div>
  );
}

export default App;
