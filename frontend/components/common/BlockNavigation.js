"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaTimes, FaHome, FaChartBar, FaTrash } from 'react-icons/fa';

const LOCAL_STORAGE_KEY = 'navigationBlocks';
const DEFAULT_BLOCKS = [
  { label: 'Home', link: '/', permanent: true },
  { label: 'Dashboard', link: '/dashboard', permanent: true }
];

const useNavigationBlocks = () => {
  const [blocks, setBlocks] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_BLOCKS;
    const storedBlocks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');

    const filteredBlocks = storedBlocks.filter((block, index, self) =>
      !(block.label === 'Home' && index !== self.findIndex(b => b.label === 'Home'))
    );

    return filteredBlocks.length ? filteredBlocks : DEFAULT_BLOCKS;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blocks));
    }
  }, [blocks]);

  return [blocks, setBlocks];
};

const BlockNavigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [blocks, setBlocks] = useNavigationBlocks();

  const updateBlocks = useCallback(() => {
    // Get section and mc parameters
    const section = searchParams.get('section');
    const mc = searchParams.get('mc');

    // Define routes to exclude from generating a block
    const excludedRoutes = ['/dashboard/analytics'];

    // Check if the current route should be excluded
    if (excludedRoutes.includes(pathname)) {
      return;
    }

    // Check for "HOME / PAGE NOT FOUND" in the header or 404 page data attribute
    const headerText = document.querySelector('header')?.textContent || '';
    const isPageNotFound = document.body.getAttribute('data-page-type') === 'not-found';

    if (headerText.includes('HOME / PAGE NOT FOUND') || isPageNotFound) {
      console.log("Page Not Found detected, not updating blocks");
      // No block creation, but also no block deletion
      return;
    }

    const pathSegments = pathname.split('/').filter(Boolean);

    const newLabel = getBlockLabel(pathSegments, section, mc);
    const fullLink = getFullLink(pathname, section, mc);

    setBlocks(prevBlocks => {
      const existingBlockIndex = prevBlocks.findIndex(block => block.link === fullLink);
      if (existingBlockIndex === -1) {
        return [
          ...prevBlocks.map(block => ({ ...block, active: false })),
          { label: newLabel, link: fullLink, active: true, permanent: false }
        ];
      }
      return prevBlocks.map((block, index) => ({ ...block, active: index === existingBlockIndex }));
    });
  }, [pathname, searchParams, setBlocks]);

  useEffect(() => {
    updateBlocks();
  }, [updateBlocks]);

  const closeBlock = useCallback((e, link) => {
    e.preventDefault();
    e.stopPropagation();
    setBlocks(prevBlocks => prevBlocks.filter(block => block.link !== link || block.permanent));
  }, [setBlocks]);

  const deleteAllBlocks = () => {
    setBlocks(DEFAULT_BLOCKS);
  };

  const blockItems = useMemo(() => blocks.map((block) => (
    <BlockItem
      key={block.link}
      block={block}
      closeBlock={closeBlock}
    />
  )), [blocks, closeBlock]);

  return (
    <nav className="bg-blue-900 p-1 shadow-lg">
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 whitespace-nowrap">
        {blockItems}
        <button
          onClick={deleteAllBlocks}
          className="p-1 text-white hover:bg-red-700 rounded-full transition-colors duration-200 absolute right-4"
          aria-label="Delete all blocks except defaults"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </nav>
  );
};

const BlockItem = React.memo(({ block, closeBlock }) => (
  <div className="relative">
    <Link 
      href={block.link}
      className={`
        inline-flex items-center px-2 py-1 rounded-md transition-all duration-200
        text-sm ${block.active ? 'bg-white text-black shadow-md border border-gray-300' : 'text-white hover:bg-blue-500 border border-gray-100'}
      `}
      style={{ transform: 'translateX(5px)' }}
    >
      {block.label === 'Home' && <FaHome className="mr-1" />}
      {block.label === 'Dashboard' && <FaChartBar className="mr-1" />}
      <span>{block.label}</span>
      {!block.permanent && (
        <button 
          onClick={(e) => closeBlock(e, block.link)} 
          className="ml-1 text-gray-400 hover:text-red-500 transition-colors duration-200 focus:outline-none"
          aria-label={`Close ${block.label}`}
        >
          <FaTimes size={12} />
        </button>
      )}
    </Link>
    {block.active && (
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm" />
    )}
  </div>
));

BlockItem.displayName = 'BlockItem';

function getBlockLabel(pathSegments, section, mc) {
  if (section && mc) {
    return `${capitalizeFirstLetter(pathSegments[pathSegments.length - 1])} ${section} ${mc}`;
  }
  if (pathSegments.length >= 2) {
    const previousSegment = pathSegments[pathSegments.length - 2].replace(/-/g, ' ');
    const lastSegment = pathSegments[pathSegments.length - 1].replace(/-/g, ' ');
    return `${previousSegment}/${lastSegment}`;
  }
  if (pathSegments.length === 1) {
    return capitalizeFirstLetter(pathSegments[0].replace(/-/g, ' '));
  }
  return 'Home';
}

function getFullLink(pathname, section, mc) {
  if (section && mc) {
    return `${pathname}?section=${section}&mc=${mc}`;
  }
  return pathname;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default BlockNavigation;
