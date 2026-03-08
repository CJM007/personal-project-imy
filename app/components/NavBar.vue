<template>
  <div>
    <nav class="navbar">
      <ul class="navbar-list">
        <li>
          <NuxtLink to="/" class="routeLink"> Home </NuxtLink>

          <i class="fa fa-caret-up" aria-hidden="true"></i>
        </li>
        <li>
          <NuxtLink to="/projects" class="routeLink">Projects</NuxtLink>

          <i class="fa fa-caret-up" aria-hidden="true"></i>
        </li>
        <li>
          <NuxtLink to="/contact" class="routeLink">Contact</NuxtLink>

          <i class="fa fa-caret-up" aria-hidden="true"></i>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
.routeLink {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

nav {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 25px;
  padding: 2px;
  box-shadow: 2px 2px 10px rgba(91, 203, 255, 0.5);
}

nav ul {
  display: flex;
  gap: 50px;
  list-style: none;
  padding: 5px;
  margin: 0px;
}

nav ul li {
  cursor: pointer;
  font-size: 25px;
  align-items: center;
}

nav ul li .routeLink,
nav ul li .routeLink:visited {
  list-style: none;
  text-decoration: none;
  color: inherit;
}

nav ul li:hover {
  color: rgb(4, 226, 255);
}

nav ul li i {
  margin: 5px;
}
</style>
