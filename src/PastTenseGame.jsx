import React, { useState, useEffect, useMemo } from 'react';
import { Star, Award, Play, RotateCcw, Clock, ArrowRight } from 'lucide-react';

const PastTenseGame = () => {
  const [rounds, setRounds] = useState([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showHint, setShowHint] = useState(false);

  // Irregular verbs - Present → Past
  const verbs = [
    { present: 'be (am/is/are)', past: 'was / were', hint: 'I was, You were, He was...' },
    { present: 'have', past: 'had', hint: 'I had a dog' },
    { present: 'do', past: 'did', hint: 'I did my homework' },
    { present: 'say', past: 'said', hint: 'She said hello' },
    { present: 'go', past: 'went', hint: 'I went to school' },
    { present: 'get', past: 'got', hint: 'I got a present' },
    { present: 'make', past: 'made', hint: 'Mom made a cake' },
    { present: 'know', past: 'knew', hint: 'I knew the answer' },
    { present: 'think', past: 'thought', hint: 'I thought about it' },
    { present: 'take', past: 'took', hint: 'She took the book' },
    { present: 'see', past: 'saw', hint: 'I saw a bird' },
    { present: 'come', past: 'came', hint: 'He came home' },
    { present: 'give', past: 'gave', hint: 'She gave me a gift' },
    { present: 'find', past: 'found', hint: 'I found my keys' },
    { present: 'tell', past: 'told', hint: 'She told me a story' },
    { present: 'feel', past: 'felt', hint: 'I felt happy' },
    { present: 'leave', past: 'left', hint: 'He left early' },
    { present: 'put', past: 'put', hint: 'I put it on the table' },
    { present: 'bring', past: 'brought', hint: 'She brought cookies' },
    { present: 'begin', past: 'began', hint: 'The movie began' },
    { present: 'eat', past: 'ate', hint: 'I ate breakfast' },
    { present: 'drink', past: 'drank', hint: 'She drank water' },
    { present: 'swim', past: 'swam', hint: 'I swam in the pool' },
    { present: 'run', past: 'ran', hint: 'He ran fast' },
    { present: 'write', past: 'wrote', hint: 'I wrote a letter' },
    { present: 'read', past: 'read', hint: 'I read a book yesterday' },
    { present: 'speak', past: 'spoke', hint: 'She spoke English' },
    { present: 'keep', past: 'kept', hint: 'I kept the key' },
    { present: 'sit', past: 'sat', hint: 'He sat down' },
    { present: 'stand', past: 'stood', hint: 'They stood up' },
  ];

  useEffect(() => {
    // Load leaderboard from localStorage
    const savedLeaderboard = localStorage.getItem('pastTenseLeaderboard');
    if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard));
  }, []);

  const buildRounds = () => {
    const shuffled = [...verbs].sort(() => Math.random() - 0.5);
    return shuffled.map((v) => ({
      present: v.present,
      past: v.past,
      hint: v.hint,
    }));
  };

  const startGame = () => {
    setGameStarted(true);
    setGameComplete(false);
    setScore(0);
    setTotalAnswered(0);
    setUserAnswer('');
    setFeedback('');
    setShowFeedback(false);
    setCelebrating(false);
    setShowHint(false);

    const newRounds = buildRounds();
    setRounds(newRounds);
    setRoundIndex(0);
  };

  const currentRound = rounds[roundIndex] || null;

  const choices = useMemo(() => {
    if (!currentRound) return [];
    const correctAnswer = currentRound.past;
    const pool = verbs.filter(
      (v) => !(v.present === currentRound.present && v.past === currentRound.past)
    );
    const wrongs = [];
    const poolCopy = [...pool];
    while (wrongs.length < 3 && poolCopy.length > 0) {
      const idx = Math.floor(Math.random() * poolCopy.length);
      const v = poolCopy.splice(idx, 1)[0];
      if (v.past !== correctAnswer && !wrongs.includes(v.past)) {
        wrongs.push(v.past);
      }
    }
    const all = [correctAnswer, ...wrongs];
    return all.sort(() => Math.random() - 0.5);
  }, [currentRound, verbs]);

  const checkAnswer = (selectedAnswer) => {
    if (!currentRound || showFeedback) return;

    setUserAnswer(selectedAnswer);
    setShowFeedback(true);
    setShowHint(false);

    const correct = selectedAnswer === currentRound.past;

    setTotalAnswered((t) => t + 1);
    if (correct) {
      setScore((s) => s + 1);
      setFeedback('🎉 Excellent! You got it!');
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 1500);
    } else {
      setFeedback(`Not quite! The past tense of "${currentRound.present}" is: ${currentRound.past}`);
    }

    const delay = correct ? 2500 : 4500;

    setTimeout(() => {
      setShowFeedback(false);
      setUserAnswer('');

      const isLast = roundIndex + 1 >= rounds.length;
      if (isLast) {
        endGame();
      } else {
        setRoundIndex((i) => i + 1);
      }
    }, delay);
  };

  const endGame = () => {
    const finalScore = score;
    const total = rounds.length;
    const gameResult = {
      score: finalScore,
      total,
      percentage: Math.round((finalScore / total) * 100),
      date: new Date().toISOString(),
      timestamp: Date.now(),
    };

    const newLeaderboard = [...leaderboard, gameResult].sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard);
    localStorage.setItem('pastTenseLeaderboard', JSON.stringify(newLeaderboard));

    setGameComplete(true);
    setGameStarted(false);
  };

  // Start screen
  if (!gameStarted && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <Clock className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-indigo-500" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
            Past Tense Challenge! ⏰
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-2 sm:mb-3">
            Learn irregular verbs in English
          </p>
          <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
            See a verb in present tense → Choose its past tense!
          </p>

          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-indigo-50 rounded-xl sm:rounded-2xl">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700">
              📚 Verbs to Learn:
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm sm:text-base text-gray-600 max-h-48 overflow-y-auto">
              {verbs.map((v, i) => (
                <div key={i} className="flex items-center justify-center gap-2 p-1">
                  <span className="font-medium text-indigo-600">{v.present}</span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-green-600">{v.past}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg sm:text-xl md:text-2xl font-bold rounded-xl sm:rounded-2xl hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            Start Learning!
          </button>

          <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
            {verbs.length} verbs to practice
          </p>
        </div>
      </div>
    );
  }

  // Game complete screen
  if (gameComplete) {
    const latestGame = leaderboard[leaderboard.length - 1];
    const percentage = latestGame?.percentage || 0;
    
    let message = '';
    if (percentage === 100) message = '🌟 Perfect Score! Amazing!';
    else if (percentage >= 80) message = '🎉 Great job! Keep it up!';
    else if (percentage >= 60) message = '👍 Good effort! Practice more!';
    else message = '💪 Keep practicing! You can do it!';

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full">
          <div className="text-center mb-6 sm:mb-8">
            <Award className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-yellow-500 mx-auto mb-3 sm:mb-4" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Game Complete!</h1>
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-600 mb-2">{score} / {rounds.length}</p>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-700">{percentage}%</p>
            <p className="text-lg sm:text-xl mt-3 text-gray-600">{message}</p>
          </div>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">🏆 Past Tense Leaderboard</h2>
            <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
              {leaderboard.slice(0, 10).map((game, index) => {
                const isLatest = game.timestamp === latestGame?.timestamp;
                const date = new Date(game.date);
                const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

                return (
                  <div
                    key={game.timestamp}
                    className={`p-3 sm:p-4 rounded-lg sm:rounded-xl flex justify-between items-center ${
                      isLatest
                        ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600">#{index + 1}</div>
                      <div>
                        <div className="text-sm sm:text-base font-semibold text-gray-800">
                          {game.score} / {game.total} ({game.percentage}%)
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">{dateStr}</div>
                      </div>
                    </div>
                    {isLatest && (
                      <div className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                        Now
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg sm:text-xl md:text-2xl font-bold rounded-xl sm:rounded-2xl hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            Play Again!
          </button>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-2 sm:p-3 md:p-4">
      {/* Score bar */}
      <div className="max-w-4xl mx-auto mb-3 sm:mb-4 md:mb-6">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-3 md:p-4 flex flex-wrap justify-between items-center gap-2 sm:gap-4">
          <div className="flex items-center flex-wrap gap-2 sm:gap-4 md:gap-6">
            <div className="flex items-center">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-500 mr-1 sm:mr-2" />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{score}</span>
              <span className="text-sm sm:text-base md:text-lg text-gray-600 ml-1 sm:ml-2">/ {totalAnswered}</span>
            </div>
            <div className="text-sm sm:text-base md:text-lg font-semibold text-indigo-600">
              Q{totalAnswered + 1}/{rounds.length}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-gray-600">
              {totalAnswered > 0 ? `${Math.round((score / totalAnswered) * 100)}%` : '0%'}
            </div>
          </div>
          <button
            onClick={startGame}
            className="flex items-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-indigo-500 text-white text-xs sm:text-sm rounded-lg sm:rounded-xl hover:bg-indigo-600 transition-all"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Restart</span>
            <span className="sm:hidden">↻</span>
          </button>
        </div>
      </div>

      {/* Main game card */}
      <div className="max-w-4xl mx-auto">
        <div className={`bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 transform transition-all duration-300 ${celebrating ? 'scale-105' : 'scale-100'}`}>
          {currentRound && (
            <>
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <div className="inline-block px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                  Present → Past Tense
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-indigo-600 mb-4 sm:mb-6 min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex items-center justify-center px-2">
                  {currentRound.present}
                </h2>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6">
                  What is the past tense?
                </p>

                {/* Hint button */}
                {!showFeedback && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-sm sm:text-base text-indigo-500 hover:text-indigo-700 underline mb-4"
                  >
                    {showHint ? 'Hide hint' : 'Need a hint?'}
                  </button>
                )}

                {showHint && !showFeedback && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3 sm:p-4 mb-4 text-yellow-700 text-sm sm:text-base">
                    💡 Example: "{currentRound.hint}"
                  </div>
                )}
              </div>

              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {choices.map((choice) => {
                  const isCorrectChoice = showFeedback && choice === currentRound.past;
                  const isWrongClicked = showFeedback && choice === userAnswer && userAnswer !== currentRound.past;

                  let buttonClass = 'bg-gradient-to-r from-indigo-100 to-purple-100 text-gray-800 hover:from-indigo-200 hover:to-purple-200';

                  if (isCorrectChoice) {
                    buttonClass = 'bg-green-500 text-white';
                  } else if (isWrongClicked) {
                    buttonClass = 'bg-red-500 text-white';
                  }

                  return (
                    <button
                      key={choice}
                      onClick={() => checkAnswer(choice)}
                      disabled={showFeedback}
                      className={`w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold rounded-xl sm:rounded-2xl transition-all shadow-lg ${buttonClass} ${
                        showFeedback ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95 sm:hover:scale-105'
                      }`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div
                  className={`mt-4 sm:mt-6 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-center text-base sm:text-lg md:text-xl font-bold ${
                    userAnswer === currentRound.past
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {feedback}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Celebration stars */}
      {celebrating && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-yellow-400 animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PastTenseGame;
