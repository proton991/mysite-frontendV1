<template>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="{path: '/'}" tag="a" class="nav-link">
                        Home
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{path: '/articles'}" tag="a" class="nav-link">
                        Articles
                    </router-link>

                </li>
                <li class="nav-item">
                    <router-link :to="{path: '/photos'}" tag="a" class="nav-link">
                        Photos
                    </router-link>
                </li>
            </ul>
            <ul class="navbar-nav" style="margin-left: auto">
                <li class="nav-item" v-if="loginState">
                    <router-link :to="{ path: '/mEditor'}">
                        <button class="btn btn-danger" type="button">Write</button>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ path: '/login'}">
                        <button class="btn btn-primary" type="button" v-if="!loginState">Login</button>
                    </router-link>
                </li>
                <li class="nav-item dropdown" v-if="loginState" style="margin-right: 5rem">
                    <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" style="color: whitesmoke">
                        {{name}}
                    </a>
                    <div class="dropdown-menu">
                        <router-link :to="{ path : '/console'}" class="dropdown-item" tag="a">Console</router-link>
                        <div class="dropdown-divider"></div>

                        <a class="dropdown-item" href="#" @click="handleLogout">Logout</a>
                    </div>
                </li>
            </ul>

        </div>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "Header",
        computed: {
            ...mapGetters([
                'name',
                'loginState'
            ])
        },
        methods: {
            handleLogout() {
                this.$store.dispatch('user/logout');
                this.$router.push('/')
            },
        },
    }
</script>

<style scoped>

    ul li {
        padding-left: 1rem;
    }

</style>