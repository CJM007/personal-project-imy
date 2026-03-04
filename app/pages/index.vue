<template>
  <div>
    <NavBar />
    <div class="parent-container">
      <div class="container">
        <div class="img-container">
          <img
            src="../images/profile.png"
            alt="Image of myself/Chitambala Sikazwe"
          />
        </div>
        <div class="name">
          <h3>Name:</h3>
          <p>Chitambala Sikazwe</p>
        </div>
        <div class="bio">Bio:</div>
        <p>
          I was born on the 25th of December 2005. <br />
          I first learnt how to program when I was 13 years old. One of my
          favourite projects I built when I was younger was a Jarvis chat box
          with Python. It allowed you to talk and if that phrase/sentence was
          hardcoded into the key-value dictionary, it would have a pairing
          response. I felt proud of myself because I built what I thought was
          super cool after seeing it in Ironman. I've built multiple projects
          since and I'm even more excited to build more things during this new
          frontier of artificial intelligence.
        </p>
      </div>
      <div class="container">
        <div class="img-container">
          <img
            src="../images/hong-kong.jpg"
            alt="Image of myself/Chitambala Sikazwe"
          />
        </div>
        <div class="name">
          <h3>Location:</h3>
          <p>Hong Kong, China</p>
        </div>
        <div class="bio">Description:</div>
        <p>
          This is a picture from a trip I took to Hong Kong last year during the
          June recess. It was my first time being in Asia and it was such a cool
          experience. Hong Kong is such a different place in contrast to other
          places in China. I guess I could attribute that to the fact that it
          was ruled by Britain for a while and so the culture and architecture
          of the city radiates a western influence. An interesting fact is that
          when I was in Hong Kong I came across multiple building being either
          built or renovated. What stood out to me was that they used bamboo to
          build their buildings. About a month after I returned back to South
          Africa the same building I had walked passed was burnt down by a fire
          when the bamboo was caught alight.
        </p>
      </div>
      <div class="container">
        <div class="img-container">
          <img
            src="../images/guangzhou.jpg"
            alt="Image of myself/Chitambala Sikazwe"
          />
        </div>
        <div class="name">
          <h3>Location:</h3>
          <p>Guangzhou, China</p>
        </div>
        <div class="bio">Description:</div>
        <p>
          I visited a bunch of cities in China, Guangzhou being one of them. I
          had a great time visiting the Bruce Lee's ancestral home in
          Yongqingfang. Whilest in Guangzhou I also visited the Cantonese Opera
          Art Museum. I took a trip down the river in the river boat. After that
          we went to have lunch at The Guangzhou Resturant (Main Branch). The
          food was amazing. An interesting fact about this restaurant is that
          there are large windows where you can view the chefs making the food
          from sratch. There's a whole pipeline and it's interesting to see how
          our Asian counter parts are doing things.
        </p>
      </div>
    </div>
    <div class="history-section">
      <div class="header-box">
        <h2>
          <i class="fa fa-history" aria-hidden="true"></i>
          On This Day - {{ factDate }}
        </h2>
      </div>

      <div v-if="pending" class="fact-container loading">
        <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
        Discovering today's historical facts...
      </div>

      <div v-else-if="error || factError" class="fact-container error">
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
        Unable to load historical facts. Please try again later.
      </div>

      <div v-else-if="factData && factData.hasEvents" class="fact-container">
        <div class="fact-card">
          <div class="fact-year">
            <i class="fa fa-calendar" aria-hidden="true"></i>
            {{ factData.year }}
          </div>
          <div class="fact-event">
            <h3>{{ factData.event }}</h3>
            <p v-if="factData.description !== factData.event">
              {{ factData.description }}
            </p>
            <div v-if="factData.keywords" class="fact-keywords">
              <span
                v-for="keyword in factData.keywords.split(',')"
                :key="keyword"
                class="keyword-tag"
              >
                {{ keyword.trim() }}
              </span>
            </div>
            <div v-if="factData.isSample" class="sample-note">
              <i class="fa fa-info-circle" aria-hidden="true"></i>
              Sample fact - configure your API credentials for real data
            </div>
          </div>
        </div>
      </div>

      <div v-else class="fact-container no-facts">
        <i class="fa fa-info-circle" aria-hidden="true"></i>
        No historical events found for today's date.
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: factData, pending, error } = await useFetch("/api/history/today");

const factDate = computed(() => {
  const today = new Date();
  return today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
});

const factError = computed(() => error.value || factData.value?.error);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");
h1,
h2,
h3,
p,
ul,
li,
span {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.parent-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 45px;
  padding: 20px;
  margin-top: 45px;
}

.img-container img {
  width: 100%;
  max-width: 300px;
  display: block;
  height: auto;
  margin: 0 auto 10px;
  border-radius: 5px;
}

.container {
  border: 1px solid #000;
  width: 400px;
  padding: 20px;
  flex-shrink: 0;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.name {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
}

.name h3 {
  margin: 0;
}

.name p {
  margin: 0;
  font-weight: 400;
}

.bio {
  font-weight: 600;
  margin-bottom: 10px;
}

.container > p {
  font-weight: 400;
  line-height: 1.5;
  margin-top: 0;
}
.history-section {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.header-box {
  border: 2px solid #333;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  background-color: #f9f9f9;
}

.header-box h2 {
  margin: 0;
  font-size: 28px;
  color: #333;
  font-weight: 500;
  letter-spacing: 1px;
}

.header-box h2 i {
  margin-right: 10px;
  color: #007bff;
}

.fact-container {
  max-width: 800px;
  margin: 0 auto;
}

.fact-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 25px;
  align-items: flex-start;
}

.fact-year {
  font-size: 48px;
  font-weight: 700;
  color: #007bff;
  min-width: 120px;
  text-align: center;
  padding: 10px;
  background-color: #f0f7ff;
  border-radius: 8px;
  line-height: 1.2;
}

.fact-year i {
  display: block;
  font-size: 24px;
  margin-bottom: 8px;
  color: #0056b3;
}

.fact-event {
  flex: 1;
}

.fact-event h3 {
  font-size: 24px;
  margin: 0 0 15px 0;
  color: #333;
  line-height: 1.4;
}

.fact-event p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin: 0 0 15px 0;
  font-weight: 400;
}

.fact-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.keyword-tag {
  background-color: #f0f0f0;
  color: #555;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 400;
  transition: all 0.3s ease;
}

.keyword-tag:hover {
  background-color: #007bff;
  color: white;
}

.sample-note {
  margin-top: 15px;
  padding: 10px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 4px;
  color: #856404;
  font-size: 14px;
  font-weight: 400;
}

.sample-note i {
  margin-right: 5px;
}

.loading,
.error,
.no-facts {
  text-align: center;
  padding: 60px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 18px;
  color: #666;
}

.loading i,
.error i,
.no-facts i {
  display: block;
  font-size: 48px;
  margin-bottom: 20px;
  color: #007bff;
}

.error {
  color: #dc3545;
}

.error i {
  color: #dc3545;
}
</style>
