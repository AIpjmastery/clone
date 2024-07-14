import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4" style={{ maxWidth: '400px' }}>
        <div className="flex items-center">
          <Image src="/images/Modern Creative Technology Logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold ml-2">App Name</h1>
        </div>
        <nav className="flex space-x-4">
          <Link href="/subscription">
            <a className="text-gray-700 hover:text-purple-700">Subscription</a>
          </Link>
          <Link href="/help">
            <a className="text-gray-700 hover:text-purple-700">Help</a>
          </Link>
          <Link href="/feedback">
            <a className="text-gray-700 hover:text-purple-700">Feedback</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
