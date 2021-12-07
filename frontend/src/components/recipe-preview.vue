<template>
  <section class="card-recipe">
        <img :src="recipePrev.imageUrl" class="recipe-image" alt="">
        <h2>{{recipePrev.title}}</h2>
        <div class="flex">
          <div class="heart" @click.stop="clickHeart" :class="{'is-active': isFavorite}" ></div>
          <h2>{{recipePrev.likes}}</h2>
        </div>    
  </section>
</template>

<script>
export default {
    props:["recipePrev", 'loggedUser'],
    data(){
      return{
        isFavorite:false,
      }
    },
    created() {
      if(this.loggedUser && this.loggedUser.favorites){
        this.isFavorite = this.loggedUser.favorites.some(recipe=>{
        return recipe._id ==this.recipePrev._id;
      });
      }
      
    },
    methods:{
      clickHeart(){
        if(this.loggedUser){
          if(!this.isFavorite){
            this.$emit('addFavorite', this.recipePrev);
          }
          else{
            this.$emit('removeFavorite', this.recipePrev);
          }
          this.isFavorite = !this.isFavorite;   
        }
        else{
           this.$notify.error({
                    title: 'Error',
                    message: 'User must be loggedin first'
                });
          //  popup sign up
        }
      }
    }
}
</script>

<style>

</style>
