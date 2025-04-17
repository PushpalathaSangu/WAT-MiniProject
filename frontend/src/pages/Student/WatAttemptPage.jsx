import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function WATAttemptPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wat, setWat] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const student = JSON.parse(localStorage.getItem('student'));

  useEffect(() => {
    const fetchWat = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/wats/${id}`);
        const watData = res.data;
        const studentYear = student?.year;

        // Compare the student's year with the WAT year
        const watYear = new Date(watData.createdAt).getFullYear();
        
        if (studentYear !== watYear) {
          return alert("This WAT is not available for your year.");
        }

        setWat(watData);
        setAnswers(Array(watData.questions.length).fill(''));
      } catch (err) {
        console.error('Error fetching WAT:', err);
      }
    };

    fetchWat();
  }, [id, student]);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.some((a) => a.trim() === '')) {
      return alert('Please answer all the questions before submitting.');
    }

    try {
      await axios.post('http://localhost:5000/api/wats/submit', {
        watId: id,
        studentId: student._id,
        answers,
      });

      alert('Submitted successfully!');
      setSubmitted(true);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data.error === 'Already submitted') {
        alert('You have already submitted this WAT.');
        setSubmitted(true);
        navigate('/');
      } else {
        console.error('Submission error:', err);
      }
    }
  };

  if (!wat) {
    return <div className="text-center mt-10">Loading WAT...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{wat.subject} - WAT</h2>

      {wat.questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-medium">{i + 1}. {q}</p>
          <textarea
            className="w-full border border-gray-300 rounded mt-2 p-2"
            rows="4"
            value={answers[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            disabled={submitted}
          />
        </div>
      ))}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      )}
    </div>
  );
}
