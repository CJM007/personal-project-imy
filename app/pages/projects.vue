<template>
  <div>
    <NavBar />
    <div class="projects-container">
      <h1>My GitHub Projects</h1>

      <div v-if="pending" class="loading">Loading projects...</div>

      <div v-else-if="error" class="error">
        Error loading projects: {{ error.message }}
      </div>

      <div v-else class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <h3>
            <a :href="project.html_url" target="_blank" rel="noopener">
              {{ project.name }}
            </a>
          </h3>

          <p v-if="project.description">{{ project.description }}</p>

          <div class="project-details">
            <span v-if="project.language" class="language">
              <i class="fa fa-code"></i> {{ project.language }}
            </span>

            <span class="stars">
              <i class="fa fa-star"></i> {{ project.stargazers_count }}
            </span>

            <span class="forks">
              <i class="fa fa-code-fork"></i> {{ project.forks_count }}
            </span>
          </div>

          <div class="project-links">
            <a :href="project.html_url" target="_blank" rel="noopener">
              <i class="fa fa-github"></i> View Code
            </a>
            <a
              v-if="project.homepage"
              :href="project.homepage"
              target="_blank"
              rel="noopener"
            >
              <i class="fa fa-external-link"></i> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: projects, pending, error } = useFetch("/api/github/projects");
</script>
<style scoped>
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.projects-container h1 {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  text-align: center;
  margin-top: 35px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.project-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.project-card h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.project-card h3 a {
  color: #0366d6;
  text-decoration: none;
}

.project-card h3 a:hover {
  text-decoration: underline;
}

.project-card p {
  color: #586069;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.project-details {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 13px;
  color: #586069;
}

.project-details i {
  margin-right: 3px;
}

.project-links {
  display: flex;
  gap: 15px;
  border-top: 1px solid #eaecef;
  padding-top: 15px;
}

.project-links a {
  color: #0366d6;
  text-decoration: none;
  font-size: 14px;
}

.project-links a:hover {
  text-decoration: underline;
}

.loading,
.error {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}

.error {
  color: #cb2431;
}
</style>
