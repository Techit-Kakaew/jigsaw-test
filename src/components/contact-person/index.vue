<template>
    <div class="contact">
        <Modal
            id="select-column-modal"
            v-model="isShowSelectColumnModal"
            :closeVisible="false"
            :persistent="true">
            <div class="modal-header">
                <div class="title">Select the fields to display</div>
                <img 
                    class="icon-close" 
                    src="@/assets/icon/icon-close.svg" 
                    alt="icon-close"
                    @click="isShowSelectColumnModal = false">
            </div>
            <div class="modal-body bg-white px-3 pt-0 pb-3">
                <div class="column-list">
                    <div
                        v-for="(header, index) in columnCanSelectToDisplay"
                        :key="index" 
                        :class="['item', 'cursor-pointer', 'justify-content-center', 
                            { selected: findSelectedColumn(header)
                        }]"
                        @click="toggleSelectColumn(header)">
                        {{ header.text }}
                    </div>
                </div>
                <div class="action">
                    <button 
                        class="btn btn-save" 
                        @click="handleSaveColumnSelected">
                        Okay
                    </button>
                    <button 
                        class="btn btn-cancel"
                        @click="isShowSelectColumnModal = false">
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
        <Modal 
            id="filter-display-modal"
            v-model="isShowFilterDisplayModal"
            :closeVisible="false"
            :persistent="true">
            <div class="modal-header">
                <div class="title">Select the fields to display</div>
                <img 
                    class="icon-close" 
                    src="@/assets/icon/icon-close.svg" 
                    alt="icon-close"
                    @click="isShowFilterDisplayModal = false">
            </div>
            <div class="modal-body">
                <div class="title">Column Info</div>
                <div class="column-list">
                    <div 
                        v-for="(header, index) in headerFiltered"
                        :key="index" 
                        class="item cursor-move"
                        draggable="true"
                        @dragstart="startDrag($event, header)"
                        @drop="startDrop($event, header)"
                        @dragenter.prevent
                        @dragover.prevent>
                        <div class="detail">
                            <img src="@/assets/icon/icon-move.svg" alt="icon-move">
                            <div class="colomn-name">{{ header.text }}</div>
                        </div>
                        <div class="action-remove cursor-pointer" @click="handleRemoveHeaderFilter(index)">
                            <img src="@/assets/icon/icon-close.svg" alt="icon-close">
                        </div>
                    </div>
                    <button 
                        :class="['btn', 'add-item', { 'btn-disabled': !columnCanSelectToDisplay.length }]" 
                        :disabled="!columnCanSelectToDisplay.length"
                        @click="isShowSelectColumnModal = true">
                        <img src="@/assets/icon/icon-plus.svg" alt="icon-plus">
                        <div class="title">Add Field</div>
                    </button>
                </div>
                <div class="action">
                    <button 
                        class="btn btn-save" 
                        @click="handleSaveFilter">
                        Save
                    </button>
                    <button 
                        class="btn btn-cancel"
                        @click="handleCancelFilter">
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
        <HeaderLayout>
            <template #custom-action>
                <button class="btn btn-action">
                    <img class="icon-plus" src="@/assets/icon/icon-plus.svg" alt="icon-plus">
                    Add Contact Person
                </button>
                <button class="btn btn-action">Imported</button>
                <div class="setting-action">
                    <img src="@/assets/icon/icon-setting-dark.svg" alt="icon-setting">
                </div>
            </template>
        </HeaderLayout>
        <Header 
            @selectToDisplay="isShowFilterDisplayModal = true"
            @resetFilter="resetFilter" />
        <div class="table-section">
            <Table 
                :headers="headers"
                :items="items">
                <template #body-name="{ data }">
                    <img class="icon-avatar" src="@/assets/icon/icon-avatar-2.svg" alt="">
                    {{ data.name }}
                </template>
                <template #body-action="{ index }">
                    <Dropdown :id="`action-${index}`" autoClose>
                        <button class="btn btn-more">
                            <img src="@/assets/icon/icon-more.svg" alt="">
                        </button>
                        <template #dropdown-content>
                            <ul class="action-list">
                                <li class="item">
                                    <img src="@/assets/icon/icon-edit.svg" :alt="`icon-edit-${index}`">
                                    Edit
                                </li>
                                <li class="item">
                                    <img src="@/assets/icon/icon-remove.svg" :alt="`icon-remove-${index}`">
                                    Delete
                                </li>
                            </ul>
                        </template>
                    </Dropdown>
                </template>
            </Table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import Table from '@/components/utils/Table.vue'
import Header from '@/components/contact-person/Header.vue'
import Dropdown from '@/components/utils/Dropdown.vue'
import Modal from '@/components/utils/Modal.vue'
import data from  '@/mocks/contact.json'

interface HeaderI {
    text: string;
    key: string;
}

