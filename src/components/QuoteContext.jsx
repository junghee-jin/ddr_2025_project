import { createContext, useState } from "react";

const QuoteContext = createContext();
QuoteContext.displayName = 'QuoteContext';

export const QuoteProvider = ({children}) => {
    const [mood, setMood] = useState(null);
    const [quote, setQuote] = useState(null);
    const [selected, setSelected] = useState(null);
    const [quoteTrigger, setQuoteTrigger] = useState(0);

    return (
        <QuoteContext.Provider 
            value={{ mood, setMood, quote, setQuote, selected, setSelected, quoteTrigger, setQuoteTrigger }}>
            {children}
        </QuoteContext.Provider>
    )
}

export default QuoteContext;