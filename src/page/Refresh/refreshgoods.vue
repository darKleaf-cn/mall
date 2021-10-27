<template>
<div></div>
</template>
<script>
export default {
  data () {
    this.$router.push({
      path: '/book',
      query: {
        type: this.$route.query.type
      }
    })
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  
</style>
