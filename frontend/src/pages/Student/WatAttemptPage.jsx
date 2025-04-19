// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function WATAttemptPage() {
//   const { id } = useParams(); // WAT ID from URL
//   const [wat, setWat] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(null);
//   const [student, setStudent] = useState(null);
//   const [correctAnswers, setCorrectAnswers] = useState([]);

//   useEffect(() => {
//     try {
//       const storedStudent = localStorage.getItem("student");
//       if (storedStudent) {
//         const parsed = JSON.parse(storedStudent);
//         if (parsed?.user?.id) {
//           setStudent(parsed);
//         } else {
//           console.warn("Student object is invalid:", parsed);
//         }
//       } else {
//         console.warn("Student not found in localStorage.");
//       }
//     } catch (err) {
//       console.error("Error parsing student from localStorage:", err);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchWat = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/wats/${id}`);
//         setWat(res.data);
//         setAnswers(Array(res.data.questions.length).fill(null));
//       } catch (err) {
//         console.error('Error fetching WAT:', err);
//       }
//     };

//     fetchWat();
//   }, [id]);

//   const handleAnswerChange = (index, selectedOption) => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[index] = selectedOption;
//     setAnswers(updatedAnswers);
//   };

//   const handleSubmit = async () => {
//     if (!student?.user?.id) {
//       alert('Student data not found. Please log in again.');
//       return;
//     }

//     if (answers.includes(null)) {
//       alert('Please answer all questions before submitting.');
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/wats/submit', {
//         watId: wat._id,
//         studentId: student.user.id,
//         answers: wat.questions.map((q, index) => ({
//           questionId: q._id,
//           selectedOption: answers[index],
//         })),
//       });

//       // Use the score from the backend response
//       setScore(res.data.score);
//       setCorrectAnswers(res.data.correctAnswers);
//       setSubmitted(true);
//       alert('WAT submitted successfully!');
//     } catch (err) {
//       if (err.response?.status === 400) {
//         alert(err.response.data.error || 'You have already submitted this WAT.');
//       } else {
//         console.error('Submit error:', err);
//         alert('Submission failed. Please try again.');
//       }
//     }
//   };

//   if (!wat) return <p className="text-center mt-6">Loading WAT...</p>;

//   const getCorrectAnswer = (questionId) => {
//     const correct = correctAnswers.find(ca => ca.questionId === questionId);
//     return correct?.correctAnswer; // Note the field name change from correctOption to correctAnswer
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4 text-blue-700">
//         {wat.subject} - WAT {wat.watNumber}
//       </h2>

//       {wat.questions.map((question, index) => {
//         const studentAnswer = answers[index];
//         const correctAnswer = getCorrectAnswer(question._id);

//         return (
//           <div key={question._id} className="mb-6">
//             <p className="font-medium mb-2">
//               Q{index + 1}. {question.questionText}
//             </p>
//             <ul className="space-y-2">
//               {question.options.map((opt, i) => {
//                 let optionStyle = '';
//                 if (submitted) {
//                   if (opt === correctAnswer) {
//                     optionStyle = 'text-green-600 font-semibold';
//                   } else if (opt === studentAnswer && studentAnswer !== correctAnswer) {
//                     optionStyle = 'text-red-600';
//                   }
//                 }

//                 return (
//                   <li key={i} className="flex items-center">
//                     <input
//                       type="radio"
//                       name={`question-${index}`}
//                       value={opt}
//                       checked={answers[index] === opt}
//                       onChange={() => handleAnswerChange(index, opt)}
//                       disabled={submitted}
//                       className="mr-2"
//                     />
//                     <span className={optionStyle}>{opt}</span>
//                   </li>
//                 );
//               })}
//             </ul>

//             {submitted && studentAnswer !== correctAnswer && (
//               <p className="mt-2 text-sm text-green-700">
//                 ✅ Correct Answer: <span className="font-semibold">{correctAnswer}</span>
//               </p>
//             )}
//           </div>
//         );
//       })}

//       {!submitted && (
//         <button
//           className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//           onClick={handleSubmit}
//         >
//           Submit Answers
//         </button>
//       )}

//       {submitted && (
//         <div className="mt-4">
//           <p className="text-green-600 font-medium">WAT has been submitted successfully.</p>
//           {score !== null && (
//             <p className="text-blue-700 font-bold mt-2">
//               Your Score: {score} / {wat.questions.length}
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// CSS styles to prevent text selection and make full screen
const pageStyles = `
  .full-screen-page {
    min-height: 100vh;
    width: 100%;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  .disable-selection {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .disable-selection input {
    user-select: auto;
  }
  
  .quiz-container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 768px) {
    .quiz-container {
      padding: 15px;
    }
  }
`;

