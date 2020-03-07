<template>
    <div class="row">
        <div id="article_browse" class="col-sm-2">
            <Category @change="filterArticleByCtg">
            </Category>
        </div>
        <div id="article_list" class="col-sm-7">
            <div class="card-header bg-danger" style="color: white">
                Articles
            </div>
            <div id="article_filter" class="card-header bg-light">
                <div class="form-group form-inline">
                    <label for="sel1">Sort Articles:</label>
                    <select class="form-control" id="sel1" style="width: 20%; margin: 0 10px" v-model="selected">
                        <option
                                v-for="(factor, index) in sortFactors"
                                :key="index"
                                ref="sortOption"
                        >
                            {{factor.text}}
                        </option>
                    </select>
                    <button class="btn-warning" type="button" @click="sortArticle">Sort</button>
                    <input
                            style="width: 20%; margin: 0 10px;"
                            type="text"
                            class="form-control"
                            placeholder="search title..."
                            v-model="filter.keyword"
                    >
                    <button class="btn-primary" type="button" @click="searchArticle()">Search</button>
                </div>
            </div>
            <div class="card-deck">
                <div class="card" v-for="article in this.articles" :key="article.articleId">
                    <div class="card-title">
                        <h3>{{article.title}}</h3>
                    </div>
                    <div class="card-subtitle">
                         <span>
                            author: {{ getAuthorStr(article.authors) }}
                            | views: {{article.views}}
                            | published time: {{ formatTime(article.createTime)}}
                            | <span style="color: red">Category: {{article.extra.category.categoryName}}</span>
                        </span>
                    </div>
                    <span style="display: flex; justify-content: flex-end">
                        <router-link
                                :to="{ name: 'article_detail', params: { id: article.articleId }}"
                                tag="button"
                                class="btn-success"
                        >
                            View
                        </router-link>
                        <router-link
                                :to="{ name: 'edit', params: { id: article.articleId }}"
                                tag="button"
                                class="btn-secondary"
                                v-if="loginState"
                        >
                            Edit
                        </router-link>
                        <button class="btn-sm btn-danger" v-if="loginState" @click="deleteArticle(article.articleId)">Delete</button>
                    </span>

                    <el-divider></el-divider>
                    <div class="card-body">
                        {{ article.bodyMd.slice(0, 50) }}...
                    </div>
                    <div class="card-footer bg-light text-dark">
                        <small class="text-muted">Last updated: {{ formatTime(article.updateTime)}}</small>
                    </div>
                </div>
            </div>
            <vue-pagination
                    @change="pageChange"
                    class="pageNav"
                    :page-config="pageConfig">
            </vue-pagination>
        </div>
    </div>

</template>

<script>
    // import {Message, MessageBox} from 'element-ui'
    import {deleteArticle, filterArticle} from "@/api/article";
    import {formatTime} from "@/utils/timeParser"
    import Category from "@/components/Category/Category";
    import VuePagination from "@/components/Pagination/VuePagination";
    import {Message, MessageBox} from 'element-ui';
    import {mapGetters} from "vuex";

    export default {
        name: "browse",
        components: {
            Category,
            VuePagination
        },
        computed: {
            ...mapGetters([
                'loginState'
            ])
        },
        data() {
            return {
                selected: '',
                filter: {
                    categoryId: -1,
                    sort: 'default',
                    keyword: ''
                },
                // currentSortProperty: 'default',
                sortFactors: [
                    {text: 'Default', property: 'default'},
                    {text: 'Hottest', property: 'views'},
                    {text: 'Latest Published', property: 'createTime'},
                    {text: 'Latest Updated', property: 'updateTime'},

                ],
                // categoryId: -1,
                articles: [],
                pageConfig: {pageSize: 4, currentPage: 1, totalPages: 0}
            }
        },
        methods: {
            formatTime(time) {
                return formatTime(time, "")
            },
            getAuthorStr(authorList) {
                let authorStr = "";
                for (let i = 0; i < authorList.length; i++) {
                    authorStr += authorList[i]["username"];
                }
                return authorStr;
            },
            deleteArticle(id) {
                console.log(id);
                MessageBox.confirm('delete article?', 'Confirm', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    deleteArticle(id).then(response => {
                        if (response.code === 200) {
                            Message({
                                message: response.message,
                                type: "success",
                                duration: 500
                            })
                        } else {
                            Message({
                                message: response.message,
                                type: "error",
                                duration: 500
                            })
                        }
                    });
                    location.reload();
                    // this.$router.push('/articles');
                }).catch(() => {
                    Message({
                        type: "info",
                        message: 'Canceled',
                        duration: 500
                    })
                });

            },
            pageChange(page) {
                // eslint-disable-next-line no-debugger
                // debugger
                this.pageConfig.currentPage = page;
                this.filterArticleByCtg(this.filter.categoryId);

            },
            filterArticleByCtg(id) {
                this.filter.categoryId = id;
                filterArticle(this.filter, this.pageConfig.currentPage, this.pageConfig.pageSize).then(response => {
                    const {data} = response;
                    this.articles = data.articles;
                    this.pageConfig.totalPages = data.totalPages;
                });

            },
            sortArticle() {
                let index = 0;
                for (let i = 0; i < this.sortFactors.length; i++) {
                    if (this.sortFactors[i].text === this.selected) {
                        index = i;
                        break;
                    }
                }
                const factor = this.sortFactors[index];
                this.filter.sort = factor.property;
                filterArticle(this.filter, this.pageConfig.currentPage, this.pageConfig.pageSize).then(response => {
                    const {data} = response;
                    this.articles = data.articles;
                    this.pageConfig.totalPages = data.totalPages;
                });


            },
            searchArticle() {
                filterArticle(this.filter, this.pageConfig.currentPage, this.pageConfig.pageSize).then(response => {
                    const {data} = response;
                    this.articles = data.articles;
                    this.pageConfig.totalPages = data.totalPages;
                });
            }
        },
        mounted: function () {

            filterArticle(this.filter, this.pageConfig.currentPage, this.pageConfig.pageSize).then(response => {
                const {data} = response;
                this.articles = data.articles;
                this.pageConfig.totalPages = data.totalPages;
            });
        }
    }
</script>

<style scoped>

    .row {
        width: 100%;
    }

    #article_list {
        /*padding-left: 50px;*/
    }

    .card {
        border: 10px solid lightcoral;
        border-radius: 20px;
        padding: 10px;
        margin-top: 20px;
        min-width: 80%;
    }

</style>