import { Project } from "@/src/application/domain/project.domain";
import { ProjectInterface } from "@/src/application/interface/project.interface";

export class GetProjectUseCase {
  constructor(private projectRepository: ProjectInterface) {}

  async execute(id: string): Promise<Project | null> {
    console.log("[GetProjectUseCase] Starting execution", {
      projectId: id,
    });

    try {
      console.log("[GetProjectUseCase] Calling repository to find project by ID");
      const project = await this.projectRepository.findById(id);

      if (project) {
        console.log("[GetProjectUseCase] Project found", {
          projectId: id,
          projectName: project.name,
        });
      } else {
        console.warn("[GetProjectUseCase] Project not found", {
          projectId: id,
        });
      }

      return project;
    } catch (error) {
      console.error("[GetProjectUseCase] Error fetching project:", error);
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
    console.log("[GetProjectsUseCase] Starting execution - fetching all projects");

    try {
      console.log("[GetProjectsUseCase] Calling repository to find all projects");
      const projects = await this.projectRepository.findAll();

      console.log("[GetProjectsUseCase] Projects retrieved successfully", {
        count: projects.length,
        projectNames: projects.map(p => p.name),
      });

      return projects;
    } catch (error) {
      console.error("[GetProjectsUseCase] Error fetching projects:", error);
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
    console.log("[GetProjectBySlugUseCase] Starting execution", {
      slug,
    });

    try {
      console.log("[GetProjectBySlugUseCase] Calling repository to find project by slug");
      const project = await this.projectRepository.findBySlug(slug);

      if (project) {
        console.log("[GetProjectBySlugUseCase] Project found", {
          slug,
          projectName: project.name,
          projectId: project.id,
        });
      } else {
        console.warn("[GetProjectBySlugUseCase] Project not found", {
          slug,
        });
      }

      return project;
    } catch (error) {
      console.error("[GetProjectBySlugUseCase] Error fetching project:", error);
      throw new Error(
        `Failed to fetch project: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
