'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Define the types for the questions and the user
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface User {
  email: string;
  name: string;
  className: string;
  div: string;
}

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef<number | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('email');
      if (email) {
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (user) {
          setUser(user);
          fetchQuestions();
        } else {
          console.error('User not found:', error);
        }
      } else {
        console.error('Email not found in local storage');
      }
    };

    const fetchQuestions = async () => {
      const { data: questions, error } = await supabase
        .from('quiz')
        .select('question, opt1, opt2, opt3, opt4, correct_ans');

      if (questions) {
        setQuestions(questions.map(q => ({
          question: q.question,
          options: [q.opt1, q.opt2, q.opt3, q.opt4],
          correctAnswer: q.correct_ans
        })));
      } else {
        console.error('Error fetching questions:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (showResults || timeLeft <= 0) {
      clearInterval(timerRef.current!);
    }
  }, [showResults, timeLeft]);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prevTime => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, []);

  const handleAnswer = async (selectedOption: string) => {
    let updatedScore = score; // Store the updated score locally

    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      updatedScore++; // Increase the score locally
      setScore(updatedScore); // Update the score state
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      clearInterval(timerRef.current!);
      await saveResults(60 - timeLeft, updatedScore); // Pass the updated score to saveResults
    }
  };

  const saveResults = async (timeTaken: number, updatedScore: number) => {
    if (user) {
      const { name, className: userClass, div, email } = user;
      const { data, error } = await supabase
        .from('quiz_winner')
        .insert([{ email, score: updatedScore, name, class: userClass, div, time_taken: timeTaken }]);

      if (error) {
        console.error('Error saving results:', error);
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 text-xl"
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="text-yellow-500 dark:text-yellow-300" />
      </button>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        Ruby house quiz
      </h1>
      {showResults ? (
        <div className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 text-center">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
          Your score is {score} out of {questions.length}
          <br />
          Time taken: {60 - timeLeft} seconds
        </div>
      ) : (
        questions.length > 0 && (
          <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {questions[currentQuestionIndex].question}
            </h2>
            <ul className="space-y-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="p-4 bg-gray-200 dark:bg-gray-600 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  {option}
                </li>
              ))}
            </ul>
            <div className="text-right mt-4 text-gray-900 dark:text-gray-100">
              Time left: {timeLeft} seconds
            </div>
          </div>
        )
      )}
    </div>
  );
}
