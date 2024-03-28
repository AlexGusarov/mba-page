import React from 'react';

type ToggleIconProps = {
  isOpen: boolean;
  className?: string;
};

const ToggleIcon: React.FC<ToggleIconProps> = ({ isOpen, className }) => {
  return (
    <div
      className={`w-[18px] h-[18px] flex items-center justify-center relative ${className}`}
    >
      <span
        className="absolute bg-[#D9D9D9] w-[18px] h-[2px] transition-all duration-300 ease-in-out"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      ></span>
      <span
        className="absolute bg-[#D9D9D9] w-[2px] h-[18px] transition-transform duration-300 ease-in-out"
        style={{
          left: '50%',
          transform: `translateX(-50%) ${isOpen ? 'rotate(-90deg)' : 'rotate(0deg)'}`,
          transformOrigin: 'center',
        }}
      ></span>
    </div>
  );
};

export default ToggleIcon;
