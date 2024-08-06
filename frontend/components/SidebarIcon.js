"use client"; // Add this directive at the top

const SidebarIcon = ({ toggle }) => {
  return (
    <button onClick={toggle} className="p-2 focus:outline-none">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  );
};

export default SidebarIcon;
