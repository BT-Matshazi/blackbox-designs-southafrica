export type Image = {
  id: number;
  documentId: string;
  url: string;
};

export type ProjectCategory = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  priority: number;
};

export type Project = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  priority: number;
  isFeatured: boolean;
  siteUrl: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cardImage: Image;
  project_categories: ProjectCategory[];
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type ProjectResponse = {
  data: Project[];
  meta: {
    pagination: Pagination;
  };
};

export type CMSProjectsResponse = {
  data: {
    id: number;
  };
};