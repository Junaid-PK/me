<script setup lang="ts">
import { useHead } from "@unhead/vue";
import About from "../components/Home/About.vue";
import BlogSection from "../components/Home/BlogSection.vue";
import ContactSection from "../components/Home/ContactSection.vue";
import HeroSection from "../components/Home/HeroSection.vue";
import ProjectCard from "../components/Home/ProjectCard.vue";

useHead({
  title: "Junaid Hussnain — Software Engineer",
  meta: [
    {
      name: "description",
      content:
        "Junaid Hussnain is a software engineer in Lahore with 5+ years of experience building web applications, backend systems, and developer tools.",
    },
  ],
  link: [
    { rel: "canonical", href: "https://hijunaid.com/" },
    { rel: "me", href: "https://github.com/Junaid-PK" },
    { rel: "me", href: "https://www.linkedin.com/in/junaid-hussnain-a951791bb/" },
    { rel: "me", href: "https://www.freelancer.com.au/u/junaidhussnain36" },
  ],
  script: [{
    type: "application/ld+json",
    textContent: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://hijunaid.com/#profile-page",
          url: "https://hijunaid.com/",
          name: "Junaid Hussnain — Software Engineer",
          mainEntity: { "@id": "https://hijunaid.com/#junaid-hussnain" },
          isPartOf: { "@id": "https://hijunaid.com/#website" },
        },
        {
          "@type": "Person",
          "@id": "https://hijunaid.com/#junaid-hussnain",
          name: "Junaid Hussnain",
          alternateName: "Junaid-PK",
          url: "https://hijunaid.com/",
          description: "Software engineer with more than five years of experience building web applications, backend systems, and developer tools.",
          image: "https://avatars.githubusercontent.com/u/84363665?v=4",
          jobTitle: "Software Engineer",
          address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
          sameAs: [
            "https://github.com/Junaid-PK",
            "https://www.linkedin.com/in/junaid-hussnain-a951791bb/",
            "https://www.freelancer.com.au/u/junaidhussnain36",
          ],
          knowsAbout: ["Software engineering", "Laravel", "PHP", "TypeScript", "Python", "PostgreSQL", "Docker"],
        },
        {
          "@type": "WebSite",
          "@id": "https://hijunaid.com/#website",
          url: "https://hijunaid.com/",
          name: "Junaid Hussnain",
          inLanguage: "en",
          publisher: { "@id": "https://hijunaid.com/#junaid-hussnain" },
        },
      ],
    }),
  }],
});
</script>

<template>
  <div>
    <HeroSection />

    <section id="work" class="section section--work" aria-labelledby="work-title">
      <div class="section-heading section-heading--split">
        <div>
          <p class="eyebrow">Selected work</p>
          <h2 id="work-title">A few things I’ve built.</h2>
        </div>
        <p>Products and open-source work I can show publicly.</p>
      </div>
      <ProjectCard />
    </section>

    <About />
    <BlogSection />
    <ContactSection />
  </div>
</template>
