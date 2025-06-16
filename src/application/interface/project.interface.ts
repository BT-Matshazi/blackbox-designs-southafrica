import { Project } from "../domain/project.domain";

export interface ProjectInterface {
  findById(id: string): Promise<Project | null>;
  findBySlug(slug: string): Promise<Project | null>;
  findAll(): Promise<Project[]>;
}
