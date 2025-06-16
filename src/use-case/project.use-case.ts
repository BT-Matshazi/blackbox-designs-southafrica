import { Project } from "@/src/application/domain/project.domain";
import { ProjectInterface } from "@/src/application/interface/project.interface";

export class GetProjectUseCase {
  constructor(private projectRepository: ProjectInterface) {}

  async execute(id: string): Promise<Project | null> {
    try {
      const project = await this.projectRepository.findById(id);
      return project;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw new Error(
        `Failed to fetch project: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

export class GetProjectsUseCase {
  constructor(private projectRepository: ProjectInterface) {}

  async execute(): Promise<Project[]> {
    try {
      const projects = await this.projectRepository.findAll();
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error(
        `Failed to fetch projects: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

export class GetProjectBySlugUseCase {
  constructor(private projectRepository: ProjectInterface) {}

  async execute(slug: string): Promise<Project | null> {
    try {
      const project = await this.projectRepository.findBySlug(slug);
      return project;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw new Error(
        `Failed to fetch project: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
