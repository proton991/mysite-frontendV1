<template>
    <div>
        <div class="top-bar" style="display: flex; justify-content: space-between; flex-grow: 1; padding: 10px">
            <router-link :to="{path: '/articles'}">
                <button  class="btn-primary btn-md" >
                    Back
                </button>
            </router-link>
            <div class="form-inline">
                Edit Your Article
                <input
                        style="margin-left: 1rem"
                        aria-required="true"
                        class="form-control"
                        id="title-input"
                        placeholder="Write your title here"
                        v-model="article.title"
                >[*]
                <span style="margin-left: 1rem">Choose your category</span>
                <select class="form-control"  style="margin-left: 1rem" v-model="article.categoryName" aria-required>
                    <option
                            v-for="(factor, index) in categories"
                            :key="index"
                    >
                        {{factor}}
                    </option>
                </select>[*]

            </div>
            <button
                    @click="post"
                    class="btn-success btn-md"
            >
                Post
            </button>
        </div>
        <mavon-editor
                fontSize="20px"
                :ishljs=true
                language="en"
                :tabSize=4
                class="mavonEditor"
                @save="save"
                @change="onChange"
                v-model="this.article.bodyMd"
        >

        </mavon-editor>
    </div>

</template>

<script>
    import {Message} from 'element-ui'
    // eslint-disable-next-line no-unused-vars
    import {getArticleById, postArticle, editArticle, getArticleCategory} from "@/api/article";

    export default {
        name: "MarkdownEditor",
        data() {
            return {
                article: {
                    title: '',
                    bodyMd: '',
                    bodyHtml: '',
                    author: '',
                    state: '',
                    categoryId: '',
                    categoryName: ''
                },
                tags: [],
                categories: [],
                categoryMap: {}
            }
        },
        watch: {
            '$route': function (to, from) {
                if ((to.name === 'new' && from.name === 'edit')||(to.name === 'edit' && from.name === 'new')) {
                    this.article.title = '';
                    this.article.bodyMd = '';
                    this.article.bodyHtml = '';
                }
            }
        },
        mounted: function () {
            if (this.$route.params["id"] !== undefined) {
                getArticleById(this.$route.params.id).then(response => {
                    const {data} = response;
                    this.article.title = data.title;
                    this.article.bodyMd = data.bodyMd;
                    this.article.bodyHtml = data.bodyHtml;
                    this.article.author = this.$store.state.user.name;
                    if (data.extra.category === null) {
                        this.article.categoryName = 'ALL';
                        this.article.categoryId = -1;
                    } else {
                        this.article.categoryName = data.extra.category.categoryName;
                        this.article.categoryId = data.extra.category.categoryId;
                    }
                });
            }
            getArticleCategory().then(response => {
                const {data} = response;
                const objList = data;
                for (let i = 0; i < objList.length; i++) {
                    this.categories.push(objList[i].categoryName);
                    this.categoryMap[objList[i].categoryName] = objList[i].categoryId;
                }
            });
            console.log(this.categoryMap);
        },
        methods: {
            onChange(val, render) {
                this.article.bodyMd = val;
                this.article.bodyHtml = render;
            },
            save(val, render) {
                if (this.article.title === '') {
                    Message({
                        message: "Title can't be null!",
                        type: "error",
                        duration: 800
                    });
                } else {
                    this.article.bodyHtml = render;
                    this.article.bodyMd = val;
                    this.article.author = this.$store.user.name;
                    this.article.state = 'draft';
                    this.article.categoryId = this.categoryMap[this.article.categoryName];
                    if (this.$route.params["id"] !== undefined) {
                        editArticle(this.$route.params["id"], this.article);
                    } else {
                        postArticle(this.article);
                    }

                }
            },
            post() {
                if (this.article.title === '') {
                    Message({
                        message: "Title can't be null!",
                        type: "error",
                        duration: 800
                    });

                } else {
                    this.article.author = this.$store.state.user.name;
                    this.article.state = 'published';
                    this.article.categoryId = this.categoryMap[this.article.categoryName];
                    console.log("edit article" + this.article);
                    if (this.$route.params["id"] !== undefined) {
                        editArticle(this.$route.params["id"], this.article).then(response => {
                            if (response.code === 200) {
                                Message({
                                    message: response.message,
                                    type: "success",
                                    duration: 800
                                })
                            } else {
                                Message({
                                    message: response.message,
                                    type: "error",
                                    duration: 800
                                })
                            }
                        })
                    } else {
                        postArticle(this.article).then(response => {
                            if (response.code === 200) {
                                Message({
                                    message: response.message,
                                    type: "success",
                                    duration: 800
                                })
                            } else {
                                Message({
                                    message: response.message,
                                    type: "error",
                                    duration: 800
                                })
                            }
                        })
                    }
                }
            }
        },
    }
</script>

<style scoped>

    #title-input {
        width: 30rem;
    }
    .top-bar {
        margin-top: -40px;
        width: 100%;
        background: wheat;
        color: black;
    }

    .mavonEditor {
        /*width: 800px;*/
        width: 100%;
        tab-size: 4;
        margin-bottom: 0;
        height: 50rem;
    }


</style>
