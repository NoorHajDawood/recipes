<template>
<section>
    <section v-if="loginUser" class="user-profile  margin-top ">
        <div class="row py-5 px-4">
    <div class="col-md-5 mx-auto">
        <!-- Profile widget -->
        <div class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-0 pb-4 cover">
                <div class="media align-items-end profile-head">
                    <div class="profile mr-3"><img :src="loginUser.userImg" alt="..." width="130" class="rounded mb-2 img-thumbnail"></div>
                    <div class="media-body mb-5 text-white">
                        <div v-if="isEditMode">
                            <input class="w3-input w3-hover-green"  v-model="loginUser.username" type="text">
                            <input class="w3-input w3-hover-green"  v-model="loginUser.from" type="text">
                        </div>
                        <div v-else>
                            <h4 class="mt-0 mb-0">{{loginUser.username}}</h4>
                            <p class="small mb-4"> <i class="fas fa-map-marker-alt mr-2"></i>{{loginUser.from}}</p>
                        </div>
                    </div>
                </div>
            </div>
           <a href="#" @click="changeEditMode" class="btn edit-profile btn-outline-dark btn-sm btn-block"> {{buttonTitle}}</a>
            <div class="px-4 py-3">
                <h2 class="mb-0">About</h2>
                <div class="p-4 rounded shadow-sm bg-light">
                    <textarea v-if="isEditMode" rows="3" v-model="loginUser.desc" />
                    <p  v-else class="font-italic mb-0"><pre>{{loginUser.desc}}</pre></p>
                </div>
            </div>
            <div class="py-4 px-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h2 class="mb-0">My Recipes</h2>
                </div>
                <div class="row">
                    <div v-for="(recipe,idx) in loginUser.myRecipes" :key="idx" @click="movePage(recipe._id)" class="col-lg-6 mb-2 pr-lg-1">
                        <img :src="recipe.img" alt="" class="img-fluid rounded shadow-sm">
                    </div>
                </div>
            </div>

            <div class="py-4 px-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h2 class="mb-0">My Favorites Recipes</h2>
                </div>
                <div class="row">
                    <div v-for="(recipe,idx) in loginUser.favorites" @click="movePage(recipe._id)" :key="idx" class="col-lg-6 mb-2 pr-lg-1">
                        <img :src="recipe.img" alt="" class="img-fluid rounded shadow-sm">
                    </div>
                </div>
            </div>
            <el-button type="danger" @click.prevent="logout" class="logout" round>Logout</el-button>

        </div>
    </div>
</div>
</section>
     <div v-else class="containe-loader">
            <div class="loading">
            </div>
    </div>
</section>
</template>

<script>

export default {
    data(){
        return{
            loginUser:null,
           isEditMode:false
        }
    },
    created(){
        this.getLoggedUser();
    },
    methods:{
        async changeEditMode(){
            if(this.isEditMode){
                const savedUser =await this.$store.dispatch({type:"saveUser", user: this.loginUser});
                this.$notify({
                      title: 'Success Update',
                      message: 'Profile updaed succsessfully',
                      type: 'success'
                });
                this.loginUser = JSON.parse(JSON.stringify(savedUser));
            }
            this.isEditMode = !this.isEditMode;
        },
        async getLoggedUser(){
            try{
                let user = this.$store.getters.user;
                if(!user) {
                    user = await this.$store.dispatch({type:'getLoginUser'})
                }
                if(user){
                    this.loginUser = JSON.parse(JSON.stringify(user));
                }
            }
            catch(err){
                throw err;
            }
        },
        movePage(id){
            this.$router.push('/recipe/'+id)
        },
        logout(){
            this.$store.dispatch({type:'logout'});
            this.$router.push('/login');
        }
    },
    computed:{
        buttonTitle(){
            return this.isEditMode ? 'Save' :'Edit profile';
        }
    }
}
</script>

