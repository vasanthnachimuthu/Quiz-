import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from '../UIElements/Card';
import './Button.css';
import Question from './Question';
import fetchQuestions from './api';


export const Quiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [time, setTime] = useState();

    useEffect(() => {
        fetchQuestions().then(updatedQuiz => {
            setQuiz(updatedQuiz);
        });
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleOptionChange = (event) => {
        setSelectedOptions({
            ...selectedOptions,
            [currentIndex]: event.target.value
        });
    };

    const calculateScore = () => {
        let totalScore = 0;
        quiz.forEach((question, index) => {
            if (question.correct_answer === selectedOptions[index]) {
                totalScore++;
            }
        });
        setScore(totalScore);
        setShowScore(true);
    };

    return (
        <div>

            <Card className="Header">
                <h1>Quiz</h1>
            </Card>


            <div>
                {showScore ? (
                    <Card>
                        <h2>Your Score</h2>
                        <p>{score} out of {quiz.length}</p>
                    </Card>
                ) : (
                    <Question
                        question={quiz[currentIndex]?.question}
                        options={quiz[currentIndex]?.options || []}
                        selectedOption={selectedOptions[currentIndex] || ''}
                        handleOptionChange={handleOptionChange}
                    />
                )}
                <div className="button-container">
                    {!showScore && (
                        <>
                            <Button variant="primary" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
                            {currentIndex === quiz.length - 1 ? (
                                <Button variant="success" onClick={calculateScore}>Finish</Button>
                            ) : (
                                <Button variant="primary" onClick={handleNext} disabled={selectedOptions[currentIndex] === undefined}>Next</Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
