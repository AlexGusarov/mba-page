import React, { useState, useEffect } from 'react';
import ToggleIcon from './ToggleIcon';
import { Module } from '../types/types';

type ModuleCardProps = {
  module: Module;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSkills = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col gap-[17px] md:flex-row md:gap-20 md:pb-17">
      <button
        onClick={toggleSkills}
        className={`w-[345px] h-[51px] flex items-center gap-[27px] px-6 mx-auto ${isOpen ? 'bg-red-accent text-white' : 'bg-[#F7F7F7] text-[#262626]'}  text-lg font-light md:hidden`}
      >
        <ToggleIcon isOpen={isOpen} />
        {module.moduleName}
      </button>
      <h4 className="hidden md:block module-title text-2xl font-bold ">
        {module.moduleName}
      </h4>
      <ul
        className={`custom-bullet flex flex-col gap-2.5 overflow-hidden mx-auto max-w-[345px] transition-all ease-in-out duration-700 ${
          isOpen ? 'max-h-96' : 'max-h-0 md:max-h-full'
        }`}
      >
        {module.skillsTitles.map((title, skillIndex) => (
          <li key={skillIndex} className="font-light text-base">
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleCard;
