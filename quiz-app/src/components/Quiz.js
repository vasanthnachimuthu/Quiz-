import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from '../UIElements/Card';
import './Button.css';

export const Quiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3000/api/questions')
            .then(response => {
                setQuiz(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }, []);


    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    console.log('Current question index:', currentIndex);
    console.log('Current question:', quiz[currentIndex]);

    return (
        <div>
            <div>
                <Card>
                    <h1>Quiz</h1>
                </Card>
            </div>

            <div>
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
                                />
                                <label className="form-check-label" htmlFor={`option${index}`}>
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                </Card>
                <div className="button-container">
                    <Button variant="primary" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
                    <Button variant="primary" onClick={handleNext} disabled={currentIndex === quiz.length - 1}>Next</Button>
                </div>
            </div>
        </div>
    );
};
