import React from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

export const Trivia = ({
  data,
  setTimeOut,
  setQuestionNumber,
  questionNumber,
}) => {
  const [question, setQuestion] = React.useState(null);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [className, setClassName] = React.useState(null);
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  React.useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  React.useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const handleClick = (item) => {
    setSelectedAnswer(item);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(item.correct ? "answer correct" : "answer wrong")
    );

    delay(6000, () => {
      if (item.correct) {
        setQuestionNumber((prev) => prev + 1);
        setSelectedAnswer(null);
        correctAnswer();
      } else {
        wrongAnswer();
        setTimeOut(true);
      }
    });
  };

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  return (
    <>
      {question ? (
        <div className="trivia">
          <div className="question">{question.question}</div>
          <div className="answers">
            {question.answers.map((answer, id) => (
              <div
                className={selectedAnswer === answer ? className : "answer"}
                key={id}
                onClick={() => handleClick(answer)}
              >
                {answer.text}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
