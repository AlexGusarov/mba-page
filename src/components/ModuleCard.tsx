import { Module } from '../types/types';

type ModuleCardProps = {
  module: Module;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => (
  <div className="flex gap-[82px] pb-[68px]">
    <h4 className="text-[32px] module-title">{module.moduleName}</h4>
    <ul className="max-w-[373px] custom-bullet flex flex-col gap-[10px]">
      {module.skillsTitles.map((title, skillIndex) => (
        <li key={skillIndex} className="font-light text-base">
          {title}
        </li>
      ))}
    </ul>
  </div>
);

export default ModuleCard;
