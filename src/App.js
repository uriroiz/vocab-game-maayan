import React, { useState } from 'react';
import VocabGame from './VocabGame.jsx';
import VocabGameTyping from './VocabGameTyping.jsx';
import PastTenseGame from './PastTenseGame.jsx';
import { BookOpen, Keyboard, Clock, ArrowLeft } from 'lucide-react';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  // If a game is selected, show it
  if (selectedGame === 'vocab') {
    return (
      <div>
        <BackButton onClick={() => setSelectedGame(null)} />
        <VocabGame />
      </div>
    );
  }

  if (selectedGame === 'typing') {
    return (
      <div>
        <BackButton onClick={() => setSelectedGame(null)} />
        <VocabGameTyping />
      </div>
    );
  }

  if (selectedGame === 'pastTense') {
    return (
      <div>
        <BackButton onClick={() => setSelectedGame(null)} />
        <PastTenseGame />
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-3xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          🎮 Maayan's Learning Games
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10">
          Choose a game to play!
        </p>

        <div className="grid gap-4 sm:gap-6">
          {/* Vocabulary Multiple Choice */}
          <GameCard
            icon={<BookOpen className="w-10 h-10 sm:w-12 sm:h-12" />}
            title="Vocabulary Quiz"
            description="Multiple choice - English ↔ Hebrew"
            color="from-purple-500 to-pink-500"
            onClick={() => setSelectedGame('vocab')}
          />

          {/* Vocabulary Typing */}
          <GameCard
            icon={<Keyboard className="w-10 h-10 sm:w-12 sm:h-12" />}
            title="Vocabulary Typing"
            description="Type the English translation"
            color="from-blue-500 to-cyan-500"
            onClick={() => setSelectedGame('typing')}
          />

          {/* Past Tense - NEW! */}
          <GameCard
            icon={<Clock className="w-10 h-10 sm:w-12 sm:h-12" />}
            title="Past Tense Challenge"
            description="Learn irregular verbs - Present → Past"
            color="from-indigo-500 to-purple-500"
            onClick={() => setSelectedGame('pastTense')}
            isNew={true}
          />
        </div>
      </div>
    </div>
  );
}

// Game card component
function GameCard({ icon, title, description, color, onClick, isNew }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full p-4 sm:p-6 bg-gradient-to-r ${color} text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-4 sm:gap-6`}
    >
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
          NEW!
        </div>
      )}
      <div className="bg-white/20 p-3 sm:p-4 rounded-xl">
        {icon}
      </div>
      <div className="text-left">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <p className="text-sm sm:text-base opacity-90">{description}</p>
      </div>
    </button>
  );
}

// Back button component
function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden sm:inline">Back to Menu</span>
    </button>
  );
}

export default App;
