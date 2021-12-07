
<template>
  <div id="app">
      <app-header/> 
      <router-view />
  </div>
</template>


<script>
import "./styles/styles.scss";
import appHeader from '@/components/app-header.vue';

export default {
  name:"App",
  created(){
    const filter ={'title':'', 'sort':'likes'};
    this.$store.dispatch({type:'loadRecipes', filter})
  },
  components:{
    appHeader
  },

}
</script>



// <style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
// </style>
