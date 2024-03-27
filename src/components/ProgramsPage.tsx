import React, { useState, useEffect } from 'react';

type Discipline = {
  id?: number;
  title: string;
};

type SpecializedSubject = {
  skills: Discipline[];
};

type Program = {
  id: number;
  title: string;
  specializedSubjects: SpecializedSubject[];
};

type Module = {
  moduleName: string;
  skillsTitles: string[];
};

type ProgramWithModules = {
  programTitle: string;
  modules: Module[];
};

const ProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramWithModules[]>([]);

  useEffect(() => {
    const fetchProgramsData = async () => {
      try {
        const response = await fetch('https://api.moscow.mba/products');
        const jsonData: Program[] = await response.json();
        const filteredPrograms = jsonData
          .filter(program => program.specializedSubjects?.some(subject => subject.skills?.length > 0))
          .slice(0, 5);

        const programsWithModules: ProgramWithModules[] = filteredPrograms.map(program => {
          const allSkillsTitles = program.specializedSubjects.flatMap(subject => 
            subject.skills.map(skill => skill.title)
          );
          const halfIndex = Math.ceil(allSkillsTitles.length / 2);
          const module1Titles = allSkillsTitles.slice(0, halfIndex);
          const module2Titles = allSkillsTitles.slice(halfIndex);

          return {
            programTitle: program.title,
            modules: [
              { moduleName: "1 модуль", skillsTitles: module1Titles },
              { moduleName: "2 модуль", skillsTitles: module2Titles }
            ]
          };
        });

        setPrograms(programsWithModules);
      } catch (error) {
        console.error('There was an error fetching the programs:', error);
      }
    };

    fetchProgramsData();
  }, []);

  return (
    <div className='max-w-screen-2xl mx-auto box-border pt-[71px]'>
      <h2 className='text-4xl font-bold text-center'>Специализированные дисциплины</h2>
      {programs?.map((program, index) => (
        <div key={index}>
          <h3 className='text-[26px] font-bold'>{program.programTitle}</h3>
          {program.modules?.map((module, modIndex) => (
            <div key={modIndex}>
              <h4 className='text-[32px]'>{module.moduleName}</h4>
              <ul>
                {module.skillsTitles?.map((title, skillIndex) => (
                  <li key={skillIndex} className='font-light text-base'>{title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProgramsPage;
