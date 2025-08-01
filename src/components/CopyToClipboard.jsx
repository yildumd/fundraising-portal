import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

export default function CopyToClipboard({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <FiCheck className="text-green-500" />
      ) : (
        <FiCopy className="text-blue-500 dark:text-blue-400" />
      )}
    </button>
  );
}