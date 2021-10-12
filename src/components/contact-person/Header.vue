<template>
    <div class="header">
        <div class="title">
            Filter Data: Customer 2021
        </div>
        <div class="actions">
            <div class="action-pin">
                <img src="@/assets/icon/icon-pin.svg" alt="icon-pin">
            </div>
            <Dropdown id="action" autoClose>
                <div class="custom-btn">
                    <div class="wrapper-background ">
                        <img class="icon-edit" src="@/assets/icon/icon-edit-2.svg" alt="">
                    </div>
                    <div class="wrapper-background bg-white">
                        <img class="icon-chevron" src="@/assets/icon/icon-chevron.svg" alt="">
                    </div>
                </div>
                <template #dropdown-content>
                    <ul class="action-list">
                        <li class="item" @click="$emit('selectToDisplay')">
                            <img src="@/assets/icon/icon-display.svg" alt="icon-edit">
                            Select to display
                        </li>
                        <li class="item">
                            <img src="@/assets/icon/icon-filter.svg" alt="icon-remove">
                            Filter
                        </li>
                        <li class="item" @click="$emit('resetFilter')">
                            <img src="@/assets/icon/icon-remove.svg" alt="icon-remove">
                            Delete this Filter
                        </li>
                    </ul>
                </template>
            </Dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Dropdown from '@/components/utils/Dropdown.vue'

export default defineComponent({
    name: 'Header',
    components: {
        Dropdown
    }
})
</script>


<style lang="scss" scoped>
    :deep(.custom-dropdown) {
        .show {
            .custom-btn {
                .icon-chevron {
                    transition: transform .25s ease-in-out !important;
                    transform: rotateX(0) !important;
                }
            }
        }
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #F8F8F9;
        padding: 8px 15px;
        >.actions {
            display: flex;
            align-items: center;
            .action-pin {
                border-radius: 4px;
                padding: 6px;
                background: #E8E8EA;
                margin-right: 8px;
                cursor: pointer;
            }
            .custom-btn {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #ffffff;
                border: 1px solid #D1D2D5;
                border-radius: 4px;
                cursor: pointer;
                .wrapper-background {
                    display: flex;
                    justify-content: center;
                    border-radius: 4px;
                    background: #F8F8F9;
                    padding: 6px;
                    width: 50%;
                    >.icon-chevron {
                        transition: transform .25s ease-in-out;
                        transform: rotateX(180deg);
                    }
                }
            }
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
            >.icon {
                vertical-align: middle;
            }
            &:nth-child(2) {
                border-bottom: 1px solid #E8E8EA;
            }
			&:hover {
				background: #eeeeee;
				border-radius: 4px;
			}
		}
	}
</style>