import React, { useEffect, useMemo, useState } from 'react';
import { Languages, Play, RotateCcw } from 'lucide-react';

const SPELLING_WORDS = new Set([
  'the future', 'come along', 'especially', 'however', 'must', 'probably',
  'of course', 'would', 'result', 'a few', 'lovely', 'exciting', 'enough',
  'as well as', 'without',
].map((w) => w.toLowerCase()));

const ALL_WORDS = [
  'across','agree','around','as well as','asleep','come along','Earth','enough','especially','exactly','fairly','glasses','grow','hang','happen','high','hill','however','immediately','must','narrow','not too','of course','part','photo','probably','refrigerator','save','simple','slow','somebody','stairs','steal','strange','suitcase','the future','throw away','toothbrush','trash','vacation','waste','way','without','a few','above','advice','advise','bright','classmate','clear','company','cover','deep','department','down','effort','enjoy yourself','exciting','follow','form','Guess what!','have got','hear','hole','hope','information','kill','lie','lovely','meeting','news','office','pair','pass','result','round','spend','suit','sure','the truth','unusual','war','would',
];

const TARGET = ALL_WORDS.filter((w) => !SPELLING_WORDS.has(w.toLowerCase()));
const SIMPLE_HEBREW = {
  across: 'לרוחב', agree: 'להסכים', around: 'מסביב', 'as well as': 'וגם', asleep: 'ישן',
  Earth: 'כדור הארץ', exactly: 'בדיוק', fairly: 'די', glasses: 'משקפיים', grow: 'לגדול',
  hang: 'לתלות', happen: 'לקרות', high: 'גבוה', hill: 'גבעה', immediately: 'מיד',
  narrow: 'צר', 'not too': 'לא מדי', part: 'חלק', photo: 'תמונה', refrigerator: 'מקרר',
  save: 'לחסוך', simple: 'פשוט', slow: 'איטי', somebody: 'מישהו', stairs: 'מדרגות',
  steal: 'לגנוב', strange: 'מוזר', suitcase: 'מזוודה', 'throw away': 'לזרוק', toothbrush: 'מברשת שיניים',
  trash: 'אשפה', vacation: 'חופשה', waste: 'לבזבז', way: 'דרך', above: 'מעל',
  advice: 'עצה', advise: 'לייעץ', bright: 'בהיר', classmate: 'חבר לכיתה', clear: 'ברור',
  company: 'חברה', cover: 'לכסות', deep: 'עמוק', department: 'מחלקה', down: 'למטה',
  effort: 'מאמץ', 'enjoy yourself': 'תיהנה', follow: 'לעקוב', form: 'טופס', 'Guess what!': 'נחש מה!',
  'have got': 'יש לי', hear: 'לשמוע', hole: 'חור', hope: 'לקוות', information: 'מידע',
  kill: 'להרוג', lie: 'לשקר', meeting: 'פגישה', news: 'חדשות', office: 'משרד',
  pair: 'זוג', pass: 'לעבור', round: 'סיבוב', spend: 'לבזבז', suit: 'חליפה',
  sure: 'בטוח', 'the truth': 'האמת', unusual: 'יוצא דופן', war: 'מלחמה',
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function MatchHebrewGame() {
  const [pairs, setPairs] = useState([]);
  const [started, setStarted] = useState(false);
  const [leftPick, setLeftPick] = useState(null);
  const [rightPick, setRightPick] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const selected = TARGET.map((w) => ({
      english: w,
      hebrew: SIMPLE_HEBREW[w] || `תרגום: ${w}`,
    }));
    setPairs(selected);
  }, []);

  const roundPairs = useMemo(() => shuffle(pairs).slice(0, 8).map((p, i) => ({ ...p, id: i + 1 })), [pairs, started]);
  const left = useMemo(() => shuffle(roundPairs), [roundPairs]);
  const right = useMemo(() => shuffle(roundPairs), [roundPairs]);

  const start = () => {
    setStarted(true);
    setLeftPick(null);
    setRightPick(null);
    setMatchedIds(new Set());
    setFeedback('');
  };

  useEffect(() => {
    if (leftPick && rightPick) {
      if (leftPick.id === rightPick.id) {
        const next = new Set(matchedIds);
        next.add(leftPick.id);
        setMatchedIds(next);
        setFeedback('Great match!');
      } else {
        setFeedback('Not a match, try again.');
      }
      setTimeout(() => {
        setLeftPick(null);
        setRightPick(null);
      }, 500);
    }
  }, [leftPick, rightPick]);

  if (!started) return <div className="min-h-screen bg-gradient-to-br from-amber-300 via-orange-300 to-rose-300 flex items-center justify-center p-4"><div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center"><Languages className="w-16 h-16 text-orange-500 mx-auto mb-4" /><h1 className="text-4xl font-bold mb-3">Find & Match</h1><p className="text-lg text-gray-600 mb-2">Match English words to Hebrew translation</p><p className="text-sm text-gray-500 mb-6">Loaded pairs: {pairs.length}</p><button onClick={start} disabled={pairs.length === 0} className="px-10 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-2xl font-bold rounded-2xl disabled:opacity-50"><Play className="w-6 h-6 mr-2 inline" />Start</button></div></div>;

  const done = matchedIds.size === roundPairs.length && roundPairs.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-300 via-orange-300 to-rose-300 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Matches: {matchedIds.size}/{roundPairs.length}</h2>
          <button onClick={start} className="px-4 py-2 bg-orange-500 text-white rounded-xl"><RotateCcw className="w-4 h-4 inline mr-1" />New Round</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {left.map((item) => (
              <button key={`l-${item.id}`} disabled={matchedIds.has(item.id)} onClick={() => setLeftPick(item)} className={`w-full p-3 rounded-xl text-left font-semibold ${matchedIds.has(item.id) ? 'bg-green-200' : leftPick?.id === item.id ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'}`}>{item.english}</button>
            ))}
          </div>
          <div className="space-y-2">
            {right.map((item) => (
              <button key={`r-${item.id}`} dir="rtl" disabled={matchedIds.has(item.id)} onClick={() => setRightPick(item)} className={`w-full p-3 rounded-xl text-right font-semibold ${matchedIds.has(item.id) ? 'bg-green-200' : rightPick?.id === item.id ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'}`}>{item.hebrew}</button>
            ))}
          </div>
        </div>
        <p className="text-center mt-4 font-semibold text-gray-700">{feedback}</p>
        {done && <p className="text-center mt-2 text-2xl font-bold text-green-700">Excellent! Round complete!</p>}
      </div>
    </div>
  );
}
