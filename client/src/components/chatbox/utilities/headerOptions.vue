<template>
  <v-container grid-list-xs auto class="headerOptionsContainer">
    <v-layout row wrap justify-end xs4>
      <v-flex xs4>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    items: {
      required: true,
    }
  },
  methods: {
    selectOption(evt, item) {
      evt.stopPropagation();
      console.log('selected option', item.action);
      this.$emit('selected');
    }
  }
}
</script>

<style lang="scss" scoped>
  .headerOptionsContainer {
    position: absolute;
    top: 0;
    z-index: 1;
    .list-wrapper {
      border-radius: 5px;
    }
  }
</style>
