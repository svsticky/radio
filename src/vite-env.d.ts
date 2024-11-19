/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTENTFUL_SPACE_ID: string;
  readonly VITE_CONTENTFUL_ACCESS_TOKEN: string;
  readonly VITE_CONTENTFUL_ENVIRONMENT: string;

  readonly VITE_LOGO: string;
  readonly VITE_KOALA_API_BASE: string;

  readonly VITE_LOAD_INTERVAL: string;
  readonly VITE_NEXT_INTERVAL: string;
  readonly VITE_NEXT_INTERVAL_COMMITS: string;

  readonly VITE_GITHUB_REPOS: string;
  readonly VITE_GITHUB_API_TOKEN: string;

  readonly VITE_SNOW_HEIGHT_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
