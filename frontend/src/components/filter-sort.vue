<template>
<section class="margin-top main-layout ">
<div class="flexFilter">
    <el-input @input="debounce"
        placeholder="Search recipe..."
        prefix-icon="el-icon-search"
        v-model="filter.title">
    </el-input>
    <el-dropdown @command="setFilter" class="margin-right">
    <el-button type="primary"  >
        Sort by<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu class="margin-right" slot="dropdown">
        <el-dropdown-item command='prepTime'>Preparation Time</el-dropdown-item>
        <el-dropdown-item command='likes'>Likes</el-dropdown-item>
        <el-dropdown-item command='title'>Title</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>
</div>
</section>

</template>

<script>
import {utillService} from '../services/util-service';
export default {
    data(){
        return {
            filter:{
                sort:'title',
                title:''
            }
        }
    },
    created(){
        this.debounce = utillService.debounce(this.filterRecipes, 1500);

    },
    methods: {
        setFilter(str){
            this.filter.sort = str;
            this.filterRecipes();
        },
        filterRecipes(){
            this.$emit('setFilter', this.filter);
        },
        debounce(){}
    },

}
</script>

<style>

</style>