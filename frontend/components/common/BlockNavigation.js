"use client";
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';

const BlockNavigation = () => {
  const pathname = usePathname();
  const [blocks, setBlocks] = useState(() => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('blocks') || '[]');
  });
  
  useEffect(() => {
    const updateBlocks = () => {
      const newLabel = pathname === '/' ? 'Home' : pathname.split('/').pop().replace(/-/g, ' ');
      setBlocks(prevBlocks => {
        const existingBlockIndex = prevBlocks.findIndex(block => block.link === pathname);
        if (existingBlockIndex === -1) {
          return [...prevBlocks.map(block => ({ ...block, active: false })), 
                  { label: newLabel, link: pathname, active: true, closeable: true }];
        }
        return prevBlocks.map((block, index) => ({ ...block, active: index === existingBlockIndex }));
      });
    };
    updateBlocks();
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem('blocks', JSON.stringify(blocks));
  }, [blocks]);

  const closeBlock = useCallback((e, link) => {
    e.preventDefault();
    e.stopPropagation();
    setBlocks(prevBlocks => prevBlocks.filter(block => block.link !== link));
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 p-1 overflow-x-auto">
      <ul className="flex space-x-1">
        {blocks.map((block, index) => (
          <li key={index} className="relative">
            <Link 
              href={block.link}
              className={`block px-4 py-1 text-sm rounded-md transition-colors duration-200
                ${block.active 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {block.label}
              {block.closeable && (
                <button 
                  onClick={(e) => closeBlock(e, block.link)} 
                  className="ml-2 focus:outline-none hover:text-red-500"
                  aria-label={`Close ${block.label}`}
                >
                  <FaTimes size={12} />
                </button>
              )}
            </Link>
            {block.active && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BlockNavigation;