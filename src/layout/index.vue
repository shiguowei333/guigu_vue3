<template>
    <div class="layout_container">
        <div class="layout_slider">123</div>
        <div class="layout_topbar">456</div>
        <div class="layout_main">789</div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
    .layout_container {
        width: 100%;
        height: 100vh;
        .layout_slider {
            width: $base-menu-width;
            background: $base-menu-background;
            height: 100vh;
        }
        .layout_topbar {
            position: fixed;
            top: 0;
            left: $base-menu-width;
            width: calc(100% - $base-menu-width);
            height: $base-tabbar-height;
        }
        .layout_main {
            position: absolute;
            width: calc(100% - $base-menu-width);
            height: calc(100vh - $base-tabbar-height);
            top: $base-tabbar-height;
            left: $base-menu-width;
            padding: 20px;
            overflow: auto;
        }
    }
</style>
