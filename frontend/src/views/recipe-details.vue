<template>
    <section class="main-layout">
        <div  v-if="recipe" class="margin-top card-detail  recipe-details">
            <img :src="recipe.imageUrl" alt="">
            <h1>{{recipe.title}}</h1>
            <p>{{recipe.description}}</p>
           
            <h2>Ingredients</h2>
                <ul>
                <li v-for="(ingredent,idx) in recipe.ingredients" :key="idx">
                    <label class="ingredent">
                        <p-check class="p-icon p-jelly" color="info-o">
                            <i slot="extra" class="icon mdi mdi-check">✔</i>
                      </p-check>                        
                        <h3>{{ingredent.quantity}} {{ingredent.unit}} {{ingredent.name}}</h3>
                    </label>
                </li>
                </ul>
                <div class="serving">
                    <h2>serving: {{recipe.serving}}</h2>
                    <h2><span class="clock"/> {{recipe.prepTime}}</h2>
            </div>
            <h2 class="instructions">Instructions</h2>
           <div class="hr"/>
            <ul>
                <li v-for="(instruction,idx) in recipe.instructions" :key="idx">
                    <label class="ingredent">
                        <p-check class="p-icon p-jelly" color="info-o">
                            <i slot="extra" class="icon mdi mdi-check">✔</i>
                      </p-check>                        
                        <h3>{{idx+1}}) {{instruction}}</h3>
                    </label>
                </li>
                </ul>
                <h1>bon appetit <span class="food"/></h1>
                <div class="isAditor">
                    <el-button type="primary" @click.prevent="editRecipe" v-if="isCreator" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" @click.prevent="deleteRecipe" v-if="isCreator" icon="el-icon-delete" circle></el-button>
                </div>
                
        </div>
        <div v-else class="containe-loader">
            <div class="loading">
            </div>
        </div>
    </section>
  
</template>

<script>
export default {
    // name:"RecipeDetails",
    data(){
        return{
            recipe:null,
            isCreator:false
        }
    },
    async created(){
        await this.loadRecipe();
        this.loadIsCreator();
    },
    methods: {
        async loadRecipe(){
            const {recipeId} = this.$route.params;
            this.recipe  = await this.$store.dispatch({type:"getRecipe", recipeId});
        },
        async loadIsCreator(){
            // const user = this.$store.getters.user;
            let user = this.$store.getters.user;
            if(!user) {
                console.log('refresh Home page - noy');
                user = await this.$store.dispatch({type:'getLoginUser'});
                console.log('after dispach -o ');
            }
            //if(user){
            //    this.loggedUser = JSON.parse(JSON.stringify(user));
            //}
            //return this.loggedUser
            if(user){
                this.isCreator = user.myRecipes.some(currRecipe=>{
                return this.recipe._id == currRecipe._id;
            });
            }
            
        },
        editRecipe(){
            this.$router.push('/recipe/edit/'+this.recipe._id);
        },
        deleteRecipe(){
            this.$store.dispatch({type:'removeRecipe', recipeId:this.recipe._id});
            this.$store.dispatch({type:'removeRecipeFromUser', recipeId:this.recipe._id});
            this.$notify({
                title: 'Delete Success',
                message: 'Delete recipe Success',
                 type: 'success'
            });
            this.$router.push('/');
        }
    },

}
</script>
