<template >
    <section class="main-layout">
    {{ blablalbalblablalba }}
        <ul class="card-grid center margin-top">
        <li v-for="recipe in recipes"  :key="recipe._id" @click="recipeDetails(recipe._id)">
            <recipe-preview :recipePrev="recipe" :loggedUser="loggedUser" @removeFavorite="removeFavorite" @addFavorite="addFavorite"/>
        </li>
        </ul>
        <div class="button-add-recipe" @click="addRecipe"></div>
    </section>
</template>

<script>
    import recipePreview from './recipe-preview.vue'
export default {
props:["recipes", "loggedUser"],
methods:{
    recipeDetails(recipeId){
        this.$router.push('/recipe/'+recipeId);
    },
    addRecipe(){
        this.$router.push('/recipe/edit')
    },
    addFavorite(recipe){
        this.$emit('addFavorite', recipe)
    },
    removeFavorite(recipe){
        this.$emit('removeFavorite', recipe)
    }
     
    
},
components:{
    recipePreview
}
}
</script>
