<template>
  <v-container grid-list-xs auto class="headerOptionsContainer">
    <v-layout row wrap justify-end xs4 mr-4>
      <v-flex xs4>
        <v-list>
          <v-list-tile v-for="(item, i) in items" :key="i" @click="selectOption">
            <v-list-tile-title>{{ item.label }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
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
    selectOption() {
      console.log('selected option');
    }
  }
}
</script>

<style lang="scss" scoped>
  .headerOptionsContainer {
    position: absolute;
    top: 0;
    z-index: 1;
  }
</style>
