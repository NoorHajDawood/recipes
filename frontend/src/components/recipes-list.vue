<template >
    <section class="main-layout">
        <ul class="card-grid center margin-top">
        <li v-for="recipe in recipes"  :key="recipe._id" @click="recipeDetails(recipe._id)">
            <recipe-preview :recipePrev="recipe"  />
        </li>
        </ul>
        <div class="button-add-recipe" @click="addRecipe"></div>
        <button @click="move">Profile</button>
    </section>
</template>

<script>
    import recipePreview from './recipe-preview.vue'
export default {
props:["recipes"],
methods:{
    recipeDetails(recipeId){
        this.$router.push('/recipe/'+recipeId);
    },
    addRecipe(){
        this.$router.push('/recipe/edit')
    },
    move(){
        this.$router.push('/user/#');
    }
},
components:{
    recipePreview
}
}
</script>
