// src/components/TestTakingPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestTakingPage = ({ testId }) => {
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});

  

  setTestData()

  // useEffect(() => {
  //   const fetchTest = async () => {
  //     try {
  //       const response = await axios.get(`path_to_your_backend_api/get-test/${testId}`);
  //       setTestData(response.data); // Assuming response.data is in the expected format
  //       initializeAnswers(response.data); // Initialize answers state based on fetched test data
  //     } catch (error) {
  //       console.error('Error fetching test data', error);
  //     }
  //   };

  //   fetchTest();
  // }, [testId]);

  const initializeAnswers = (data) => {
    const initialAnswers = {};
    data.questions.forEach((question) => {
      initialAnswers[question.id] = null; // Initialize each answer to null
    });
    setAnswers(initialAnswers);
  };

  const handleAnswerChange = (questionId, answerId) => {
    const newAnswers = { ...answers };
    newAnswers[questionId] = answerId;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('path_to_your_backend_api/submit-test', {
        testId,
        answers,
      });
      console.log(response.data); // Handle response from server if needed
    } catch (error) {
      console.error('Error submitting test', error);
    }
  };

  if (!testData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{testData.testName}</h2>
      <form onSubmit={handleSubmit}>
        {testData.questions.map((question) => (
          <div key={question.id}>
            <p>{question.question}</p>
            {question.answers.map((answer) => (
              <div key={answer.id}>
                <input
                  type="radio"
                  id={answer.id}
                  name={`question_${question.id}`}
                  value={answer.id}
                  checked={answers[question.id] === answer.id}
                  onChange={() => handleAnswerChange(question.id, answer.id)}
                />
                <label htmlFor={answer.id}>{answer.answer_text}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit Test</button>
      </form>
    </div>
  );
};

export default TestTakingPage;
