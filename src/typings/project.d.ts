declare namespace ProjectManagement {
  interface Project {
    id: string;
    name: string;
  }

  type CreateOrEditProjectDTO = Omit<Project, 'id'>;
}
