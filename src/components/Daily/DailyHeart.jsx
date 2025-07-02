import { useState, useEffect, useContext, useCallback } from "react";
import './DailyHeart.css';
import QuoteContext from '../QuoteContext';
import Bubble from "./Bubble";

export default function DailyHeart() {
    const [error, setError] = useState(null);
    const [translatedQuote, setTranslatedQuote] = useState('');
    const [showBubble, setShowBubble] = useState(false);
    const { mood, quote, setQuote } = useContext(QuoteContext);
    const [quoteTrigger, setQuoteTrigger] = useState(0);

    const fetchQuote = useCallback(async () => {
        try {
            const response = await fetch(`https://mood-based-quote-api.p.rapidapi.com/${mood}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'X-RapidAPI-Key': '',
                    'X-RapidAPI-Host': 'mood-based-quote-api.p.rapidapi.com',
                },
            });

            if (!response.ok) {
                throw new Error('조금만 기다려 주세요.', response.status);
            }

            const data = await response.json();
            const quotes = data.result;

            if (Array.isArray(quotes) && quotes.length > 0) {
                const filteredQuotes = quotes.filter(q => q.quote.length < 150);

                if (filteredQuotes.length > 0) {
                    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
                    const selectedQuote = filteredQuotes[randomIndex];

                    setQuote(selectedQuote);
                    setShowBubble(true);

                    const translationRes = await fetch(
                        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(selectedQuote.quote)}`
                    );
                    const translationData = await translationRes.json();
                    const translated = translationData[0][0][0];
                    setTranslatedQuote(translated);

                    console.log("quotes 전체:", quotes);
                    console.log("150자 이하 필터링된 것:", filteredQuotes);
                    console.log("filteredQuotes.length:", filteredQuotes.length);

                } else {
                    console.log('제한숫자 에러');
                }
            } else {
                throw new Error('당신을 위한 위로를 준비 중이에요.');
            }
        } catch (error) {
            setError(error.message);
            setQuote({ quote: '당신을 위한 위로를 준비 중이에요.', author: '' });
            setShowBubble(false);
        }
    }, [mood, setQuote]);

    useEffect(() => {
        if (mood) {
            fetchQuote();
        }
    }, [mood, quoteTrigger, fetchQuote]);

    const closeBubble = () => setShowBubble(false);

    const refreshQuote = () => setQuoteTrigger(prev => prev + 1);

    if (error) return <p>{error}</p>;
    if (!quote) return <p>당신을 위한 위로를 준비 중입니다...</p>;

    return (
        <div className="quote-msg">
            {showBubble && (
                <Bubble
                    quote={quote.quote}
                    author={quote.author}
                    translatedQuote={translatedQuote}
                    onClose={closeBubble}
                />
            )}
            <button onClick={refreshQuote}></button>
        </div>
    );
}
