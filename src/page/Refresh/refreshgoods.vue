<template>
  <div></div>
</template>
<script>
export default {
  data() {
    this.$router.push({
      path: "/book",
      query: {
        catgId: this.$route.query.catgId,
      },
    });
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
