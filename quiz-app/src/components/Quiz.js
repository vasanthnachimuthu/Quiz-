import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from '../UIElements/Card';
import './Button.css';


export const Quiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/questions')
            .then(response => {
                const updatedQuiz = response.data.map(q => {
                    return {
                        ...q,
                        options: JSON.parse(q.options)
                    };
                });
                setQuiz(updatedQuiz);
            })
            .catch(error => {
                console.error('Error fetching questions:', erro);
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
            <div>
                <Card>
                    <h1>Quiz</h1>
                </Card>
            </div>

            <div>
                {showScore ? (
                    <Card>
                        <h2>Your Score</h2>
                        <p>{score} out of {quiz.length}</p>
                    </Card>
                ) : (
                    <Card className="question">
                        <p>{quiz[currentIndex]?.question}</p>
                        <div className="options">
                            {quiz[currentIndex]?.options.map((option, index) => (
                                <div key={index} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="option"
                                        id={`option${index}`}
                                        value={option}
                                        checked={option === selectedOptions[currentIndex]}
                                        onChange={handleOptionChange}
                                    />
                                    <label className="form-check-label" For={`option${index}`}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
                <div className="button-container">
                    {!showScore && (
                        <>
                            <Button variant="btn btn-outline-primary" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
                            {currentIndex === quiz.length - 1 ? (
                                <Button variant="btn btn-outline-success" onClick={calculateScore}>Finish</Button>
                            ) : (
                                <Button variant="btn btn-outline-primary" onClick={handleNext} disabled={selectedOptions[currentIndex] === undefined}>Next</Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
