<template>
    <div class="login_form">
        <div class="card-header bg-info">
            <h2>Login here</h2>
        </div>
        <form style="padding: 20px">
            <div class="form-group" >
                <label for="username">Username:</label>
                <input type="text" class="form-control" placeholder="Enter username" id="username" v-model="form.username">
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" placeholder="Enter password" id="pwd" v-model="form.password">
            </div>
            <button type="button" class="btn btn-primary" @click="handleLogin">Login</button>
            <button type="reset" class="btn btn-danger">Reset</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                form: {
                    username: "",
                    password: "",
                },
            }
        },

        methods: {
            handleLogin() {
                this.$store.dispatch('user/login', this.form).then(()=> {
                    this.$router.push('/');
                }).catch(error => {
                    console.log(error)
                    // alert(error)
                })
            },
        }
    }
</script>

<style scoped>
    .login_form {
        background: lightgoldenrodyellow;
        width: 30%;
        margin: 8rem auto;
    }
</style>