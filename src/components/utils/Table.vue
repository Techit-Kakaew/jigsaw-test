<template>
    <div class="custom-table">
        <div class="table-fix">
            <table class="table table-borderless">
                <thead class="header">
                    <tr>
                        <th
                            v-for="(header, index) in headers"
                            :key="index"
                            class="">
                            <slot 
                                :name="`header-${header.key}`"
                                :data="header"
                                :index="index">
                                <span class="header-text">{{ header.text }}</span>
                            </slot>
                        </th>
                    </tr>
                </thead>
                <tbody class="body">
                    <tr v-for="(item, index) in newItems"
                        :key="index">
                        <td 
                            v-for="header in headers"
                            :key="header.key">
                            <slot 
                                :name="`body-${header.key}`"
                                :data="item"
                                :index="index">
                                <span class="body-text">{{ item[header.key] }}</span>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="action">
            <div class="custom-pagination">
                <button class="btn btn-first-page" @click="currentPage = 1">
                    <img class="icon icon-first-page" src="@/assets/icon/icon-chevron.svg" alt="">
                    <img class="icon icon-first-page" src="@/assets/icon/icon-chevron.svg" alt="">
                </button>
                <button 
                    class="btn btn-previous-page" 
                    @click="currentPage > 1 ? currentPage -= 1 : currentPage = currentPage">
                    <img class="icon" src="@/assets/icon/icon-chevron.svg" alt="">
                </button>
                <template v-for="item in countPage" :key="item">
                    <button 
                        :class="['btn', 'btn-item', { active: currentPage === item }]" 
                        @click="handleChangePage(item)">
                        {{ item }}
                    </button>
                </template>
                <button 
                    class="btn btn-next-page"
                    @click="currentPage < countPage ? currentPage += 1 : currentPage = currentPage">
                    <img class="icon" src="@/assets/icon/icon-chevron.svg" alt="">
                </button>
                <button class="btn btn-last-page" @click="currentPage = countPage">
                    <img class="icon icon-last-page" src="@/assets/icon/icon-chevron.svg" alt="">
                    <img class="icon icon-last-page" src="@/assets/icon/icon-chevron.svg" alt="">
                </button>
            </div>
            <div class="page-size">
                <select class="form-select" v-model="pageSize">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                </select>
                <div class="text">
                    {{ `Display ${offset + 1}${currentPage * pageSize > items.length ? `-${items.length}` : `-${currentPage * pageSize}`} from ${items.length}` }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'

interface headerI {
    text: string;
    key: string;
}

export default defineComponent({
    name: 'Table',
    props: {
        headers: {
            type: Array as PropType<headerI[]>,
            default: () => []
        },
        items: {
            type: Array as PropType<unknown[]>,
            default: () => []
        }
    },
    setup(props) {
        const offset = ref<number>(0)
        const pageSize = ref<number>(25)
        const currentPage = ref<number>(1)

        const newItems = computed(() => {
            return props.items.slice(offset.value, currentPage.value * pageSize.value)
        })

        const countPage = computed(() => {
            return Math.ceil(props.items.length / pageSize.value)
        })

        const handleChangePage = (pageSelected: number) => {
            currentPage.value = pageSelected
        }

        watch(currentPage, (value) => {
            offset.value = Math.ceil((value - 1) * pageSize.value)
        })

        watch(pageSize, () => {
            currentPage.value = 1
        })

        return { offset, pageSize, currentPage, newItems, countPage, handleChangePage }
    },
})
</script>


<style lang="scss" scoped>
    .custom-table {
        .table-fix {
            height: calc(100vh - 346px);
            overflow: auto;
            .table {
                border-collapse: collapse;
                .header {
                    position: sticky;
                    top: 0;
                    border-bottom: 3px solid #E8E8EA;
                    box-shadow: 0px 2px 12px rgba(23, 28, 45, 0.1);
                    background: #ffffff;
                    z-index: 1;
                    th {
                        color: #454957;
                        padding: 20px 15px 10px 15px;
                        >.header-text {
                            color: #454957;
                        }
                    }
                }
                .body {
                    tr {
                        &:nth-child(even) {
                            background: #F9F9FC;
                        }
                        td {
                            padding: 15px;
                            vertical-align: middle;
                            >.body-text {
                                color: #454957;
                            }
                        }
                    }
                }
            }
        }
        .action {
            display: flex;
            align-items: center;
            justify-content: space-between;
            >.custom-pagination {
                display: flex;
                align-items: center;
                .btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 30px;
                    height: 30px;
                    margin-right: 4px;
                }
                >.btn-first-page, >.btn-previous-page {
                    position: relative;
                    background: #F8F8F9;
                    >.icon-first-page:nth-child(1) {
                        position: absolute;
                        left: 2px;
                    }
                    >.icon-first-page:nth-child(2) {
                        position: absolute;
                        right: 2px;
                    }
                    .icon {
                        transform: rotate(-90deg);
                    }
                }
                >.btn-last-page, >.btn-next-page {
                    position: relative;
                    background: #F8F8F9;
                    >.icon-last-page:nth-child(1) {
                        position: absolute;
                        left: 2px;
                    }
                    >.icon-last-page:nth-child(2) {
                        position: absolute;
                        right: 2px;
                    }
                    .icon {
                        transform: rotate(90deg);
                    }
                }
                >.btn-item {
                    border: 1px solid #E8E8EA;
                    &.active {
                        color: #ffffff;
                        background: #454957;
                    }
                }
            }
            >.page-size {
                display: flex;
                align-items: center;
                >.text {
                    margin-left: 8px;
                    min-width: 170px;
                    font-size: 14px;
                }
            }
        }
    }
</style>