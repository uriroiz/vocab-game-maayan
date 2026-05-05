import React, { useState } from 'react';
import { Keyboard, Play, RotateCcw, Star, Award } from 'lucide-react';

const SPELLING_WORDS = [
  'the future', 'come along', 'especially', 'however', 'must', 'probably',
  'of course', 'would', 'result', 'a few', 'lovely', 'exciting', 'enough',
  'as well as', 'without',
];

const normalize = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const hintMask = (word) => word.replace(/[a-zA-Z]/g, '_');
const MEMORIZE_MS = 5000;

export default function SpellingFocusGame() {
  const [rounds, setRounds] = useState([]);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showWord, setShowWord] = useState(true);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const current = rounds[index];

  const startGame = () => {
    const newRounds = [...SPELLING_WORDS].sort(() => Math.random() - 0.5);
    setRounds(newRounds);
    setIndex(0);
    setStarted(true);
    setComplete(false);
    setShowWord(true);
    setInput('');
    setScore(0);
    setAnswered(0);
    setShowFeedback(false);
    setShowHint(false);
    setTimeout(() => setShowWord(false), MEMORIZE_MS);
  };

  const moveNext = () => {
    const isLast = index + 1 >= rounds.length;
    if (isLast) {
      setComplete(true);
      setStarted(false);
    } else {
      setIndex((v) => v + 1);
      setShowWord(true);
      setInput('');
      setShowHint(false);
      setTimeout(() => setShowWord(false), MEMORIZE_MS);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!current || showFeedback || !input.trim()) return;
    const correct = normalize(input) === normalize(current);
    setAnswered((v) => v + 1);
    if (correct) {
      setScore((v) => v + 1);
      setFeedback('Correct spelling!');
    } else {
      setFeedback(`Correct spelling: ${current}`);
    }
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      moveNext();
    }, 1700);
  };

  if (!started && !complete) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 flex items-center justify-center p-4"><div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"><Keyboard className="w-16 h-16 text-blue-500 mx-auto mb-4" /><h1 className="text-4xl font-bold text-gray-800 mb-3">Spelling Focus</h1><p className="text-lg text-gray-600 mb-6">See the word, then spell it from memory</p><button onClick={startGame} className="px-10 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-2xl font-bold rounded-2xl"><Play className="w-6 h-6 mr-3 inline" />Start</button></div></div>;
  }

  if (complete) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 flex items-center justify-center p-4"><div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"><Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" /><h1 className="text-4xl font-bold text-gray-800 mb-2">Finished!</h1><p className="text-6xl font-bold text-blue-600 mb-2">{score} / {rounds.length}</p><button onClick={startGame} className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-2xl font-bold rounded-2xl"><Play className="w-6 h-6 mr-3 inline" />Play Again</button></div></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-2xl font-bold"><Star className="w-6 h-6 text-yellow-500 mr-2" />{score} / {answered}</div>
          <div className="text-lg text-gray-700">Word {index + 1}/{rounds.length}</div>
          <button onClick={startGame} className="px-3 py-2 rounded-xl bg-blue-500 text-white"><RotateCcw className="w-4 h-4 inline mr-1" />Restart</button>
        </div>
        <div className="text-center mb-6">
          {showWord ? <h2 className="text-5xl font-bold text-gray-900 break-words">{current}</h2> : <h2 className="text-5xl font-bold text-gray-500 break-words tracking-widest">{hintMask(current)}</h2>}
          <p className="text-gray-600 mt-3">{showWord ? 'Memorize for 5 seconds...' : 'Type the full word/phrase'}</p>
          {!showWord && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowHint((v) => !v)}
                className="px-4 py-2 bg-cyan-100 text-cyan-800 rounded-xl font-semibold"
              >
                {showHint ? 'Hide Hint' : 'Hint'}
              </button>
            </div>
          )}
          {showHint && !showWord && (
            <p className="text-lg text-gray-700 mt-3">
              Hint: starts with <span className="font-bold">{current?.[0]}</span>, length <span className="font-bold">{current?.replace(/\s/g, '').length}</span> letters
            </p>
          )}
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input value={input} onChange={(e) => setInput(e.target.value)} autoFocus autoComplete="off" className="w-full px-5 py-4 text-3xl text-center rounded-2xl border-4 border-blue-300 focus:border-blue-500 focus:outline-none" placeholder="Type spelling here" />
          <button disabled={!input.trim() || showFeedback || showWord} className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xl font-bold rounded-2xl disabled:opacity-50">Check</button>
        </form>
        {showFeedback && <div className="mt-4 p-4 rounded-xl text-center font-bold bg-orange-100 text-orange-700">{feedback}</div>}
      </div>
    </div>
  );
}
