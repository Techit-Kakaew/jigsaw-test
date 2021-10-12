<template>
    <NavBar />
    <div class="layout">
        <transition name="slide-fade">
            <SideBar v-show="isShowSidebar" />
        </transition>
        <div class="container-layout">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/layouts/NavBar.vue'
import SideBar from '@/components/layouts/Sidebar.vue'
import { useSidebar } from '@/use/useSidebar'

export default defineComponent({
    name: 'default-layout',
    components: {
        NavBar,
        SideBar
    },
    setup() {
        const { isShowSidebar } = useSidebar()

        return { isShowSidebar }
    }
})
</script>

<style lang="scss" scoped>
    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(-75px);
        opacity: 0;
    }
    .no-gap-title {
        margin-left: 0 !important;
    }
    .layout {
        display: flex;
        .container-layout {
            width: 100%;
            text-align: left;
        }
    }
</style>
