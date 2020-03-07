<template>
    <div id="console_container">
        <div class="card-header">
            <h2>Backend Console</h2>
        </div>
        <div class="row">
            <div class="col-sm-3">
                <div class="list-group">
                    <router-link
                            style="float-wrap: wrap"
                            :to="{ name : 'ctgManage', params: { panel_name : 'ctgManage'}}"
                            class="list-group-item
                        list-group-item-action"
                            tag="a"
                            :class="{active : $route.name === 'ctgManage'}"
                    >
                        Manage Article Categories
                    </router-link>
                    <router-link
                            :to="{ name : 'prfManage', params: { panel_name : 'prfManage'}}"
                            class="list-group-item
                        list-group-item-action"
                            tag="a"
                            :class="{active : $route.name === 'prfManage'}"
                    >
                        Manage Profile
                    </router-link>
                </div>
            </div>
            <div class="col-sm-8">
                <ManageCtg v-if="$route.name === 'ctgManage'">
                </ManageCtg>
            </div>
        </div>
    </div>
</template>

<script>
    import ManageCtg from "@/components/Console/ManageCtg";
    export default {
        name: "index",
        components: {
            ManageCtg,
        },
        data() {
            return {
                Category: '',
            }
        },
    }
</script>

<style scoped>
    @media only screen and (min-width: 900px)  {
        #console_container {
            margin: 5rem auto;
            width: 60%;
            background-color: whitesmoke;
        }
    }

</style>
