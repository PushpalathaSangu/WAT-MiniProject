import React, { useState } from 'react';
import axios from 'axios';

export default function CreateWAT() {
  const [step, setStep] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [watData, setWatData] = useState({
    subject: '',
    year: '',
    semester: '',
    watNumber: '',
    questions: [],
    startTime: '',
    endTime: ''
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0
  });

  const [pastedInput, setPastedInput] = useState('');

  const handlePasteQuestion = (e) => {
    const pastedText = e.target.value;
    const lines = pastedText.split('\n');

    const questionText = lines[0]?.trim();
    const options = lines.slice(1, 5).map((line) => line.split(')')[1]?.trim());

    if (questionText && options.length === 4) {
      setCurrentQuestion({
        questionText: questionText,
        options: options,
        correctOptionIndex: 0,
      });
    }
  };

  const handleBasicDetailsSubmit = (e) => {
    e.preventDefault();
    const emptyQuestions = Array.from({ length: totalQuestions }, () => ({
      questionText: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0
    }));
    setWatData({ ...watData, questions: emptyQuestions });
    setStep(2);
  };

  const handleQuestionSubmit = () => {
    const updatedQuestions = [...watData.questions];
    updatedQuestions[currentQuestionIndex] = currentQuestion;

    setWatData({ ...watData, questions: updatedQuestions });

    setCurrentQuestion({
      questionText: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0
    });
    setPastedInput('');

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/wats/create', {
        ...watData,
        facultyId: "67fb967dc29fd5b9ffa18577"
      });

      // ✅ Show success alert and redirect after clicking OK
      window.alert("WAT Created Successfully!");
      window.location.href = "/faculty-dashboard";

    } catch (err) {
      console.error(err);
      alert('Failed to create WAT');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Create WAT</h2>

      {step === 1 && (
        <form onSubmit={handleBasicDetailsSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={watData.subject}
            onChange={(e) => setWatData({ ...watData, subject: e.target.value })}
            required
            className="w-full border p-2"
          />

          <div className="space-y-2">
            <label className="block font-medium">Year:</label>
            {['E1', 'E2', 'E3', 'E4'].map((year) => (
              <label key={year} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="year"
                  value={year}
                  checked={watData.year === year}
                  onChange={(e) => setWatData({ ...watData, year: e.target.value })}
                  className="mr-1"
                  required
                />
                {year}
              </label>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Semester:</label>
            {['Sem1', 'Sem2'].map((sem) => (
              <label key={sem} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="semester"
                  value={sem}
                  checked={watData.semester === sem}
                  onChange={(e) => setWatData({ ...watData, semester: e.target.value })}
                  className="mr-1"
                  required
                />
                {sem}
              </label>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block font-medium">WAT Number:</label>
            {['1', '2', '3', '4'].map((num) => (
              <label key={num} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="watNumber"
                  value={num}
                  checked={watData.watNumber === num}
                  onChange={(e) => setWatData({ ...watData, watNumber: e.target.value })}
                  className="mr-1"
                  required
                />
                WAT {num}
              </label>
            ))}
          </div>

          <input
            type="number"
            placeholder="Number of Questions"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(parseInt(e.target.value))}
            required
            className="w-full border p-2"
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </form>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}</h3>
          <textarea
            placeholder="Paste question and options here"
            value={pastedInput}
            onChange={(e) => {
              setPastedInput(e.target.value);
              handlePasteQuestion(e);
            }}
            className="w-full border p-2 mb-2"
            rows="5"
          />
          <div className="mb-2">
            <label className="block">Question:</label>
            <input
              type="text"
              value={currentQuestion.questionText}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
              className="w-full border p-2 mb-2"
              required
            />
          </div>
          {currentQuestion.options.map((opt, i) => (
            <div key={i} className="mb-2">
              <label className="block">Option {i + 1}:</label>
              <input
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...currentQuestion.options];
                  newOptions[i] = e.target.value;
                  setCurrentQuestion({ ...currentQuestion, options: newOptions });
                }}
                className="w-full border p-2"
                required
              />
            </div>
          ))}
          <label className="block my-2">Correct Option (Index: 0-3)</label>
          <input
            type="number"
            min="0"
            max="3"
            value={currentQuestion.correctOptionIndex}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctOptionIndex: parseInt(e.target.value) })}
            className="w-full border p-2 mb-4"
            required
          />
          <button onClick={handleQuestionSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            {currentQuestionIndex + 1 === totalQuestions ? 'Next (Timing)' : 'Next Question'}
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold">Schedule WAT</h3>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={watData.startTime}
            onChange={(e) => setWatData({ ...watData, startTime: e.target.value })}
            required
            className="w-full border p-2"
          />
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={watData.endTime}
            onChange={(e) => setWatData({ ...watData, endTime: e.target.value })}
            required
            className="w-full border p-2"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit WAT</button>
        </form>
      )}
    </div>
  );
}
