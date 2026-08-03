<template>
  <section id="about" class="section about" aria-labelledby="about-title">
    <div class="about-aside">
      <p class="eyebrow">About</p>
      <p class="about-location">Based in Lahore<br />Available across time zones</p>
    </div>

    <div class="about-copy">
      <h2 id="about-title">The code matters. So does what happens after it ships.</h2>
      <p class="about-lede">
        I’ve spent more than five years working across web products, backend systems, automation, and the operational details that keep software useful.
      </p>
      <div class="about-columns">
        <p>
          My best work usually begins where a neat demo ends: permissions, imports, failure recovery, reporting, maintainability, and the decisions a team will need to revisit six months later.
        </p>
        <p>
          A lot of that experience lives in private product work. This site is my commitment to making the transferable parts public through inspectable tools, practical engineering notes, and open-source contributions.
        </p>
      </div>
      <blockquote>
        “I care about reducing the cost of the next change—not just completing the current one.”
      </blockquote>
      <RouterLink class="text-link about-link" to="/about">Read the full profile <span aria-hidden="true">→</span></RouterLink>
    </div>
  </section>
</template>

<style scoped>
.about-link { display: inline-block; margin-top: 2rem; }
</style>
