<template>
    <div :class="['sidebar']">
        <div class="header">
            <div class="title">{{ sidebarTitle }}</div>
            <div class="custom-hamburger">
                <img class="icon-chevron" src="@/assets/icon/icon-chevron-grey.svg" alt="icon-chevron">
                <Hamburger @toggle="setSidebar(!isShowSidebar)" />
            </div>
        </div>
        <div class="side-item">
            <template v-for="(menu, menuIndex) in sidebarMenuList" :key="menu.id">
                <div class="side-list" @click="menu.linkTo && handleSideSelected(menuIndex, menu.linkTo)">
                    <div 
                        :class="['detail', { active: (currentSideSelected === menu.id) || currentParentSubMenuActive === menu.id }]"
                        @click="currentSideSelected === menu.id && menu?.subMenu?.length
                                ? currentSideSelected = 0 : currentSideSelected = menu.id">
                        <img class="icon" :src="getIcon(`${menu.icon}`)" :alt="`icon-menu-${menu.id}`">
                        <div class="text">{{ menu.name }}</div>
                        <img v-if="menu?.subMenu?.length" class="icon-chevron-collapse" src="@/assets/icon/icon-chevron-grey.svg" alt="icon-chevron">
                    </div>
                    <transition name="slide-fade">
                        <div 
                            v-if="(menu?.subMenu?.length && currentSideSelected === menu.id) || currentSubMenuSelected"
                            class="sub-menu">
                            <div 
                                :class="['text', { active: currentSubMenuSelected === subMenu.id }]"
                                v-for="subMenu in menu.subMenu"
                                :key="subMenu.id"
                                @click="handleSubMenuSelected(subMenu.id, subMenu.name, subMenu.linkTo)">
                                <div class="spot-round" />{{subMenu.name}}
                            </div>
                        </div>
                    </transition>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useSidebar } from '@/use/useSidebar'
import { useRoute, useRouter } from 'vue-router'
import Hamburger from '@/components/utils/Hamburger.vue'

interface SidebarMenuListI {
    id: number;
    icon?: string | undefined;
    name: string;
    linkTo?: string | undefined;
    subMenu?: SidebarMenuListI[] | undefined
}

export default defineComponent({
    name: 'Sidebar',
    components: {
        Hamburger
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const { isShowSidebar, setSidebar, sidebarTitle, setSidebarTitle } = useSidebar()
        const currentSideSelected = ref<number>(2)
        const currentSubMenuSelected = ref<number>(0)
        const currentParentSubMenuActive = ref<number>(0)
        const sidebarMenuList = reactive<SidebarMenuListI[]>([
            {
                id: 1,
                icon: 'icon-dashboard.svg',
                name: 'Dashboard',
                linkTo: '/dashboard'
            },
            {
                id: 2,
                icon: 'icon-contact.svg',
                name: 'Contact Person List',
                linkTo: '/contact'
            },
            {
                id: 3,
                icon: 'icon-report.svg',
                name: 'Report',
                linkTo: '/report'
            },
            {
                id: 4,
                icon: 'icon-setting.svg',
                name: 'Setting',
                subMenu: [
                    {id: 1, name: 'Manage Layout', linkTo: '/manage-layout'}, 
                    {id: 2, name: 'Member', linkTo: '/member'}, 
                    {id: 3, name: 'Data Access', linkTo: '/data-access'}, 
                    {id: 4, name: 'System log', linkTo: '/system-log'}
                ]
            }
        ])

        const getIcon = (icon: string) => {
            return require(`@/assets/icon/${icon}`)
        }

        const handleSideSelected = (menuIndex: number, linkTo: string) => {
            router.push(linkTo)
            if(!sidebarMenuList[menuIndex]?.subMenu) {
                setSidebarTitle(sidebarMenuList[menuIndex]?.name)
            }
            if(window.innerWidth <= 1024) {
                setSidebar(false)
            }
        }

        const handleSubMenuSelected = (subMenuId: number, name: string, linkTo: string) => {
            currentSubMenuSelected.value = subMenuId
            router.push(linkTo)
            setSidebarTitle(name)
            if(window.innerWidth <= 1024) {
                setSidebar(false)
            }
        }

        const setCurrentSubMenuSelected = () => {
            sidebarMenuList.forEach(menu => {
                if(menu.subMenu) {
                    const currentSubMenu = menu.subMenu.find(sub => sub.linkTo === route.fullPath)
                    if(currentSubMenu) {
                        currentSubMenuSelected.value = +(currentSubMenu?.id || 0)
                        currentParentSubMenuActive.value = menu.id
                        setSidebarTitle(currentSubMenu.name)
                    }
                }
            })
        }

        const initialize = () => {
            currentSideSelected.value = +(sidebarMenuList.find(menu => menu.linkTo === route.fullPath)?.id || 0)
            setCurrentSubMenuSelected()
            if(currentSideSelected.value) {
                setSidebarTitle(sidebarMenuList.find(menu => menu.id === currentSideSelected.value)?.name)
            }
        }

        watch(currentSideSelected, (value) => {
            // clear sub menu selected
            if(value) {
                currentSubMenuSelected.value = 0
                currentParentSubMenuActive.value = 0
            }
        })

        onMounted(() => {
            initialize()
        })

        return {
            sidebarTitle,
            setSidebar,
            isShowSidebar,
            currentSideSelected,
            currentSubMenuSelected,
            currentParentSubMenuActive,
            sidebarMenuList,
            getIcon,
            handleSideSelected,
            handleSubMenuSelected
        }
    },
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
        transform: translateY(-20px);
        opacity: 0;
    }
    
    @mixin hover-style {
        transition: background .25s ease-in-out;
        background: rgba($color: #ffffff, $alpha: 0.16);
    }

    .sidebar {
        position: sticky;
        top: 75px;
        left: 0;
        width: 300px;
        height: calc(100vh - 75px);
        background: #171c2d;
        @media (max-width: 1024px) {
            position: fixed;
            z-index: 100;
        }
        >.header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            >.title {
                color: #ffffff;
                font-size: 18px;
            }
            >.custom-hamburger {
                display: flex;
                align-items: center;
                >.icon-chevron {
                    transform: rotate(-90deg);
                }
            }
        }
        >.side-item {
            >.side-list {
                position: relative;
                cursor: pointer;
                >.detail {
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    &:hover, &.active {
                        @include hover-style();
                    }
                    &.active {
                        .icon-chevron-collapse {
                            transform: rotateX(0);
                            transition: transform .25s ease-in-out;
                        }
                    }
                    >.icon {
                        margin-right: 15px;
                    }
                    >.text {
                        color: #f1f1f2;
                        font-size: 16px;
                    }
                    >.icon-chevron-collapse {
                        margin-left: auto;
                        transform: rotateX(-180deg);
                        transition: transform .25s ease-in-out;
                    }
                }
                >.sub-menu {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-left: 33px;
                    >.text {
                        display: flex;
                        align-items: center;
                        width: 100%;
                        color: #ffffff;
                        padding: 12px;
                        &:hover, &.active {
                            @include hover-style();
                        }
                        >.spot-round {
                            width: 6px;
                            height: 6px;
                            border: 1px solid #ffffff;
                            border-radius: 50%;
                            margin-right: 8px;
                        }
                    }
                }
            }
        }
    }
</style>