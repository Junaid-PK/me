<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
}>();

const handlePageClick = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("page-change", page);
  }
};
</script>

<template>
  <div class="pagination">
    <button
      class="page-button"
      :disabled="currentPage === 1"
      @click="handlePageClick(currentPage - 1)"
    >
      Previous
    </button>

    <div class="page-numbers">
      <button
        v-for="page in totalPages"
        :key="page"
        class="page-number"
        :class="{ active: page === currentPage }"
        @click="handlePageClick(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="page-button"
      :disabled="currentPage === totalPages"
      @click="handlePageClick(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.page-button {
  padding: 0.5rem 1rem;
  background: #374151;
  border: none;
  border-radius: 0.375rem;
  color: #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-button:not(:disabled):hover {
  background: #4b5563;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.375rem;
  background: #374151;
  color: #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-number:hover {
  background: #4b5563;
}

.page-number.active {
  background: #eff1f4ff;
  color: rgb(5, 5, 5);
}

/* Add media query to hide page numbers on mobile screens */
@media (max-width: 600px) {
  .page-numbers {
    display: none;
  }
}
</style>
