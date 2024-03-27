export type Discipline = {
  id?: number;
  title: string;
};

export type SpecializedSubject = {
  skills: Discipline[];
};

export type Program = {
  id: number;
  title: string;
  specializedSubjects: SpecializedSubject[];
};

export type Module = {
  moduleName: string;
  skillsTitles: string[];
};

export type ProgramWithModules = {
  programTitle: string;
  modules: Module[];
};
