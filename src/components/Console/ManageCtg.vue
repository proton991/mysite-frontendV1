<template>
  <form>
    <div class="card">
      <div class="card-header">
        Article Categories
      </div>
      <span class="card-subtitle" style="padding: 1rem; color: red">
        You can only change the name of a category,
        or delete it when there are no articles of that category.
      </span>
      <div class="list-group">
        <a
                class="list-group-item"
                v-for="category in categories"
                :key="category.categoryId"
                style="display: flex; justify-content: space-between"
        >
          <span>{{ category.categoryName}}</span>
          <span>
              <button class="btn-warning" @click="editCtg(category.categoryId)">edit</button>
              <button class="btn-danger"  @click="deleteCtg(category.categoryId, category.categoryName)">
                  delete
              </button>
          </span>
        </a>
      </div>
    </div>
    <el-divider></el-divider>
    <span class="h4">Add new Categories</span>
    <div class="form-group" id="input-group-2">
      <input
              class="form-control"
              v-model="Category"
              style="width: 40%"
              placeholder="Enter Category..."
      >
    </div>
    <button type="submit" class="btn-primary" @click="newCtg">Submit</button>
  </form>
</template>

<script>
    import {Message, MessageBox} from 'element-ui'
    // eslint-disable-next-line no-unused-vars
    import {getArticleCategory, newCtg, editCtg, deleteCtg} from "@/api/article";
    export default {
        name: "ManageCtg",
        data() {
            return {
                Category: '',
                categories: []
            }
        },
        mounted: function() {
            getArticleCategory().then(response => {
                const {data} = response;
                this.categories = data;
            })
        },
        methods: {
            newCtg() {
                newCtg(this.Category).then(response => {
                    if (response.code === 200) {
                        Message({
                            message: 'Add category success!',
                            type: "success",
                            duration: 500
                        });
                        getArticleCategory().then(response => {
                            const {data} = response;
                            this.categories = data;
                        });
                    }
                });

            },
            editCtg(id) {
                MessageBox.prompt('Please enter a new name', 'Edit', {
                    confirmButtonText: 'Submit',
                    cancelButtonText: 'Cancel',
                }).then(({value}) => {
                    editCtg(id, value).then(response => {
                        if (response.code === 200) {
                            Message({
                                message: 'edit success!',
                                type: "success",
                                duration: 500
                            });
                            getArticleCategory().then(response => {
                                const {data} = response;
                                this.categories = data;
                            })
                        }
                    })
                })
            },
            deleteCtg(id, name) {
                MessageBox.confirm('Delete Category?', 'Confirm', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    deleteCtg(id, name).then(response => {
                        if (response.code === 200) {
                            Message({
                                message: 'delete success!',
                                type: "success",
                                duration: 500
                            });
                            getArticleCategory().then(response => {
                                const {data} = response;
                                this.categories = data;
                            })
                        }
                        else {
                            Message({
                                message: response.message,
                                type: "error",
                                duration: 500
                            })
                        }
                    });

                }).catch(() => {
                    Message({
                        type: "info",
                        message: 'Canceled',
                        duration: 500
                    })
                })
            }
        }
    }
</script>

<style scoped>
  .ctgList{
    max-height: 300px;
    overflow-y: scroll;
  }
</style>
