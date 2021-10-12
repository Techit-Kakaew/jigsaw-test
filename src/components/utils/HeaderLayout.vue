<template>
    <div class="header-layout">
        <div class="panel">
            <Hamburger 
                v-if="!isShowSidebar" 
                color="#828282"
                @toggle="setSidebar(!isShowSidebar)" />
            <div :class="['title', { 'no-gap-title': isShowSidebar }]">
                {{ sidebarTitle }}
                <div class="wrapper-action">
                    <img class="icon-chevron" src="@/assets/icon/icon-chevron.svg" alt="icon-chevron">
                </div>
            </div>
        </div>
        <div class="panel">
            <slot name="custom-action" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hamburger from '@/components/utils/Hamburger.vue'
import { useSidebar } from '@/use/useSidebar'

export default defineComponent({
    name: 'HeaderLayout',
    components: {
        Hamburger
    },
    setup() {
        const { isShowSidebar, setSidebar, sidebarTitle } = useSidebar()

        return { isShowSidebar, setSidebar, sidebarTitle }
    },
})
</script>

<style lang="scss" scoped>

    .no-gap-title {
        margin-left: 0 !important;
    }
    .header-layout {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        >.panel {
            display: flex;
            align-items: center;
            >.title {
                display: flex;
                align-items: center;
                font-size: 20px;
                font-weight: bold;
                margin-left: 25px;
                >.wrapper-action {
                    display: flex;
                    align-items: center;
                    width: 30px;
                    height: 30px;
                    border-radius: 4px;
                    padding: 6px;
                    background: #E8E8EA;
                    margin-left: 8px;
                    cursor: pointer;
                    >.icon-chevron {
                        transform: rotateX(180deg);
                    }
                }
            }
        }
    }
</style>
