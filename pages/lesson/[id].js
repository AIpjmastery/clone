import React, { useEffect, useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

const LessonContext = createContext();

const LessonProvider = ({ children }) => {
  const [parts, setParts] = useState([]);
  const [sections, setSections] = useState({});
  const [error, setError] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);

  return (
    <LessonContext.Provider value={{ parts, setParts, sections, setSections, error, setError, completedSections, setCompletedSections }}>
      {children}
    </LessonContext.Provider>
  );
};

const useLesson = () => useContext(LessonContext);

const fetchPartsAndSections = async (id, router, setParts, setSections, setError, setCompletedSections) => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }

  try {
    const partsResponse = await fetch(`http://localhost:3000/api/lessons/${id}/parts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!partsResponse.ok) {
      const errorData = await partsResponse.text();
      throw new Error(`Failed to fetch parts: ${errorData}`);
    }

    const partsData = await partsResponse.json();
    setParts(partsData);

    const sectionsResponse = await fetch(`http://localhost:3000/api/lessons/${id}/sections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!sectionsResponse.ok) {
      const errorData = await sectionsResponse.text();
      throw new Error(`Failed to fetch sections: ${errorData}`);
    }

    const sectionsData = await sectionsResponse.json();
    const sectionsMap = sectionsData.reduce((acc, section) => {
      if (!acc[section.part_id]) {
        acc[section.part_id] = [];
      }
      acc[section.part_id].push(section);
      return acc;
    }, {});
    setSections(sectionsMap);

    const progressResponse = await fetch(`http://localhost:3000/api/student-progress`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!progressResponse.ok) {
      const errorData = await progressResponse.text();
      throw new Error(`Failed to fetch student progress: ${errorData}`);
    }

    const progressData = await progressResponse.json();
    const completed = progressData
      .filter(progress => progress.lesson_id == id && progress.completed)
      .map(progress => progress.section_id);
    setCompletedSections(completed);

  } catch (error) {
    setError(error.message);
    console.error('Error fetching parts, sections or progress:', error);
  }
};

const updateProgress = async (lessonId, sectionId) => {
  try {
    const response = await fetch('/api/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ lessonId, sectionId }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to update progress: ${errorData}`);
    }
  } catch (error) {
    console.error('Error updating progress:', error);
  }
};

const LessonPage = () => {
  const { parts, setParts, sections, setSections, error, setError, completedSections, setCompletedSections } = useLesson();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { id, title, image } = router.query;

  useEffect(() => {
    if (id) {
      fetchPartsAndSections(id, router, setParts, setSections, setError, setCompletedSections);
    }
  }, [id, router]);

  const handleStartLesson = async (section) => {
    await updateProgress(id, section.id); // No need for user ID as it's decoded from the token on the server
    fetchPartsAndSections(id, router, setParts, setSections, setError, setCompletedSections);
    router.push({
      pathname: '/section/[id]',
      query: { id: section.id, title: section.title, content: section.content, image: section.image_url },
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (parts.length === 0) {
    return <div>Loading...</div>;
  }

  const totalSections = Object.values(sections).reduce((acc, partSections) => acc + partSections.length, 0);
  const progressPercentage = totalSections > 0 ? Math.min((completedSections.length / totalSections) * 100, 100) : 0;

  return (
    <div className="bg-white-100 min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="bg-white text-purple-700 p-4 flex justify-between items-center" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <img src="/images/Modern Creative Technology Logo.png" alt="Logo" className="h-12"/>
        <div className="relative">
          <button className="p-2 rounded hover:bg-purple-500" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-6 h-1 bg-purple-700 mb-1"></div>
            <div className="w-6 h-1 bg-purple-700"></div>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
              <a href="/subscription" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Subscription</a>
              <a href="/help" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Help</a>
              <a href="/feedback" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Feedback</a>
              <a href="/coming-soon" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Coming Soon</a>
            </div>
          )}
        </div>
      </header>
      <div className="max-w-xl mx-auto p-4" style={{ maxWidth: '400px' }}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-purple-700 mr-2"
          >
            ←
          </button>
          <h1 className="text-lg font-bold text-purple-700 text-center flex-1">{title}</h1>
        </div>
        {image && (
          <div className="flex justify-center h-20 mb-4">
            <img src={image} alt={title} onError={(e) => e.target.style.display = 'none'} className="rounded-lg shadow-md max-w-full h-auto" />
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-purple-700 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="space-y-4">
          {parts.map(part => (
            <Disclosure key={part.id}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-left text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>{part.title}</span>
                    {open ? <ChevronUpIcon className="w-5 h-5 text-purple-500" /> : <ChevronDownIcon className="w-5 h-5 text-purple-500" />}
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {sections[part.id]?.map((section, index) => {
                      const isCompleted = completedSections.includes(section.id);
                      const isLocked = index > 0 && !completedSections.includes(sections[part.id][index - 1].id);
                      return (
                        <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-4 flex" style={{ maxWidth: '400px' }}>
                          {section.image_url && (
                            <div className="w-20 h-20">
                              <img src={section.image_url} alt={section.title} className="w-full h-full object-cover rounded-l-lg" />
                            </div>
                          )}
                          <div className="flex-1 p-4">
                            <h3 className="text-sm font-semibold text-purple-700">{section.title}</h3>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2 w-full">
                                {isLocked ? (
                                  <span className="text-gray-400">🔒</span>
                                ) : (
                                  <button 
                                    className="w-full py-2 text-md rounded bg-purple-700 text-white hover:bg-purple-800"
                                    onClick={() => handleStartLesson(section)}
                                  >
                                    {isCompleted ? 'Finish Lesson' : 'Start Lesson'}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

const LessonPageWrapper = () => (
  <LessonProvider>
    <LessonPage />
  </LessonProvider>
);

export default LessonPageWrapper;
