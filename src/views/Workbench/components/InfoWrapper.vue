<template>
  <div class="info-wrapper">
    <p class="info-wrapper__title">{{ title }}</p>
    <div>
      <slot />
    </div>
  </div>
</template>

<script >
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-wrapper {
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 20px;
    min-width: 260px;
    &__title {
      font-size: 14px;
      color: #303035;
      font-weight: 500;
      margin-bottom: 20px;
    }
  }
</style>
