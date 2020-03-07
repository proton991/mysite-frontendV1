<template>
    <div class="list-group">
        <div class="card-header bg-light">
            Category
        </div>
        <a
                class="list-group-item list-group-item-action"
                href="javascript:void(0)"
                @click="filterByCtg(-1)"
                :class="{active : -1 === currentId}">
            ALL
        </a>
        <a
                class="list-group-item list-group-item-action"
                v-for="category in categories"
                :key="category.categoryId"
                href="javascript:void(0)"
                :class="{active : category.categoryId === currentId}"
                @click="filterByCtg(category.categoryId)"
        >
            {{category.categoryName}}
        </a>
    </div>
</template>

<script>
    import {getArticleCategory} from "@/api/article";

    export default {
        name: "Category",
        data() {
            return {
                currentId: '',
                categories: []
            }
        },
        mounted: function () {
            getArticleCategory().then(response => {
                const {data} = response;
                this.categories = data;
            })
        },
        methods: {
            filterByCtg(id) {
                this.currentId = id;
                this.$emit('change', id);
            }
        }
    }
</script>

<style scoped>
    .list-group {
        text-align: center;
        white-space: normal;
        word-wrap: break-word;
        word-break: break-all;
    }
</style>