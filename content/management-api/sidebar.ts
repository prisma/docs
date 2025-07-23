import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "management-api/prisma-data-platform-management-api",
    },
    {
      type: "category",
      label: "Workspaces",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "management-api/get-workspaces",
          label: "getWorkspaces",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Projects",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "management-api/get-projects",
          label: "getProjects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "management-api/post-projects",
          label: "postProjects",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "management-api/delete-projects-by-id",
          label: "deleteProjectsById",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "management-api/get-projects-by-id",
          label: "getProjectsById",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "management-api/post-projects-by-id-transfer",
          label: "postProjectsByIdTransfer",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Databases",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "management-api/get-projects-by-project-id-databases",
          label: "getProjectsByProjectIdDatabases",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "management-api/post-projects-by-project-id-databases",
          label: "postProjectsByProjectIdDatabases",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "management-api/get-projects-by-project-id-databases-by-database-id",
          label: "getProjectsByProjectIdDatabasesByDatabaseId",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "management-api/delete-projects-by-project-id-databases-by-database-id",
          label: "deleteProjectsByProjectIdDatabasesByDatabaseId",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Databases Connections",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "management-api/get-projects-by-project-id-databases-by-database-id-connections",
          label: "getProjectsByProjectIdDatabasesByDatabaseIdConnections",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "management-api/post-projects-by-project-id-databases-by-database-id-connections",
          label: "postProjectsByProjectIdDatabasesByDatabaseIdConnections",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "management-api/delete-projects-by-project-id-databases-by-database-id-connections-by-id",
          label: "deleteProjectsByProjectIdDatabasesByDatabaseIdConnectionsById",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Database Backups",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "management-api/get-projects-by-project-id-databases-by-database-id-backups",
          label: "getProjectsByProjectIdDatabasesByDatabaseIdBackups",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "management-api/post-projects-by-project-id-databases-by-database-id-backups-by-backup-id-recoveries",
          label: "postProjectsByProjectIdDatabasesByDatabaseIdBackupsByBackupIdRecoveries",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Misc",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "management-api/get-regions",
          label: "getRegions",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
