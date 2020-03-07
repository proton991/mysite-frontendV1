<template>
    <div>
        <Map>
        </Map>
    </div>
</template>

<script>
    import Map from "@/components/ChinaMap/Map";
    export default {
        name: "home",
        components: {
            Map
        },
        mounted: function () {
            console.log(this.$route.name)
        }
    }
</script>

<style scoped>

</style>