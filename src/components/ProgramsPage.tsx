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
    <main className='max-w-7xl mx-auto box-border pt-[71px] pb-[171px]'>
      <h2 className='text-4xl font-bold text-center pb-[89px]'>Специализированные дисциплины</h2>
      {programs?.map((program, index) => (
        <div key={index}>
          <h3 className='text-[26px] font-bold pb-[54px]'>{program.programTitle}</h3>
          <div className='flex gap-[45px]'>
          {program.modules?.map((module, modIndex) => (
            <div key={modIndex} className='flex gap-[82px] pb-[68px]'>
              <h4 className='text-[32px] module-title'>{module.moduleName}</h4>
              <ul className='max-w-[373px] custom-bullet flex flex-col gap-[10px]'>
                {module.skillsTitles?.map((title, skillIndex) => (
                  <li key={skillIndex} className='font-light text-base'>{title}</li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>
      ))}
      <div className='flex gap-[30px]'>
        <div className='flex flex-col gap-[10px] w-[628px] h-[293px] info-accent px-[57px] py-[52px] box-border'>
          <h4 className='font-bold text-[36px] text-white mb-6'>Практические модули</h4>
          <p className='text-xl text-white font-light'>Работа над собственными проектами: практика групповых взаимодействий, кейс-методы, эссе</p>
        </div>
        <div className='flex flex-col w-[628px] h-[293px] px-[57px] py-[52px] bg-[#2D2C2A] box-border'>
          <h4 className='font-bold text-[36px] text-white mb-6'>Итоговая аттестация</h4>
          <ul className='custom-bullet text-xl text-white font-light leading-tight'>
            <li className='mb-[10px]'>Бизнес-проектирование (подготовка итоговой аттестационной работы, консультрование по бизнес-проектированию)</li>
            <li>Защита итоговой аттестационной работы</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ProgramsPage;
