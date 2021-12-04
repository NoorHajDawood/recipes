<template>
<section>
<section  v-if="recipeToEdit" class="edit-comp margin-top">
    <section class=" recipe-details">
    <form @submit.prevent="saveRecipe">
    <h2>{{title}}</h2>
    <section class="widthInputs">
        
      <label   class="input  ">
        <input class="input__field" type="text" placeholder=" " v-model="recipeToEdit.title"/>
        <span class="input__label">Recipe Name</span>
    </label>
      <label  class="input " >
        <input class="input__field" type="text" placeholder=" "  v-model="recipeToEdit.imageUrl"/>
        <span class="input__label">Recipe Img</span>
    </label>
      <label  class="input ">
        <input class="input__field" type="text" placeholder=" "  v-model="recipeToEdit.description"/>
        <span class="input__label">Short Description</span>
    </label>
    </section>
    
    <div class="pickers">
            <el-time-select  @change="setPrepTime" v-model="recipeToEdit.prepTime"
                
                    :picker-options="{
                        start: '00:05',
                        step: '00:05',
                        end: '05:30'
                    }"
                    placeholder="Preparation time">
            </el-time-select>
            <div class="serving">
                <h3>Serving:</h3><el-input-number placeholder="Serving" v-model="recipeToEdit.serving" controls-position="right"  :min="1" :max="100"></el-input-number>
            </div>
    </div>
        <h2>Ingredients</h2>

        <div class="ingredient" v-for="(ingredient, idx1) in recipeToEdit.ingredients" :key="idx1">
       
        
            <label class="input" >
                <input class="input__field"  v-model="recipeToEdit.ingredients[idx1].name" type="text" placeholder=" " />
                <span class="input__label">Ingredient {{idx1+1}}</span>
            </label>
            
        
            <div class="select-unit">
                    <el-radio-group size="mini" v-model="recipeToEdit.ingredients[idx1].unit">
                        <el-radio-button  label="cups"></el-radio-button>
                        <el-radio-button  label="tabelspoons"></el-radio-button>
                        <el-radio-button  label="teaspoons"></el-radio-button>
                        <el-radio-button  label="liters"></el-radio-button>
                        <el-radio-button  label="grams"></el-radio-button>
                        <el-radio-button  label="kilograms"></el-radio-button>
                    </el-radio-group>
                </div>
                    <div class="containerQuant">
                        <h3>Quantity: </h3>&nbsp;&nbsp;&nbsp;
                        <div>
                          <el-input-number :step=step class="inputQuantity" placeholder="Quantity"  v-model="recipeToEdit.ingredients[idx1].quantity" controls-position="right"  :min="0" :max="100"></el-input-number>
                        </div>
                    </div>
        </div>
        <div class="button-h3">
            <div class="addButton" @click="addIngredient"></div><h3>Add Ingredient</h3>
        </div>
        <h2>Steps</h2>
        <div class="ingredient" v-for="(instruction, idx) in recipeToEdit.instructions" :key="idx+100">
            <label class="input" >
                <input class="input__field"  v-model="recipeToEdit.instructions[idx]" type="text" placeholder=" " />
                <span class="input__label">Step {{idx+1}}</span>
            </label>
        </div>
        <div class="button-h3">
            <div class="addButton" @click="addInstruction"></div><h3>Add Instruction</h3>
        </div>
        <button>Save</button>
    </form>
    </section>
    </section>
    <div v-else class="containe-loader">
            <div class="loading">
            </div>
    </div>
</section>

</template>

<script>
export default {
    name:"recipeEdit",
data(){
    return {
        recipeToEdit:null,
        step:0.05
    }
},
created(){
    const recipeId = this.getRecipeId;  
    if(recipeId){
        this.$store.dispatch({type:"getRecipe", recipeId})
            .then(recipe=>{
                this.recipeToEdit = JSON.parse(JSON.stringify(recipe));
        });
    }else{
        this.recipeToEdit = this.emptyRecipe();
    }
    },
    methods: {
        emptyRecipe(){
           
         return ({
                    "_id": 0,
                    "title": "",
                    "imageUrl": "",
                    "description": "",
                    "prepTime": "",
                    "serving": "",
                    "memberId": null,
                    "ingredients": [
                    {
                        "name": "",
                        "quantity": " ",
                        "unit": " "
                    }
                    ],
                    "instructions": [""],
                    "likes": 0 
                    })
        },
        addIngredient() {
            this.recipeToEdit.ingredients.push({
                "name": "",
                "quantity": "",
                "unit": ""
            });
        },
        addInstruction(){
            this.recipeToEdit.instructions.push("");
        },
        setPrepTime(prepTime){
            this.recipeToEdit.prepTime = prepTime + " Min";
        }
        ,saveRecipe(){
            // new recipe
            if(!this.getRecipeId){
                this.$store.dispatch({type:"addRecipe", recipe:this.recipeToEdit})
                    .then(recipe=>{
                        // send msg
                        this.$router.push('/');
                    })
            }
            else{
                this.$store.dispatch({type:"updateRecipe", recipe:this.recipeToEdit})
                    .then(recipe =>{
                        // send msg
                        this.$router.push('/');
                    })
            }
        }
    },
computed:{
    title(){
        return  `Recipe ${(this.getRecipeId) ? "Edit" : "Create"}`;
        
    },
    getRecipeId(){
       return this.$route.params.recipeId ;
    }
}
}
</script>
