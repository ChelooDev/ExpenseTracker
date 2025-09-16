import React, { useState, useEffect } from 'react';
import dailyQuotes from '../data/quotes';
import type { Quote } from '../types';

interface DailyQuoteProps {
    className?: string;
}

export default function DailyQuote({ className = '' }: DailyQuoteProps) {
    const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

    // Get the quote for the current day of the year
    useEffect(() => {
        const getTodaysQuote = () => {
            const now = new Date();
            const startOfYear = new Date(now.getFullYear(), 0, 0);
            const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

            // Use day of year to get consistent quote (1-365)
            const quoteIndex = (dayOfYear - 1) % dailyQuotes.length;
            setCurrentQuote(dailyQuotes[quoteIndex]);
        };

        getTodaysQuote();
    }, []);

    if (!currentQuote) {
        return (
            <div className={`p-4 rounded-lg max-w-4xl mx-auto ${className}`}>
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`p-4 rounded-lg max-w-4xl mx-auto ${className}`}>
            <div className="mb-4">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Daily Wisdom
                </h3>
            </div>

            <blockquote className="text-gray-700 dark:text-gray-300 italic text-xl leading-relaxed mb-4">
                "{currentQuote.text}"
            </blockquote>

            <cite className="text-lg text-gray-500 dark:text-gray-400 not-italic">
                — {currentQuote.author}
            </cite>
        </div>
    );
}
