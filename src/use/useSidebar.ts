import { ref } from 'vue'

const isShowSidebar = ref<boolean>(JSON.parse(localStorage.getItem('isShowSidebar') || 'false'))
const sidebarTitle = ref<string>('')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSidebar = () => {
    const setSidebar = (value: boolean) => {
        isShowSidebar.value = value
        localStorage.setItem('isShowSidebar', JSON.stringify(isShowSidebar.value) as string)
    }

    const setSidebarTitle = (value: string | undefined) => {
        if(value) {
            sidebarTitle.value = value
        }
    }
    return { isShowSidebar, setSidebar, sidebarTitle, setSidebarTitle }
}