export default defineComponent({
    name: 'Contact',
    components: {
        Table,
        Header,
        Dropdown,
        Modal
    },
    setup() {
        const staticHeaders = [
            { text: 'ผู้ติดต่อ', key: 'name' },
            { text: 'เบอร์โทรศัพท์มือถือ', key: 'phoneNumber' },
            { text: 'บริษัท', key: 'company' },
            { text: 'ติดต่อล่าสุด', key: 'contactLatest' },
            { text: 'อื่น ๆ', key: 'action' },
        ] as HeaderI[]

        const isShowFilterDisplayModal = ref<boolean>(false)
        const isShowSelectColumnModal = ref<boolean>(false)
        const headerForCompareFilter = ref<HeaderI[]>(JSON.parse(JSON.stringify(staticHeaders)))
        const headerFiltered = ref<HeaderI[]>(JSON.parse(JSON.stringify(staticHeaders)))
        const headers = ref<HeaderI[]>(JSON.parse(JSON.stringify(staticHeaders)))
        const columnSelected = ref<HeaderI[]>([])
        const items = reactive(data.contactList)

        const columnCanSelectToDisplay = computed(() => {
            return staticHeaders.filter(header => !JSON.stringify(headerFiltered.value).includes(JSON.stringify(header)))
        })
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const startDrag = (event: any, item: HeaderI) => {
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('itemKey', item.key)
        }

        const startDrop = (event: any, item: HeaderI) => {
            const itemKey = event.dataTransfer.getData('itemKey')
            const dragIndex = headerForCompareFilter.value.findIndex(header => header.key === itemKey)
            const dropIndex = headerForCompareFilter.value.findIndex(header => header.key === item.key)

            headerFiltered.value[dropIndex].text = headerForCompareFilter.value[dragIndex].text
            headerFiltered.value[dropIndex].key = headerForCompareFilter.value[dragIndex].key

            headerFiltered.value[dragIndex].text = headerForCompareFilter.value[dropIndex].text
            headerFiltered.value[dragIndex].key = headerForCompareFilter.value[dropIndex].key

            headerForCompareFilter.value = JSON.parse(JSON.stringify(headerFiltered.value))
        }

        const handleSaveFilter = () => {
            headers.value = JSON.parse(JSON.stringify(headerFiltered.value))
            isShowFilterDisplayModal.value = false
        }

        const handleCancelFilter = () => {
            headerFiltered.value = JSON.parse(JSON.stringify(headers.value))
            isShowFilterDisplayModal.value = false
        }

        const handleRemoveHeaderFilter = (index: number) => {
            headerFiltered.value.splice(index, 1)
            headerForCompareFilter.value = JSON.parse(JSON.stringify(headerFiltered.value))
        }

        const resetFilter = () => {
            headers.value = JSON.parse(JSON.stringify(staticHeaders))
            headerFiltered.value = JSON.parse(JSON.stringify(staticHeaders))
            headerForCompareFilter.value = JSON.parse(JSON.stringify(staticHeaders))
        }

        const toggleSelectColumn = (item: HeaderI) => {
            const columnIndex = columnSelected.value.findIndex(column => column.key === item.key)
            if(columnIndex > -1) {
                columnSelected.value.splice(columnIndex, 1)
            } else {
                columnSelected.value.push(item)
            }
        }

        const findSelectedColumn = (item: HeaderI): boolean => {
            if(!columnSelected.value.length) return false

            return columnSelected.value.find(column => column.key === item.key)?.key === item.key
        }

        const handleSaveColumnSelected = () => {
            if(columnSelected.value.length) {
                headerFiltered.value = headerFiltered.value.concat(columnSelected.value)
                headerForCompareFilter.value = JSON.parse(JSON.stringify(headerFiltered.value))
            }
            columnSelected.value = []
            isShowSelectColumnModal.value = false
        }

        return {
            isShowFilterDisplayModal,
            isShowSelectColumnModal,
            headers,
            headerFiltered,
            columnSelected,
            items,
            startDrag,
            startDrop,
            handleSaveFilter,
            handleCancelFilter,
            handleRemoveHeaderFilter,
            columnCanSelectToDisplay,
            toggleSelectColumn,
            findSelectedColumn,
            handleSaveColumnSelected,
            resetFilter
        }
    },
})
</script>

<style lang="scss" scoped>
    /* Utils */
    .cursor-move {
        cursor: move;
                }
    .cursor-pointer {
        cursor: pointer;
    }

    :deep(.fg-modal) {
        &#select-column-modal {
            z-index: 103;
        }
        padding: 15px;
        .fg-modal-content {
            padding: 0;
            @media(max-width: 992px) {
                width: 100%;
            }
        }
    }
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ffffff;
        border: unset;
        .title {
            font-weight: bold;
        }
        .icon-close {
            cursor: pointer;
        }
    }
    .modal-body {
        padding: 30px 60px;
        background: #F8F8F9;
        .title {
            font-weight: bold;
        }
        .column-list {
            .item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #ffffff;
                border-radius: 4px;
                border: 1px solid #D1D2D5;
                padding: 8px 15px;
                margin-bottom: 8px;
                &.selected {
                    background: #F8F8F9;
                }
                .detail {
                    display: flex;
                    align-items: center;
                    .colomn-name {
                        margin-left: 8px;
                    }
                }
            }
            .add-item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 8px 17px;
                border-radius: 4px;
                border: 1px dashed #454957;
                cursor: pointer;
                .title {
                    color: #454957;
                }
            }
        }
        .action {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 15px;
            .btn {
                width: 100px;
            }
            .btn-save {
                color: #ffffff;
                background: #123CC6;
                margin-right: 15px;
            }
            .btn-cancel {
                background: #ffffff;
                border: 1px solid #D1D2D5;
            }
        }
    }
    .contact {
        .btn-action {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #B9BBC0;
            margin-right: 8px;
            max-height: 30px;
            >.icon-plus {
                margin-right: 8px;
            }
        }
        .setting-action {
            display: flex;
            align-items: center;
            justify-content: center;
            max-height: 30px;
            padding: 6px;
            border-radius: 4px;
            background: #F8F8F9;
            cursor: pointer;
        }
        .icon-avatar {
            margin-right: 5px;
        }
        .table-section {
            padding: 15px;
        }
    }
    .action-list {
		list-style-type: none;
		padding-left: 0;
		margin: 0;
		background: #ffffff;
		border-radius: 4px;
		.item {
			cursor: pointer;
			padding: 10px;
			&:hover {
				background: #eeeeee;
				border-radius: 4px;
			}
		}
	}
    .btn-more {
        padding: 8px;
        background: #454957;
    }
</style>