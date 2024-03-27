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

type ProgramWithSkillsTitles = {
  programTitle: string;
  skillsTitles: string[];
};

const ProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramWithSkillsTitles[]>([]);

  useEffect(() => {
    const fetchProgramsData = async () => {
      try {
        const response = await fetch('https://api.moscow.mba/products');
        const jsonData: Program[] = await response.json();
        const filteredPrograms = jsonData
          .filter(program => program.specializedSubjects && program.specializedSubjects.length > 0)
          .slice(0, 5);

        const programsWithSkillsTitles: ProgramWithSkillsTitles[] = filteredPrograms.map(program => ({
          programTitle: program.title,
          // Предполагается, что каждая программа имеет хотя бы один specializedSubject,
          // и мы собираем titles из всех skills этих subjects.
          skillsTitles: program.specializedSubjects.flatMap(subject => 
            subject.skills.map(skill => skill.title)
          ),
        }));

        setPrograms(programsWithSkillsTitles);
      } catch (error) {
        console.error('There was an error fetching the programs:', error);
      }
    };

    fetchProgramsData();
  }, []);

  return (
    <div>
      <h1>Специализированные дисциплины</h1>
      {programs.map((program, index) => (
        <div key={index}>
          <h1>{program.programTitle}</h1>
          <ul>
            {program.skillsTitles.map((title, skillIndex) => (
              <li key={skillIndex}>{title}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProgramsPage;
