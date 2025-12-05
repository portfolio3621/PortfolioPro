import { useState } from 'react';

const Clipboard = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="flex items-center">
      <div className="bg-gray-100 p-2 rounded-l-md border border-gray-300 truncate">
        Production url
      </div>
      <button
        onClick={copyToClipboard}
        className={`px-4 py-2 rounded-r-md border border-l-0 border-gray-300 font-medium transition-colors ${
          isCopied ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-50'
        }`}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default Clipboard;