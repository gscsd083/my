<template>
  <div>一体杆管理
    <p>{{ one }} </p>
    <p>{{ two }}</p>
    <button @click="add">试试</button>
  </div>
</template>
<script>
import { onehaishu, twohanshu } from '../../../../函数封装练习/abc'
export default {
  name: 'OneHaishu',
  data() {
    return {
      one: [1, 2, 3],
      two: [{ age: 18, height: 180 }, { age: 18, height: 180 }]
    }
  },
  methods: {
    add() {
      this.one = onehaishu(this.one)
      this.two = twohanshu(this.two)
    }
  }

}
</script>
