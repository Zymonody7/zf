<template>
  <v-container class="d-flex align-center py-0">
    <v-divider></v-divider>
    <v-subheader class="text-caption">{{ title }}</v-subheader>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
export default {
  name: "DividerTextCenter",
  props: [
    'title'
  ]
}
</script>

<style lang='less'>
</style>
