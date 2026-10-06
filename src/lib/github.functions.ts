import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/github";

export type GithubRepo = {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  updated: string;
};

export type GithubProfile = {
  login: string;
  displayName: string;
  url: string;
  avatarUrl: string;
  bio: string;
  location: string;
  followers: number;
  publicRepos: number;
  repos: GithubRepo[];
};

async function gateway(path: string): Promise<unknown> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const githubKey = process.env["GITHUB_API_KEY"];

  if (!lovableKey || !githubKey) {
    throw new Error("The GitHub connection is not configured for this site yet.");
  }

  const response = await fetch(`${GATEWAY_URL}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": githubKey,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`GitHub request failed [${response.status}]: ${body}`);
    throw new Error(`GitHub request failed with status ${response.status}.`);
  }

  return response.json();
}

type RawRepo = {
  name?: unknown;
  description?: unknown;
  html_url?: unknown;
  language?: unknown;
  stargazers_count?: unknown;
  forks_count?: unknown;
  updated_at?: unknown;
  visibility?: unknown;
  private?: unknown;
  fork?: unknown;
};

type RawUser = {
  login?: unknown;
  name?: unknown;
  html_url?: unknown;
  avatar_url?: unknown;
  bio?: unknown;
  location?: unknown;
  followers?: unknown;
  public_repos?: unknown;
};

const text = (value: unknown, fallback = ""): string =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

const count = (value: unknown): number => (typeof value === "number" && Number.isFinite(value) ? value : 0);

export const getGithubProfile = createServerFn({ method: "GET" }).handler(async (): Promise<GithubProfile> => {
  const [rawUser, rawRepos] = await Promise.all([
    gateway("/user"),
    gateway("/user/repos?per_page=100&sort=updated&direction=desc"),
  ]);

  const user = (rawUser ?? {}) as RawUser;
  const list = Array.isArray(rawRepos) ? (rawRepos as RawRepo[]) : [];

  // Only repositories the owner has made public may appear on a public portfolio.
  const repos: GithubRepo[] = list
    .filter((repo) => repo.private !== true && repo.visibility !== "private")
    .slice(0, 9)
    .map((repo) => ({
      name: text(repo.name, "Untitled repository"),
      description: text(repo.description, "No description added yet."),
      url: text(repo.html_url, "https://github.com"),
      language: text(repo.language, "Not specified"),
      stars: count(repo.stargazers_count),
      forks: count(repo.forks_count),
      updated: text(repo.updated_at, ""),
    }));

  return {
    login: text(user.login, "github"),
    displayName: text(user.name, text(user.login, "GitHub account")),
    url: text(user.html_url, "https://github.com"),
    avatarUrl: text(user.avatar_url, ""),
    bio: text(user.bio, "Repositories, code, and projects published on GitHub."),
    location: text(user.location, ""),
    followers: count(user.followers),
    publicRepos: count(user.public_repos),
    repos,
  };
});
