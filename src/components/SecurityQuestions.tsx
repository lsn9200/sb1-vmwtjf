import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './LoginHeader';
import LoginFooter from './LoginFooter';

interface SecurityQuestionsProps {
  onSubmit: (answers: SecurityAnswers) => void;
  onCancel: () => void;
}

interface SecurityAnswers {
  mothersMaidenName: string;
  highSchool: string;
  firstSchool: string;
}

export default function SecurityQuestions({ onSubmit, onCancel }: SecurityQuestionsProps) {
  const [answers, setAnswers] = useState<SecurityAnswers>({
    mothersMaidenName: '',
    highSchool: '',
    firstSchool: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <LoginHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="absolute top-0 right-0 p-4 text-gray-600">
            WALMART INC.
          </div>

          <h1 className="text-purple-800 text-2xl font-semibold mb-6">Login</h1>
          
          <div className="mb-6 text-gray-700">
            <p>The questions below were provided by you to enable us to validate your identity as a registered user of the employee participants site.</p>
            <p className="mt-4">Please check your answers carefully before submitting.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-purple-800 font-semibold mb-4 flex items-center">
                  Answer Security Questions
                  <span className="ml-2 text-gray-400">(?)</span>
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Security Question 1</label>
                    <div className="font-medium text-gray-600 mb-2">Mother's maiden name</div>
                    <input
                      type="text"
                      autoComplete="off"
                      value={answers.mothersMaidenName}
                      onChange={(e) => setAnswers({...answers, mothersMaidenName: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Security Question 2</label>
                    <div className="font-medium text-gray-600 mb-2">Name of high school</div>
                    <input
                      type="text"
                      autoComplete="off"
                      value={answers.highSchool}
                      onChange={(e) => setAnswers({...answers, highSchool: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Security Question 3</label>
                    <div className="font-medium text-gray-600 mb-2">Name of first school</div>
                    <input
                      type="text"
                      autoComplete="off"
                      value={answers.firstSchool}
                      onChange={(e) => setAnswers({...answers, firstSchool: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-purple-800 text-white hover:bg-purple-700 transition-colors"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <LoginFooter />
    </div>
  );
}