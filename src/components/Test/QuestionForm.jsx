import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [questions, setQuestions] = useState([
    { question: '', answers: [{ text: '', correct: false }] }
  ]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleCorrectChange = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex].correct = !newQuestions[qIndex].answers[aIndex].correct;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: [{ text: '', correct: false }] }]);
  };

  const addAnswer = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].answers.push({ text: '', correct: false });
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('path_to_your_php_file.php', { data: questions, testID: 1 });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting data', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((q, qIndex) => (
        <div key={qIndex}>
          <input
            type="text"
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />
          {q.answers.map((a, aIndex) => (
            <div key={aIndex}>
              <input
                type="text"
                placeholder="Enter answer"
                value={a.text}
                onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
              />
              <input
                type="checkbox"
                checked={a.correct}
                onChange={() => handleCorrectChange(qIndex, aIndex)}
              />
              Correct
            </div>
          ))}
          <button type="button" onClick={() => addAnswer(qIndex)}>Add Answer</button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
