<template>
<section>
  <header class="app-header">
    <div class="main-layout">
        <router-link to="/" @click.native="refreshCache">
          <img src="../assets/imgs/logo.png" alt="">
          <h1><span>Recipes</span></h1>
        </router-link>
        <div class="hamburger" @click="toggleNav"></div>

    </div> 
    <div v-if="isNavShow" class="navHeader">
      <router-link @click.native="() => { refreshCache(); toggleNav(); }" to="/"><h2>Home</h2></router-link>
      <router-link v-if="loginUser" @click.native="toggleNav" to="/recipe/edit"><h2>Create Recipe</h2></router-link>
      <router-link v-if="loginUser" @click.native="toggleNav"  to="/user/"><h2>Profile</h2></router-link>
      <router-link v-if="!loginUser" @click.native="toggleNav" to="/login"><h2>Login / Signup</h2></router-link>
    </div>
   </header>
</section>

</template>

<script>

export default {
    data(){
        return{
           isNavShow:false
        }
    },
    methods:{
        toggleNav(){
          this.isNavShow = !this.isNavShow;
        },
        refreshCache() {
           const filter ={'title':'', 'sort':'likes'};
          this.$store.dispatch({type:'loadRecipes', filter})
        }
    },
    computed:{
       loginUser(){
         let user = this.$store.getters.user;
          return user ? true : false; 
        },
    }
}
</script>


  
