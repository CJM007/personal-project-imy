export default defineEventHandler(async (event) => {
  console.log("GitHub API route started");

  try {
    const config = useRuntimeConfig();

    if (!config.githubToken) {
      console.error("No GitHub token found");
      return {
        error: true,
        message: "GitHub token not configured/check .env file",
        projects: [],
      };
    }

    const response = await fetch(
      "https://api.github.com/user/repos?sort=updated&per_page=100&type=all",
      {
        headers: {
          Authorization: `token ${config.githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Nuxt-App",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API error:", errorText);

      let errorMessage = `GitHub API returned ${response.status}`;

      if (response.status === 401) {
        errorMessage = "GitHub token is invalid/expired";
      } else if (response.status === 403) {
        errorMessage = "GitHub API rate limit exceeded/lacks permissions";
      } else if (response.status === 404) {
        errorMessage = "GitHub API endpoint not found";
      }

      return {
        error: true,
        message: errorMessage,
        status: response.status,
        projects: [],
      };
    }

    const repos = await response.json();

    const projects = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "No description provided",
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language || "Unknown",
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      updated_at: repo.updated_at,
      private: repo.private,
    }));

    return projects;
  } catch (error: any) {
    console.error("Server error:", {
      message: error.message,
      stack: error.stack,
    });

    return {
      error: true,
      message: `Server error: ${error.message}`,
      projects: [],
    };
  }
});
