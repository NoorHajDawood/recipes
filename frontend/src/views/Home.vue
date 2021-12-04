<template>
  <div >
        <list-recipes :recipes="recipes"/>
  </div>
</template>

<script>
// @ is an alias to /src
import listRecipes from "@/components/recipes-list.vue"
export default {
  name: "Home",
  components: {
    listRecipes
  },
  computed:{
    recipes(){
      return this.$store.getters.recipesForDisplay;
    }
  }

};
</script>
