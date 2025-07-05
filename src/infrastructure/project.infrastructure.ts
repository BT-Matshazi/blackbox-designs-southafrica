import { CMS_CONFIG } from "@/lib/config/cms-config";
import { Project } from "@/src/application/domain/project.domain";
import { ProjectInterface } from "@/src/application/interface/project.interface";

export class ProjectRepository implements ProjectInterface {
  private getFullUrl(path: string | undefined): string {
    if (!path) return "";
    return `${CMS_CONFIG.baseUrl}${path}`;
  }

  private buildQueryParams(): URLSearchParams {
    const queryParams = new URLSearchParams({
      "populate[cardImage][fields]": "url",
      "populate[project_categories][fields][0]": "id",
      "populate[project_categories][fields][1]": "name",
      "populate[project_categories][fields][2]": "slug",
      "populate[project_categories][fields][3]": "priority",
    });

    return queryParams;
  }

  async findById(id: string): Promise<Project | null> {
    try {
      const queryParams = this.buildQueryParams();
      const response = await fetch(
        `${CMS_CONFIG.baseUrl}${CMS_CONFIG.endpoints.Projects}/${id}?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${CMS_CONFIG.apiToken}`,
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (!response.ok) return null;

      const { data } = await response.json();

      if (!data) return null;

      return {
        id: data.id,
        documentId: data.documentId,
        name: data.name,
        slug: data.slug,
        priority: data.priority,
        isFeatured: data.isFeatured,
        siteUrl: data.siteUrl,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        publishedAt: data.publishedAt,
        cardImage: data.cardImage
          ? {
              id: data.cardImage.id,
              documentId: data.cardImage.documentId,
              url: this.getFullUrl(data.cardImage.url),
            }
          : {
              id: 0,
              documentId: "",
              url: "",
            },
        project_categories:
          data.project_categories?.map((category: any) => ({
            id: category.id,
            documentId: category.documentId,
            name: category.name,
            slug: category.slug,
            priority: category.priority,
          })) || [],
      };
    } catch (error) {
      console.error("Error fetching project by ID:", error);
      return null;
    }
  }

  async findBySlug(slug: string): Promise<Project | null> {
    try {
      const queryParams = this.buildQueryParams();
      queryParams.append("filters[slug][$eq]", slug);

      const response = await fetch(
        `${CMS_CONFIG.baseUrl}${CMS_CONFIG.endpoints.Projects}?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${CMS_CONFIG.apiToken}`,
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (!response.ok) return null;

      const { data } = await response.json();

      if (!data || !data[0]) return null;

      const project = data[0];

      return {
        id: project.id,
        documentId: project.documentId,
        name: project.name,
        slug: project.slug,
        priority: project.priority,
        isFeatured: project.isFeatured,
        siteUrl: project.siteUrl,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        publishedAt: project.publishedAt,
        cardImage: project.cardImage
          ? {
              id: project.cardImage.id,
              documentId: project.cardImage.documentId,
              url: this.getFullUrl(project.cardImage.url),
            }
          : {
              id: 0,
              documentId: "",
              url: "",
            },
        project_categories:
          project.project_categories?.map((category: any) => ({
            id: category.id,
            documentId: category.documentId,
            name: category.name,
            slug: category.slug,
            priority: category.priority,
          })) || [],
      };
    } catch (error) {
      console.error("Error fetching project by slug:", error);
      return null;
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      const queryParams = this.buildQueryParams();
      const response = await fetch(
        `${CMS_CONFIG.baseUrl}${CMS_CONFIG.endpoints.Projects}?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${CMS_CONFIG.apiToken}`,
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (!response.ok) return [];

      const { data } = await response.json();
      if (!data) return [];

      return data.map((project: any) => ({
        id: project.id,
        documentId: project.documentId,
        name: project.name,
        slug: project.slug,
        priority: project.priority,
        isFeatured: project.isFeatured,
        siteUrl: project.siteUrl,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        publishedAt: project.publishedAt,
        cardImage: project.cardImage
          ? {
              id: project.cardImage.id,
              documentId: project.cardImage.documentId,
              url: this.getFullUrl(project.cardImage.url),
            }
          : {
              id: 0,
              documentId: "",
              url: "",
            },
        project_categories:
          project.project_categories?.map((category: any) => ({
            id: category.id,
            documentId: category.documentId,
            name: category.name,
            slug: category.slug,
            priority: category.priority,
          })) || [],
      }));
    } catch (error) {
      console.error("Error fetching all projects:", error);
      return [];
    }
  }
}