export default function WATAttemptPage() {
  const { id } = useParams();
  const [wat, setWat] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [student, setStudent] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    try {
      const storedStudent = localStorage.getItem("student");
      if (storedStudent) {
        const parsed = JSON.parse(storedStudent);
        if (parsed?.user?.id) {
          setStudent(parsed);
        } else {
          console.warn("Student object is invalid:", parsed);
        }
      } else {
        console.warn("Student not found in localStorage.");
      }
    } catch (err) {
      console.error("Error parsing student from localStorage:", err);
    }
  }, []);
  // Utility to shuffle an array (Fisher-Yates algorithm)
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

  useEffect(() => {
    const fetchWat = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/wats/${id}`);
        const originalWat = res.data;
  
        // Shuffle questions
        const shuffledQuestions = shuffleArray(originalWat.questions).map(q => {
          return {
            ...q,
            options: shuffleArray(q.options), // Shuffle options too
          };
        });
  
        setWat({
          ...originalWat,
          questions: shuffledQuestions,
        });
  
        setAnswers(Array(shuffledQuestions.length).fill(null));
      } catch (err) {
        console.error('Error fetching WAT:', err);
      }
    };
  
    fetchWat();
  }, [id]);
  
  const handleAnswerChange = (index, selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = selectedOption;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    if (!student?.user?.id) {
      alert('Student data not found. Please log in again.');
      return;
    }

    if (answers.includes(null)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/wats/submit', {
        watId: wat._id,
        studentId: student.user.id,
        answers: wat.questions.map((q, index) => ({
          questionId: q._id,
          selectedOption: answers[index],
        })),
      });

      setScore(res.data.score);
      setCorrectAnswers(res.data.correctAnswers);
      setSubmitted(true);
      alert('WAT submitted successfully!');
    } catch (err) {
      if (err.response?.status === 400) {
        alert(err.response.data.error || 'You have already submitted this WAT.');
      } else {
        console.error('Submit error:', err);
        alert('Submission failed. Please try again.');
      }
    }
  };

  if (!wat) return <div className="full-screen-page flex items-center justify-center">Loading WAT...</div>;

  const getCorrectAnswer = (questionId) => {
    const correct = correctAnswers.find(ca => ca.questionId === questionId);
    return correct?.correctAnswer;
  };

  return (
    <>
      <style>{pageStyles}</style>
      
      <div className="full-screen-page disable-selection">
        <div className="quiz-container">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
            {wat.subject} - WAT {wat.watNumber}
          </h2>

          {wat.questions.map((question, index) => {
            const studentAnswer = answers[index];
            const correctAnswer = getCorrectAnswer(question._id);

            return (
              <div key={question._id} className="mb-8 p-4 border-b border-gray-200 last:border-0">
                <p className="font-medium mb-3 text-lg">
                  Q{index + 1}. {question.questionText}
                </p>
                <ul className="space-y-3">
                  {question.options.map((opt, i) => {
                    let optionStyle = 'hover:bg-gray-50 p-2 rounded';
                    if (submitted) {
                      if (opt === correctAnswer) {
                        optionStyle = 'bg-green-50 text-green-700 font-semibold p-2 rounded';
                      } else if (opt === studentAnswer && studentAnswer !== correctAnswer) {
                        optionStyle = 'bg-red-50 text-red-600 p-2 rounded';
                      }
                    }

                    return (
                      <li key={i} className="flex items-center">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={opt}
                          checked={answers[index] === opt}
                          onChange={() => handleAnswerChange(index, opt)}
                          disabled={submitted}
                          className="mr-3 h-5 w-5"
                        />
                        <span className={`${optionStyle} flex-1`}>{opt}</span>
                      </li>
                    );
                  })}
                </ul>

                {submitted && studentAnswer !== correctAnswer && (
                  <p className="mt-3 text-sm text-green-700 bg-green-50 p-2 rounded">
                    ✅ Correct Answer: <span className="font-semibold">{correctAnswer}</span>
                  </p>
                )}
              </div>
            );
          })}

          <div className="mt-8 text-center">
            {!submitted && (
              <button
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg font-medium transition-colors"
                onClick={handleSubmit}
              >
                Submit Answers
              </button>
            )}

            {submitted && (
              <div className="mt-6">
                <p className="text-green-600 font-medium text-lg">WAT has been submitted successfully.</p>
                {score !== null && (
                  <p className="text-blue-700 font-bold mt-3 text-xl">
                    Your Score: {score} / {wat.questions.length}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}