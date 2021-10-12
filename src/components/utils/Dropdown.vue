<template>
	<div
		:class="`custom-dropdown ${dropPosition}`">
		<div
			:class="['dropdown-action', { submenu: isSubmenu }]"
			:id="id"
			data-bs-toggle="dropdown"
			:data-bs-auto-close="autoClose"
			aria-expanded="false"
		>
			<slot />
		</div>
		<div
			class="dropdown-menu"
			:aria-labelledby="id">
			<slot name="dropdown-content" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
	name: 'Dropdown',
	props: {
		id: {
			type: String,
			required: true
		},
		dropPosition: {
			type: String,
			default: 'dropdown',
			validator: (value: string) => ['dropdown', 'dropup', 'dropstart', 'dropend'].includes(value)
		},
		isSubmenu: {
			type: Boolean,
			default: false
		},
		autoClose: {
			type: [Boolean, String],
			default: 'outside'
		}
	},
	setup(props, {emit}){

		const hideDropdownEvent = () => {
			emit('hideDropdownEvent')
		}

		const showDropdownEvent = () => {
			emit('showDropdownEvent')
		}

		onMounted(() => {
			const dropdownAction = document.querySelector(`.dropdown-action#${props.id}`)
			dropdownAction?.addEventListener('hide.bs.dropdown', hideDropdownEvent)
			dropdownAction?.addEventListener('show.bs.dropdown', showDropdownEvent)
		})
	}
})
</script>

<style lang="scss" scoped>
	.custom-dropdown {
		position: relative;
		>.dropdown-action {
			display: inline-block;
			&.submenu {
				display: block;
			}
		}
		>.dropdown-menu {
			padding: 0;
		}
	}
</style>