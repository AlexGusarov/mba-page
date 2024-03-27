import React, { useState, useEffect } from 'react';
import ModuleCard from './ModuleCard';
import InfoCard from './InfoCard';
import Loader from './Loader';
import { ProgramWithModules } from '../types/types';
import fetchPrograms from '../api/fetchProgram';
import transformProgramsToModules from '../utils/transformProgramsToModules';

const ProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramWithModules[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndTransformData = async () => {
      setIsLoading(true);
      try {
        const programsData = await fetchPrograms();
        const programsWithModules = transformProgramsToModules(programsData);
        setPrograms(programsWithModules);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка с получением учебных программ:', error);
        setIsLoading(false);
      }
    };

    fetchAndTransformData();
  }, []);

  return (
    <main className="max-w-7xl mx-auto box-border pt-[71px] pb-[171px]">
      <h2 className="text-4xl font-bold text-center pb-[89px]">
        Специализированные дисциплины
      </h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {programs?.map((program, index) => (
            <div key={index}>
              <h3 className="text-[26px] font-bold pb-[54px]">
                {program.programTitle}
              </h3>
              <div className="flex gap-[45px]">
                {program.modules?.map((module, modIndex) => (
                  <ModuleCard key={modIndex} module={module} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-[30px]">
            <InfoCard
              title="Практические модули"
              content="Работа над собственными проектами: практика групповых взаимодействий, кейс-методы, эссе"
              className="info-accent"
            />
            <InfoCard
              title="Итоговая аттестация"
              content={
                <ul className="custom-bullet text-xl text-white font-light leading-tight">
                  <li className="mb-[10px]">
                    Бизнес-проектирование (подготовка итоговой аттестационной
                    работы, консультрование по бизнес-проектированию)
                  </li>
                  <li>Защита итоговой аттестационной работы</li>
                </ul>
              }
              className="bg-[#2D2C2A]"
            />
          </div>
        </>
      )}
    </main>
  );
};

export default ProgramsPage;
