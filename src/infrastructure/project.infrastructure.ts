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
    console.log("[ProjectRepository] Finding project by ID", { projectId: id });

    try {
      const queryParams = this.buildQueryParams();
      const url = `${CMS_CONFIG.baseUrl}${CMS_CONFIG.endpoints.Projects}/${id}?${queryParams}`;

      console.log("[ProjectRepository] Making CMS API request", {
        url,
        method: "GET",
      });

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${CMS_CONFIG.apiToken}`,
        },
        next: {
          revalidate: 60,
        },
      });

      console.log("[ProjectRepository] CMS API response received", {
        status: response.status,
        ok: response.ok,
      });

      if (!response.ok) {
        console.warn("[ProjectRepository] CMS API returned non-OK status", {
          status: response.status,
        });
        return null;
      }

      const { data } = await response.json();

      if (!data) {
        console.warn("[ProjectRepository] No data returned from CMS");
        return null;
      }

      console.log("[ProjectRepository] Project data retrieved from CMS", {
        projectId: data.id,
        projectName: data.name,
      });

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
      console.error("[ProjectRepository] Error fetching project by ID:", error);
      return null;
    }
  }

  async findBySlug(slug: string): Promise<Project | null> {
    console.log("[ProjectRepository] Finding project by slug", { slug });

    try {
      const queryParams = this.buildQueryParams();
      queryParams.append("filters[slug][$eq]", slug);
      const url = `${CMS_CONFIG.baseUrl}${CMS_CONFIG.endpoints.Projects}?${queryParams}`;

      console.log("[ProjectRepository] Making CMS API request", {
        url,
        method: "GET",
        filter: slug,
      });

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${CMS_CONFIG.apiToken}`,
        },
        next: {
          revalidate: 60,
        },
      });

      console.log("[ProjectRepository] CMS API response received", {
        status: response.status,
        ok: response.ok,
      });

      if (!response.ok) {
        console.warn("[ProjectRepository] CMS API returned non-OK status", {
          status: response.status,
        });
        return null;
      }

      const { data } = await response.json();

      if (!data || !data[0]) {
        console.warn("[ProjectRepository] No project found with slug", { slug });
        return null;
      }

      const project = data[0];
      console.log("[ProjectRepository] Project found by slug", {
        slug,
        projectId: project.id,
        projectName: project.name,
      });

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
      console.error("[ProjectRepository] Error fetching project by slug:", error);
      return null;
    }
  }

  async findAll(): Promise<Project[]> {
    console.log("[ProjectRepository] Finding all projects");

    try {
      const queryParams = this.buildQueryParams();
      const url = `${CMS_CONFIG.baseUrl}${CMS_CONFIG.endpoints.Projects}?${queryParams}`;

      console.log("[ProjectRepository] Making CMS API request", {
        url,
        method: "GET",
      });

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${CMS_CONFIG.apiToken}`,
        },
        next: {
          revalidate: 60,
        },
      });

      console.log("[ProjectRepository] CMS API response received", {
        status: response.status,
        ok: response.ok,
      });

      if (!response.ok) {
        console.warn("[ProjectRepository] CMS API returned non-OK status", {
          status: response.status,
        });
        return [];
      }

      const { data } = await response.json();

      if (!data) {
        console.warn("[ProjectRepository] No data returned from CMS");
        return [];
      }

      console.log("[ProjectRepository] Projects retrieved from CMS", {
        count: data.length,
        projectNames: data.map((p: any) => p.name),
      });

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
      console.error("[ProjectRepository] Error fetching all projects:", error);
      return [];
    }
  }
}
