<template>
    <Layout>
        <SideBar slot="sideBar"></SideBar>
        <Container slot="container"></Container>
    </Layout>
</template>

<script>
import Layout from './Layout.vue';
import SideBar from './SideBar.vue';
import Container from './Container.vue';
export default {
    components: {
        Layout,
        SideBar,
        Container
    }
}
</script>

<style>

</style>