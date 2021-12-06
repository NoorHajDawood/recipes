<template>
    <div class=" login-signup-cmp margin-top">

<div class="container" v-bind:class="{ active: isRegister }">
    <div class="card"></div>
    <div class="card">
        <h1 class="title">Login</h1>
        <form @submit.prevent="makeLogin">
            <div class="input-container"><input type="text"  v-bind="login.email" id="mail" required="required" /><label for="mail">Email</label>
                <div class="bar"></div>
            </div>
            <div class="input-container"><input type="password" v-bind="login.password" id="pass" required="required" /><label for="pass">Password</label>
                <div class="bar"></div>
            </div>
            <div class="button-container"><button ><span>Go</span></button></div>
        </form>
    </div>
    <div class="card alt">
        <div class="toggle" @click="isRegister=!isRegister" ></div>
        <h1  class="title" v-bind:class="{ none: !isRegister }">Register<div  class="close" @click="isRegister=!isRegister"></div>
        </h1>
        <form v-bind:class="{ none: !isRegister }" @submit.prevent="signup">
            <div class="input-container"><input type="text" id="usernamer" v-model="registerUser.username" required="required" /><label for="usernamer">Username</label>
                <div class="bar"></div>
            </div>
            <div class="input-container"><input type="text" id="emailR" v-model="registerUser.email" required="required" /><label for="emailR">Email</label>
                <div class="bar"></div>
            </div>
            <div class="input-container"><input type="text" id="from" v-model="registerUser.from" required="required" /><label for="from">From</label>
                <div class="bar"></div>
            </div>
            <div class="input-container"><input type="text" id="imguser" v-model="registerUser.userImg"/><label for="imguser">Img Url-not must</label>
                <div class="bar"></div>
            </div>
            <div class="input-container"><input type="text" id="description" v-model="registerUser.desc" required="required" /><label for="description">Description</label>
                <div class="bar"></div>
            </div>
           
          

            <div class="input-container"><input type="password" v-model="registerUser.password" id="passR" required="required" /><label for="passR">Password</label>
                <div class="bar"></div>
            </div>
            
            <div class="button-container"><button><span>Next</span></button></div>
        </form>
    </div>
</div>
    </div>
</template>

<script>

export default {
    name:'login-sign-up',
    data(){
        return {
            isRegister:false,
            login:{
                email:"",
                password:""
            },
            registerUser:{
                username:'',
                email:'',
                password:'',
                userImg:'',
                from:'',
                desc:''
            }
        }
    },
    methods:{
        async makeLogin(){
            try{
                await this.$store.dispatch({type:"login", user:this.login});
                this.$router.push('/');
                //  this.$notify({
                //     title: 'Welcome back ',
                //     message: 'Welcome back',
                //     type: 'success'
                // });
            }
            catch(err){
                console.log(err);
            }
        },
        async signup(){
            try{
                if(!this.registerUser.userImg){
                    this.registerUser.userImg = 'https://i.pinimg.com/564x/bb/18/3a/bb183a6e148512c3b7cea8e1584f3adf.jpg';
                }
                await this.$store.dispatch({type:'signup', user:this.registerUser});
                this.$router.push('/');
                //  this.$notify({
                //     title: 'Welcome !',
                //     message: 'Welcome!',
                //     type: 'success'
                // });
            }
            catch(err){
                throw err;
            }
        }

    }
   
}
</script>
