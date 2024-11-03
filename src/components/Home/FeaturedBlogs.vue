<script setup lang="ts">
import { ref, computed } from "vue";
import BlogCard from "./BlogCard.vue";
import Pagination from "./Pagination.vue";
import type { Blog } from "./blog";

// Mock data - in real app, this would come from an API
const blogs = ref<Blog[]>([
  {
    id: 1,
    title: "Getting Started with Vue 3 Composition API",
    excerpt:
      "Learn how to use Vue 3 Composition API to build scalable applications",
    author: "Jane Doe",
    date: "2024-03-15",
    imageUrl: "https://picsum.photos/400/200",
  },
  {
    id: 2,
    title: "Mastering TypeScript with Vue",
    excerpt: "Deep dive into using TypeScript effectively in Vue applications",
    author: "John Smith",
    date: "2024-03-14",
    imageUrl: "https://picsum.photos/400/200",
  },
  {
    id: 3,
    title: "Building Responsive Layouts",
    excerpt: "Learn modern CSS techniques for responsive web design",
    author: "Alice Johnson",
    date: "2024-03-13",
    imageUrl: "https://picsum.photos/400/200",
  },
  {
    id: 4,
    title: "Vue Router Best Practices",
    excerpt: "Implement efficient routing in your Vue applications",
    author: "Bob Wilson",
    date: "2024-03-12",
    imageUrl: "https://picsum.photos/400/200",
  },
  {
    id: 5,
    title: "State Management with Pinia",
    excerpt: "Modern state management solutions for Vue applications",
    author: "Carol Brown",
    date: "2024-03-11",
    imageUrl: "https://picsum.photos/400/200",
  },
]);

const currentPage = ref(1);
const itemsPerPage = 2;

const totalPages = computed(() => Math.ceil(blogs.value.length / itemsPerPage));

const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return blogs.value.slice(start, end);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <section class="featured-blogs">
    <div class="blogs-grid">
      <BlogCard v-for="blog in paginatedBlogs" :key="blog.id" :blog="blog" />
    </div>

    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </section>
</template>

<style scoped>
.featured-blogs {
  padding: 2rem 0;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #e5e7eb;
}

.blogs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}
</style>
