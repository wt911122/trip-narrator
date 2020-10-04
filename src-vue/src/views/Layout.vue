<template>
    <div :class="$style.layout">
        <div :class="$style.sideBar">
            <slot name="sideBar"></slot>
        </div>
        <div :class="$style.container">
            <slot name="container"></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style module>
.layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
.sideBar {
    width: 240px;
}
.container { 
    flex: 1;
}
@media only screen
and (min-device-width : 320px)
and (max-device-width : 680px)
and (orientation : portrait){
    .layout {
        flex-direction: column;
    }
    .sideBar {
        width: 100%;
        height: 120px;
    }
}
</style>