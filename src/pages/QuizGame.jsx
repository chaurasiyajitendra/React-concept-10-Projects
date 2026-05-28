import { useState } from "react";
import { Brain, Trophy, CheckCircle2, XCircle } from "lucide-react";

const QuizGame = () => {

  const [num, setNum] = useState(10);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const url = `https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${difficulty}&type=multiple`;

    const data = await fetch(url).then((res) => res.json());

    const formattedQuestions = data.results.map((q) => ({
      ...q,

      options: [q.correct_answer, ...q.incorrect_answers].sort(
        () => Math.random() - 0.5,
      ),
    }));

    setQuestions(formattedQuestions);
  }

  const question = questions[currentQuestion];

  function handleAnswer(option) {
    setSelectedAnswer(option);

    if (option === question.correct_answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);

        setSelectedAnswer("");
      } else {
        setShowResult(true);
      }
    }, 1000);
  }

  function restartQuiz() {
    setQuestions([]);

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setScore(0);

    setShowResult(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-7xl grid lg:grid-cols-[350px_1fr] gap-6">
        {/* Left Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-800 p-4 rounded-2xl">
              <Brain size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Quiz Game</h1>

              <p className="text-slate-400">Test your knowledge</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Number */}
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Number of Questions
              </label>

              <input
                type="number"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
              >
                <option value="">Any Category</option>

                <option value="9">General Knowledge</option>

                <option value="11">Film</option>

                <option value="12">Music</option>

                <option value="15">Video Games</option>

                <option value="21">Sports</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none"
              >
                <option value="">Any Difficulty</option>

                <option value="easy">Easy</option>

                <option value="medium">Medium</option>

                <option value="hard">Hard</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Start Quiz
            </button>
          </form>
        </div>

        {/* Right Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 min-h-[700px]">
          {questions.length > 0 ? (
            !showResult ? (
              <div>
                {/* Top */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-slate-400 mb-2">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>

                    <h2 className="text-2xl font-bold capitalize">
                      {question.category}
                    </h2>
                  </div>

                  <div className="bg-slate-800 px-5 py-3 rounded-2xl">
                    Score : {score}
                  </div>
                </div>

                {/* Question */}
                <h1
                  className="text-4xl font-bold leading-relaxed mb-10"
                  dangerouslySetInnerHTML={{
                    __html: question.question,
                  }}
                />

                {/* Options */}
                <div className="grid gap-5">
                  {question.options.map((option, index) => {
                    const isCorrect = option === question.correct_answer;

                    const isSelected = option === selectedAnswer;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={selectedAnswer}
                        className={`
                                p-5 rounded-2xl border text-left transition-all duration-300

                                ${
                                  selectedAnswer
                                    ? isCorrect
                                      ? "bg-green-500/20 border-green-500 text-green-300"
                                      : isSelected
                                        ? "bg-red-500/20 border-red-500 text-red-300"
                                        : "bg-slate-800 border-slate-700 opacity-50"
                                    : "bg-slate-800 border-slate-700 hover:border-white hover:bg-slate-700"
                                }
                              `}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: option,
                            }}
                          />

                          {selectedAnswer && isCorrect && <CheckCircle2 />}

                          {selectedAnswer && isSelected && !isCorrect && (
                            <XCircle />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-slate-800 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Trophy size={60} />
                  </div>

                  <h1 className="text-6xl font-bold mb-4">Quiz Completed</h1>

                  <p className="text-slate-400 text-xl mb-6">
                    Your Final Score
                  </p>

                  <h2 className="text-8xl font-bold mb-10">
                    {score}/{questions.length}
                  </h2>

                  <button
                    onClick={restartQuiz}
                    className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Brain size={80} className="mx-auto mb-6 text-slate-700" />

                <h1 className="text-4xl font-bold mb-3">Ready for Quiz ?</h1>

                <p className="text-slate-400 text-lg">
                  Select options and start playing
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
