<template>
  <div >
        <filter-search @setFilter="setFilter"/>
        <list-recipes :recipes="recipes" :loggedUser="loggedUser" @removeFavorite="removeFavorite" @addFavorite="addFavorite"/>
  </div>
</template>

<script>
// @ is an alias to /src
import listRecipes from "@/components/recipes-list.vue"
import filterSearch from '../components/filter-sort.vue'
export default {
  name: "Home",
  data(){
    return{
        loggedUser:null
    }
  },
  created(){
    this.loadUser;
  },
  components: {
    listRecipes,
    filterSearch
  },
  methods:{
    setFilter(filter){
      this.$store.dispatch({type:'loadRecipes', filter});
    },
    mounted() {
      const filter ={'title':'', 'sort':'likes'};
      this.$store.dispatch({type:'loadRecipes',filter});
      window.homeComponent = this
    },
    beforeDestroy() {
      window.homeComponent = undefined
    },
    removeFavorite(recipe){
    this.$store.dispatch({type:'removeLikeFromRecipe', recipe});
    this.loggedUser = JSON.parse(JSON.stringify(this.loggedUser));
    const idx = this.loggedUser.favorites.findIndex(currRecipe=>{
      return recipe._id == currRecipe._id;
    });
    this.loggedUser.favorites.splice(idx,1);
    this.$store.dispatch({type:'saveUser', user:this.loggedUser});
  },
  addFavorite(recipe){
    this.$store.dispatch({type:'addLikeToRecipe', recipe});
    this.loggedUser = JSON.parse(JSON.stringify(this.loggedUser));
    this.loggedUser.favorites.push({'_id':recipe._id, 'img':recipe.imageUrl});
    this.$store.dispatch({type:'saveUser', user:this.loggedUser});
  },
  
  },
  computed:{
    recipes(){
      return this.$store.getters.recipesForDisplay;
    },
    async loadUser(){
      let user = this.$store.getters.user;
      if(!user) {
        console.log('refresh Home page - noy');
        user = await this.$store.dispatch({type:'getLoginUser'});
        console.log('after dispach -o ');
      }
      if(user){
          this.loggedUser = JSON.parse(JSON.stringify(user));
          this.$store.commit({ type: "setUser", savedUser: this.loggedUser });
      }
      return this.loggedUser
    },
}};
</script>
