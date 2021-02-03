<template>
    <Header />
    <router-view></router-view>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: "Home",
    components: {
        Header
    }
}
</script>

<style lang="css">
    
</style>