<template>
    <div class="card" id="article_detail">
        <div class="card-header" style="display: flex; justify-content: space-between">
            <button class="btn-primary" @click="pageBack">Back</button>
            <h4>Article Detail</h4>
        </div>

        <div class="card-body">
            <div class="card-subtitle">
                <h5>
                    &nbsp;&nbsp;Author: {{ article["authors"]}}&nbsp;&nbsp;
                    |&nbsp;&nbsp;Published Time: {{article["createTime"]}}&nbsp;&nbsp;
                    |&nbsp;&nbsp;Last Updated Time: {{article["updateTime"]}}
                    |&nbsp;&nbsp;Views: {{article["views"]}}
                    |&nbsp;&nbsp;<span style="color: red">Category: {{article.extra.category.categoryName}}</span>
                </h5>
            </div>
            <el-divider></el-divider>
            <h2 class="card-title">
                {{ article['title']}}
            </h2>
            <div class="card-text" v-highlight v-html="article['bodyHtml']">
            </div>
        </div>
    </div>
</template>

<script>
    import {getArticleById} from "@/api/article";
    import {formatTime} from "@/utils/timeParser"
    export default {
        name: "detail",
        data: function () {
            return {
                article: {}
            }
        },
        mounted: function () {

            getArticleById(this.$route.params.id).then(response => {
                const {data} = response;
                this.article = data;
                // console.log(this.article);
                let authorStr = "";
                const authorList = this.article.authors;
                for (let i = 0; i < authorList.length; i++) {
                    authorStr += authorList[i]["username"];
                }
                this.article.authors = authorStr;
                this.article.createTime = formatTime(this.article.createTime, "");
                this.article.updateTime = formatTime(this.article.updateTime, "");
            });
        },
        methods: {
            pressLike() {

            },
            pageBack() {
                // history.back();
                this.$router.go(-1);
            }
        }

    }
</script>

<style scoped>
    #article_detail {
        width: 80%;
        margin: 10px auto;
    }
</style>