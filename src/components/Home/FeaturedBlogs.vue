<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import BlogCard from "./BlogCard.vue";
import Pagination from "./Pagination.vue";
import type { Blog } from "./blog";

const blogs = ref<Blog[]>([]);
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

// Fetch data from JSON file
onMounted(async () => {
  console.log("Blogs Data");
  try {
    const response = await fetch("blogs.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Blogs Data is" + data);
    blogs.value = data;
  } catch (error) {
    console.error("Error fetching blogs dataa:", error);
  }
});
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
