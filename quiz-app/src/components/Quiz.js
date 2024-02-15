import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from '../UIElements/Card';
import './Button.css';


export const Quiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };


    return (
        <div>
            <div>
                <Card>
                    <h1>Quiz</h1>

                </Card>
            </div>

            <div>
                <Card className="question">
                    <p>Questions</p>
                </Card>
                <div className="button-container">
                    <Button variant="primary" onClick={handlePrevious}>Previous</Button>
                    <Button variant="primary" onClick={handleNext}>Next</Button>
                </div>

            </div>

        </div>
    );
};
