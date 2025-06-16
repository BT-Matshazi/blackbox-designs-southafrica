"use server";

import {
  GetProjectUseCase,
  GetProjectsUseCase,
  GetProjectBySlugUseCase,
} from "@/src/use-case/project.use-case";
import { ProjectRepository } from "@/src/infrastructure/project.infrastructure";

export async function getProjectController(id: string) {
  try {
    const projectRepository = new ProjectRepository();
    const getProjectUseCase = new GetProjectUseCase(projectRepository);
    const project = await getProjectUseCase.execute(id);

    if (!project) {
      throw new Error("Project not found.");
    }

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error("Error in getProjectController:", error);
    return {
      success: false,
      error: `Failed to fetch project: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

export async function getProjectsController() {
  try {
    const projectRepository = new ProjectRepository();
    const getProjectsUseCase = new GetProjectsUseCase(projectRepository);
    const projects = await getProjectsUseCase.execute();

    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    console.error("Error in getProjectsController:", error);
    return {
      success: false,
      error: `Failed to fetch projects: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

export async function getProjectBySlugController(slug: string) {
  try {
    const projectRepository = new ProjectRepository();
    const getProjectBySlugUseCase = new GetProjectBySlugUseCase(
      projectRepository
    );
    const project = await getProjectBySlugUseCase.execute(slug);

    if (!project) {
      throw new Error("Project not found.");
    }

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    console.error("Error in getProjectBySlugController:", error);
    return {
      success: false,
      error: `Failed to fetch project by slug: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
