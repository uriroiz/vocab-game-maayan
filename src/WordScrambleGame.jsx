import React, { useMemo, useState } from 'react';
import { Shuffle, Star, RotateCcw, Play, Award } from 'lucide-react';

const ALL_WORDS = [
  'across', 'agree', 'around', 'as well as', 'asleep', 'come along', 'Earth', 'enough',
  'especially', 'exactly', 'fairly', 'glasses', 'grow', 'hang', 'happen', 'high', 'hill',
  'however', 'immediately', 'must', 'narrow', 'not too', 'of course', 'part', 'photo',
  'probably', 'refrigerator', 'save', 'simple', 'slow', 'somebody', 'stairs', 'steal',
  'strange', 'suitcase', 'the future', 'throw away', 'toothbrush', 'trash', 'vacation',
  'waste', 'way', 'without', 'a few', 'above', 'advice', 'advise', 'bright', 'classmate',
  'clear', 'company', 'cover', 'deep', 'department', 'down', 'effort', 'enjoy yourself',
  'exciting', 'follow', 'form', 'Guess what!', 'have got', 'hear', 'hole', 'hope',
  'information', 'kill', 'lie', 'lovely', 'meeting', 'news', 'office', 'pair', 'pass',
  'result', 'round', 'spend', 'suit', 'sure', 'the truth', 'unusual', 'war', 'would',
];

const SPELLING_WORDS = [
  'the future', 'come along', 'especially', 'however', 'must', 'probably',
  'of course', 'would', 'result', 'a few', 'lovely', 'exciting', 'enough',
  'as well as', 'without',
];

const READING_WORDS = ALL_WORDS.filter((w) => !SPELLING_WORDS.includes(w));

const normalize = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();

const shuffleWord = (word) => {
  const chars = word.split('');
  const letters = chars.filter((c) => c !== ' ');
  const shuffled = [...letters].sort(() => Math.random() - 0.5);
  let letterIndex = 0;
  return chars
    .map((c) => (c === ' ' ? ' ' : shuffled[letterIndex++]))
    .join('');
};

const buildRounds = () => {
  const pool = [...SPELLING_WORDS].sort(() => Math.random() - 0.5);
  return pool.slice(0, SPELLING_WORDS.length).map((answer) => ({
    answer,
    scrambled: shuffleWord(answer),
  }));
};

export default function WordScrambleGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const current = rounds[index] || null;
  const accuracy = useMemo(() => (answered > 0 ? Math.round((score / answered) * 100) : 0), [score, answered]);

  const startGame = () => {
    setRounds(buildRounds());
    setGameStarted(true);
    setGameComplete(false);
    setIndex(0);
    setInput('');
    setScore(0);
    setAnswered(0);
    setFeedback('');
    setShowFeedback(false);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!current || showFeedback || !input.trim()) return;

    const correct = normalize(input) === normalize(current.answer);
    setAnswered((v) => v + 1);
    if (correct) {
      setScore((v) => v + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Correct answer: ${current.answer}`);
    }
    setShowFeedback(true);

    setTimeout(() => {
      const isLast = index + 1 >= rounds.length;
      setShowFeedback(false);
      setInput('');
      if (isLast) {
        setGameComplete(true);
        setGameStarted(false);
      } else {
        setIndex((v) => v + 1);
      }
    }, 1800);
  };

  if (!gameStarted && !gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-400 to-sky-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <Shuffle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Word Scramble</h1>
          <p className="text-lg text-gray-600 mb-6">Spelling practice for selected words</p>
          <button onClick={startGame} className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-2xl font-bold rounded-2xl hover:from-emerald-600 hover:to-cyan-600 transition-all flex items-center mx-auto">
            <Play className="w-6 h-6 mr-3" />
            Start
          </button>
          <p className="text-sm text-gray-500 mt-5">Spelling words: {SPELLING_WORDS.length}</p>
          <p className="text-sm text-gray-500 mt-1">Reading-only words: {READING_WORDS.length}</p>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-400 to-sky-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Great Work!</h1>
          <p className="text-6xl font-bold text-emerald-600 mb-2">{score} / {rounds.length}</p>
          <p className="text-2xl text-gray-700 mb-6">{Math.round((score / rounds.length) * 100)}%</p>
          <button onClick={startGame} className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-2xl font-bold rounded-2xl hover:from-emerald-600 hover:to-cyan-600 transition-all flex items-center justify-center">
            <Play className="w-6 h-6 mr-3" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-400 to-sky-500 p-4">
      <div className="max-w-4xl mx-auto mb-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-2xl font-bold text-gray-800">{score}</span>
              <span className="text-lg text-gray-600 ml-2">/ {answered}</span>
            </div>
            <div className="text-lg font-semibold text-emerald-700">Q{answered + 1}/{rounds.length}</div>
            <div className="text-lg text-gray-600">{accuracy}%</div>
          </div>
          <button onClick={startGame} className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all">
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {current && (
            <>
              <p className="text-center text-lg text-gray-600 mb-5">Unscramble this word:</p>
              <h2 className="text-center text-5xl font-bold text-gray-800 mb-8 tracking-widest break-words">{current.scrambled}</h2>
              <form onSubmit={submit} className="space-y-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                  autoComplete="off"
                  placeholder="Type the correct word or phrase..."
                  className="w-full px-6 py-4 text-3xl text-center rounded-2xl border-4 border-emerald-300 focus:border-emerald-500 focus:outline-none"
                />
                <button type="submit" disabled={!input.trim() || showFeedback} className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xl font-bold rounded-2xl disabled:opacity-50">
                  Check Answer
                </button>
              </form>
              {showFeedback && (
                <div className={`mt-5 p-4 rounded-xl text-center text-xl font-bold ${normalize(input) === normalize(current.answer) ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {feedback}
                </div>
              )}
            </>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mt-5">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Reading + Hebrew Translation (No Spelling)</h3>
          <p className="text-gray-600 mb-4">Read each word and say its Hebrew meaning out loud.</p>
          <div className="flex flex-wrap gap-2">
            {READING_WORDS.map((word) => (
              <span key={word} className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 font-semibold">
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
