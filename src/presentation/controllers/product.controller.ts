"use server";

import {
  GetProjectUseCase,
  GetProjectsUseCase,
  GetProjectBySlugUseCase,
} from "@/src/use-case/project.use-case";
import { ProjectRepository } from "@/src/infrastructure/project.infrastructure";

export async function getProjectController(id: string) {
  console.log("[GetProjectController] Fetching project by ID", {
    projectId: id,
    timestamp: new Date().toISOString(),
  });

  try {
    console.log("[GetProjectController] Instantiating ProjectRepository");
    const projectRepository = new ProjectRepository();

    console.log("[GetProjectController] Creating GetProjectUseCase");
    const getProjectUseCase = new GetProjectUseCase(projectRepository);

    console.log("[GetProjectController] Executing use case");
    const project = await getProjectUseCase.execute(id);

    if (!project) {
      console.warn("[GetProjectController] Project not found", { projectId: id });
      throw new Error("Project not found.");
    }

    console.log("[GetProjectController] Project retrieved successfully", {
      projectId: id,
      projectName: project.name,
    });

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error("[GetProjectController] Error fetching project:", error);
    return {
      success: false,
      error: `Failed to fetch project: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

export async function getProjectsController() {
  console.log("[GetProjectsController] Fetching all projects", {
    timestamp: new Date().toISOString(),
  });

  try {
    console.log("[GetProjectsController] Instantiating ProjectRepository");
    const projectRepository = new ProjectRepository();

    console.log("[GetProjectsController] Creating GetProjectsUseCase");
    const getProjectsUseCase = new GetProjectsUseCase(projectRepository);

    console.log("[GetProjectsController] Executing use case");
    const projects = await getProjectsUseCase.execute();

    console.log("[GetProjectsController] Projects retrieved successfully", {
      count: projects.length,
    });

    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    console.error("[GetProjectsController] Error fetching projects:", error);
    return {
      success: false,
      error: `Failed to fetch projects: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

export async function getProjectBySlugController(slug: string) {
  console.log("[GetProjectBySlugController] Fetching project by slug", {
    slug,
    timestamp: new Date().toISOString(),
  });

  try {
    console.log("[GetProjectBySlugController] Instantiating ProjectRepository");
    const projectRepository = new ProjectRepository();

    console.log("[GetProjectBySlugController] Creating GetProjectBySlugUseCase");
    const getProjectBySlugUseCase = new GetProjectBySlugUseCase(
      projectRepository
    );

    console.log("[GetProjectBySlugController] Executing use case");
    const project = await getProjectBySlugUseCase.execute(slug);

    if (!project) {
      console.warn("[GetProjectBySlugController] Project not found", { slug });
      throw new Error("Project not found.");
    }

    console.log("[GetProjectBySlugController] Project retrieved successfully", {
      slug,
      projectName: project.name,
    });

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error("[GetProjectBySlugController] Error fetching project:", error);
    return {
      success: false,
      error: `Failed to fetch project by slug: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
