import { ProgramWithModules, Program } from "../types/types";

const transformProgramsToModules = (programs: Program[]): ProgramWithModules[] => {
    return programs
      .filter(program => program.specializedSubjects?.some(subject => subject.skills?.length > 0))
      .slice(0, 5)
      .map(program => {
        const allSkillsTitles = program.specializedSubjects.flatMap(subject =>
          subject.skills.map(skill => skill.title)
        );
        const halfIndex = Math.ceil(allSkillsTitles.length / 2);
        return {
          programTitle: program.title,
          modules: [
            { moduleName: "1 модуль", skillsTitles: allSkillsTitles.slice(0, halfIndex) },
            { moduleName: "2 модуль", skillsTitles: allSkillsTitles.slice(halfIndex) }
          ]
        };
      });
  }

export default transformProgramsToModules; 