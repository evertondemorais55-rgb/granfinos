/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endereço da API (ex.: https://granfinos-api.onrender.com). Em dev o Vite faz proxy de /api. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
