<template>
  <div class="about">
    <h1>This is an about page</h1>

    <router-link :to="{query: {seccion: 1}}" class="btn btn-primary btn-block">
      1
    </router-link>

    <router-link :to="{query: {seccion: 2}}" class="btn btn-primary btn-block">
      2
    </router-link>
  </div>
</template>

<script>
export default {
  watch: {
    "$route.query.seccion": {
      inmediate: true,
      handler(newVal, oldVal){
        console.log(`Sección a cambiado a: ${newVal}`)
      }
    }
  },
}
</script>
