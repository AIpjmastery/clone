import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [progress, setProgress] = useState([]);
  const [validSubscription, setValidSubscription] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentLessonProgress, setCurrentLessonProgress] = useState(0); // New state for progress
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const checkSubscription = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/validate-subscription', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.valid) {
          router.push('/login');
        } else {
          setValidSubscription(true);
        }
      } catch (error) {
        console.error('Error validating subscription:', error);
        router.push('/login');
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/student-progress', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProgress(data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    const fetchLessons = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/lessons', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    checkSubscription();
    fetchProgress();
    fetchLessons();
  }, [router]);

  useEffect(() => {
    if (lessons.length > 0 && progress.length > 0) {
      const lastProgress = progress[progress.length - 1];
      const lastLesson = lessons.find(lesson => lesson.id === lastProgress.lesson_id) || lessons[0];
      setCurrentLesson(lastLesson);
    } else if (lessons.length > 0) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons, progress]);

  useEffect(() => {
    const fetchCurrentLessonProgress = async () => {
      if (currentLesson) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:3000/api/lessons/${currentLesson.id}/sections`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const sectionsData = await response.json();
          const totalSections = sectionsData.length;
          const completedSections = progress.filter(p => p.lesson_id === currentLesson.id && p.completed).length;
          const progressPercentage = totalSections > 0 ? Math.min((completedSections / totalSections) * 100, 100) : 0;
          setCurrentLessonProgress(progressPercentage);
        } catch (error) {
          console.error('Error fetching current lesson progress:', error);
        }
      }
    };

    fetchCurrentLessonProgress();
  }, [currentLesson, progress]);

  if (!validSubscription) {
    return <div>Loading...</div>;
  }

  const handleLessonClick = async (lesson) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/lessons/${lesson.id}/sections`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const sections = await response.json();
      setCurrentLesson({ ...lesson, sections });
      router.push(`/lesson/${lesson.id}?title=${encodeURIComponent(lesson.title)}&image=${encodeURIComponent(lesson.image_url)}`);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const handleContinueLearning = () => {
    if (currentLesson) {
      router.push(`/lesson/${currentLesson.id}?title=${encodeURIComponent(currentLesson.title)}&image=${encodeURIComponent(currentLesson.image_url)}`);
    }
  };

  return (
    <div>
      <Head>
        <title></title>
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
      <div className="max-w-lg mx-auto p-4" style={{ maxWidth: '400px' }}>
        <h1 className="text-2xl font-bold text-center text-purple-700 my-4"></h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Current Lesson</h2>
          {currentLesson && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img src={currentLesson.image_url} alt={currentLesson.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-purple-700">{currentLesson.title}</h3>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-purple-700" style={{ width: `${currentLessonProgress}%` }}></div>
                </div>
                <button 
                  className="bg-purple-700 text-white py-2 px-4 rounded mt-4 w-full hover:bg-purple-800"
                  onClick={handleContinueLearning}
                >
                  Continue learning
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Recommended for you</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lessons.filter(lesson => lesson.title !== 'Introduction').map((lesson) => (
              <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" key={lesson.id} onClick={() => handleLessonClick(lesson)}>
                <img src={lesson.image_url} alt={lesson.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-md font-semibold text-purple-700">{lesson.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
