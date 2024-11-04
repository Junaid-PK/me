<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col md:flex-row justify-center">
      <img
        class="w-full md:w-auto transition-transform duration-300 ease-in-out transform hover:scale-105"
        src="https://github-readme-stats.vercel.app/api?username=Junaid-PK&theme=shadow_green&hide_border=true&include_all_commits=false&count_private=false"
        alt="GitHub Stats"
        width="386"
      />
      <img
        class="w-full md:w-auto mt-4 md:mt-0 transition-transform duration-300 ease-in-out transform hover:scale-105"
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=Junaid-PK&theme=shadow_green&hide_border=true&include_all_commits=false&count_private=false&layout=compact"
        alt="Top Languages"
      />
    </div>
    <img
      class="w-full md:w-auto mt-4 transition-transform duration-300 ease-in-out transform hover:scale-105"
      src="https://github-readme-streak-stats.herokuapp.com/?user=Junaid-PK&theme=shadow_green&hide_border=true"
      alt="GitHub Streak Stats"
    />
  </div>
</template>

<script>
export default {
  name: "GithubStats",
};
</script>
