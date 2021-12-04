<template>
  <section class="card-recipe">
        <img :src="recipePrev.imageUrl" class="recipe-image" alt="">
        <h2>{{recipePrev.title}}</h2>
        <h2>{{recipePrev.likes}}</h2>
  </section>
</template>

<script>
export default {
    props:["recipePrev"]
}
</script>

<style>

</style>