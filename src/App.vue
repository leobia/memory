<template>
  <div class="app-container">
    <MemoryGrid ref="memoryGrid" />
  </div>
</template>

<script>
import MemoryGrid from './components/MemoryGrid.vue';

export default {
  name: 'App',
  components: {
    MemoryGrid,
  },

};
</script>
