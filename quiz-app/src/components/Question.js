import React from 'react';
import Card from '../UIElements/Card';

const Question = ({ question, options, selectedOption, handleOptionChange }) => {
    return (
        <Card className="question">
            <p>{question}</p>
            <div className="options">
                {options.map((option, index) => (
                    <div key={index} className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="option"
                            id={`option${index}`}
                            value={option}
                            checked={option === selectedOption}
                            onChange={handleOptionChange}
                        />
                        <label className="form-check-label" htmlFor={`option${index}`}>
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Question;
