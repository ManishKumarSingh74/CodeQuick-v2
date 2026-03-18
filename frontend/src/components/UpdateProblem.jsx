import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';


const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).length(3, 'All three languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).length(3, 'All three languages required')
});

function UpdateProblem() {
  const navigate = useNavigate();
  const { problemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [problemData, setProblemData] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
        title: '',
        description: '',
        difficulty: 'easy',
        tags:'array',
        visibleTestCases: [
            { input: '', output: '', explanation: '' }
        ],
        hiddenTestCases:[
            { input: '', output: '' }
        ],

      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const normalizeLang = (lang) => {
  switch (lang.toLowerCase()) {
    case 'cpp':
      return 'C++';
    case 'java':
      return 'Java';
    case 'javascript':
      return 'JavaScript';
    default:
      return lang;
  }
};

useEffect(() => {
  const fetchProblem = async () => {
    try {
      setLoading(true);

      const { data } = await axiosClient.get(
        `/problem/problemById/${problemId}`
      );

      reset({
        title: data.title || '',
        description: data.description || '',
        difficulty: data.difficulty || 'easy',
        tags: data.tags || '',

        visibleTestCases: data.visibleTestCases?.map(tc => ({
          input: tc.input || '',
          output: tc.output || '',
          explanation: tc.explanation || '',
        })) || [{ input: '', output: '', explanation: '' }],

        hiddenTestCases: data.hiddenTestCases?.map(tc => ({
          input: tc.input || '',
          output: tc.output || '',
        })) || [{ input: '', output: '' }],

        startCode: data.startCode?.map(sc => ({
          language: normalizeLang(sc.language),
          initialCode: sc.initialCode || '',
        })),

        referenceSolution: data.referenceSolution?.map(rs => ({
          language: normalizeLang(rs.language),
          completeCode: rs.completeCode || '',
        })),
      });
      setProblemData(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch problem');
      setLoading(false);
    }
  };

  if (problemId) {
    fetchProblem();
  }
}, [problemId, reset]);

console.log(problemData);
console.log(problemId);

//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         const response = await axiosClient.get(`/problem/problemById/${id}`);
//         const problemData = response.data;
        
//         // Reset form with fetched data
//         reset({
//           title: problemData.title,
//           description: problemData.description,
//           difficulty: problemData.difficulty,
//           tags: problemData.tags,
//           visibleTestCases: problemData.visibleTestCases,
//           hiddenTestCases: problemData.hiddenTestCases,
//           startCode: problemData.startCode,
//           referenceSolution: problemData.referenceSolution
//         });
        
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch problem');
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchProblem();
//     }
//   }, [id, reset]);


  const onSubmit = async (data) => {
    console.log('Updated Problem Data:', data);
    try {
      await axiosClient.put(`/problem/update/${problemId}`, data);
      alert('Problem updated successfully!');
      navigate('/adminpanel');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-lg">Loading problem...</p>
        </div>
      </div>
    );
  }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </div>
//           <p className="text-rose-400 text-lg mb-4">{error}</p>
//           <button
//             onClick={() => navigate('/adminpanel')}
//             className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
//           >
//             Back to Admin Panel
//           </button>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/adminpanel')}
            className="mb-4 flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Admin Panel
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Update Problem</h1>
              <p className="text-slate-400 mt-1">Modify existing coding challenge</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-6xl">
          {/* Basic Information */}
          <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-white">Basic Information</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Problem Title
                </label>
                <input
                  {...register('title')}
                  
                  placeholder="Enter problem title"
                  className={`w-full bg-slate-900/50 border ${errors.title ? 'border-rose-500/50' : 'border-slate-700/50'} rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                />
                {errors.title && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  placeholder="Enter problem description"
                  rows={6}
                  className={`w-full bg-slate-900/50 border ${errors.description ? 'border-rose-500/50' : 'border-slate-700/50'} rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none`}
                />
                {errors.description && (
                  <p className="text-rose-400 text-sm mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Difficulty Level
                  </label>
                  <select
                    {...register('difficulty')}
                    className={`w-full bg-slate-900/50 border ${errors.difficulty ? 'border-rose-500/50' : 'border-slate-700/50'} rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Problem Tag
                  </label>
                  <select
                    {...register('tags')}
                    className={`w-full bg-slate-900/50 border ${errors.tags ? 'border-rose-500/50' : 'border-slate-700/50'} rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                  >
                    <option value="array">Array</option>
                    <option value="linkedList">Linked List</option>
                    <option value="graph">Graph</option>
                    <option value="dp">DP</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Test Cases */}
          <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-white">Test Cases</h2>
            </div>
            
            {/* Visible Test Cases */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-200">Visible Test Cases</h3>
                <button
                  type="button"
                  onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Test Case
                </button>
              </div>
              
              <div className="space-y-4">
                {visibleFields.map((field, index) => (
                  <div key={field.id} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400 font-medium">Test Case {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeVisible(index)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-sm transition-all flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <input
                        {...register(`visibleTestCases.${index}.input`)}
                        placeholder="Input"
                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                      
                      <input
                        {...register(`visibleTestCases.${index}.output`)}
                        placeholder="Output"
                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                      
                      <textarea
                        {...register(`visibleTestCases.${index}.explanation`)}
                        placeholder="Explanation"
                        rows={2}
                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden Test Cases */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-200">Hidden Test Cases</h3>
                <button
                  type="button"
                  onClick={() => appendHidden({ input: '', output: '' })}
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Test Case
                </button>
              </div>
              
              <div className="space-y-4">
                {hiddenFields.map((field, index) => (
                  <div key={field.id} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400 font-medium">Hidden Test Case {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeHidden(index)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-sm transition-all flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <input
                        {...register(`hiddenTestCases.${index}.input`)}
                        placeholder="Input"
                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                      
                      <input
                        {...register(`hiddenTestCases.${index}.output`)}
                        placeholder="Output"
                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Templates */}
          <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h2 className="text-2xl font-bold text-white">Code Templates</h2>
            </div>
            
            <div className="space-y-6">
              {[0, 1, 2].map((index) => (
                <div key={index} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <span className="text-purple-400 font-semibold text-sm">
                        {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">
                        Initial Code Template
                      </label>
                      <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-4">
                        <textarea
                          {...register(`startCode.${index}.initialCode`)}
                          placeholder="Enter starter code..."
                          className="w-full bg-transparent text-slate-300 font-mono text-sm focus:outline-none resize-none"
                          rows={6}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">
                        Reference Solution
                      </label>
                      <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg p-4">
                        <textarea
                          {...register(`referenceSolution.${index}.completeCode`)}
                          placeholder="Enter complete solution..."
                          className="w-full bg-transparent text-slate-300 font-mono text-sm focus:outline-none resize-none"
                          rows={6}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/adminpanel')}
              className="px-8 py-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 text-slate-200 font-semibold transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update Problem
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        select option {
          background-color: rgb(15 23 42);
          color: rgb(226 232 240);
        }
      `}</style>
    </div>
  );
}

export default UpdateProblem;