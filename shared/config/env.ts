export interface ServerEnv {
  geminiApiKey?: string;
  geminiModel: string;
  vercelProjectId?: string;
  vercelOrgId?: string;
}

const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export const getServerEnv = (): ServerEnv => {
  return {
    geminiApiKey: process.env.GEMINI_API_KEY,
    geminiModel: process.env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL,
    vercelProjectId: process.env.VERCEL_PROJECT_ID,
    vercelOrgId: process.env.VERCEL_ORG_ID,
  };
};

export const requireServerEnv = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

