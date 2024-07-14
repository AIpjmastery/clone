import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const parseContent = (content) => {
  const parts = content.split(/(\[img:.+?\]|\[.+?\]\(.+?\))/g);

  return parts.map((part, index) => {
    if (part.startsWith('[img:') && part.endsWith(']')) {
      const src = part.slice(5, -1);
      return (
        <div key={index} style={{ display: 'inline-block', margin: '10px 0' }}>
          <img src={src} alt="Image" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      );
    } else if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const text = part.slice(1, part.indexOf(']('));
      const href = part.slice(part.indexOf('](') + 2, -1);
      return (
        <a key={index} href={href} style={{ color: 'blue', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      );
    }
    return <p key={index}>{part}</p>;
  });
};

const Section = ({ sectionData, progressData }) => {
  const router = useRouter();
  const { id } = router.query;
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const handleNext = () => {
    if (currentParagraph < sectionData.paragraphs.length - 1) {
      setCurrentParagraph(currentParagraph + 1);
    } else {
      finishSection();
    }
  };

  const finishSection = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    await fetch(`/api/progress/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        lessonId: sectionData.lesson_id,
        sectionId: id,
      }),
    });

    router.push(`/lesson/${sectionData.lesson_id}`);
  };

  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <Head>
        <title>{sectionData.title}</title>
      </Head>
      <div className="flex flex-col items-center max-w-xs mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">{sectionData.title}</h1>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
          <div
            className="h-full bg-purple-500 rounded-full"
            style={{ width: `${((currentParagraph + 1) / sectionData.paragraphs.length) * 100}%` }}
          ></div>
        </div>
        <div className="mb-4">
          {parseContent(sectionData.paragraphs[currentParagraph])}
        </div>
        <button
          onClick={handleNext}
          className="bg-purple-600 text-white w-full py-2 rounded"
        >
          {currentParagraph < sectionData.paragraphs.length - 1 ? 'Next' : 'Finish Lesson'}
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  let sectionData = {};
  try {
    const sectionRes = await fetch(`http://localhost:3000/api/sections/${id}`);
    if (sectionRes.ok) {
      sectionData = await sectionRes.json();
    } else {
      console.error('Error fetching section data:', sectionRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching section data:', error);
  }

  let progressData = {};
  try {
    const progressRes = await fetch(`http://localhost:3000/api/progress/${id}`);
    if (progressRes.ok) {
      progressData = await progressRes.json();
    } else {
      console.error('Error fetching progress data:', progressRes.statusText);
    }
  } catch (error) {
    console.error('Error fetching progress data:', error);
  }

  return {
    props: {
      sectionData,
      progressData,
    },
  };
}

export default Section;
