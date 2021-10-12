<template>
	<transition name="fgmodal">
		<div
            :id="id"
			v-if="modelValue"
			class="fg-modal"
			@click="onCloseModalWindowClick"
		>
			<div :class="`fg-modal-content width-${width}`">
				<slot 
					name="modal-close" 
					v-if="closeVisible">
					<span
						class="close"
						@click="$emit('update:modelValue', false)">&times;
					</span>
				</slot>
				<slot />
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Modal',
	props:{
        id: {
            type: String,
            default: ''
        },
		modelValue:{
			type: Boolean,
			default: false
		},
		closeVisible: {
			type: Boolean,
			default: true
		},
		width:{
			type: String,
			default: '50'
		},
		persistent:{
			type: Boolean,
			dafault: false
		},
		testid: String
	},
	emits: ['update:modelValue'],
	setup(props, context){
		const onCloseModalWindowClick = (event: { target: { className: string } }) => {
			const isClose: boolean = event.target.className === 'fg-modal' && !props.persistent
			if (isClose) {
				context.emit('update:modelValue', false)
			}
		}
		return {
			onCloseModalWindowClick
		}
	}
})
</script>

<style lang="scss" scoped>
.fgmodal-leave-active {
  transition: opacity .3s;
}
.fgmodal-leave-to {
  opacity: 0;
}

.fg-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed; 
    z-index: 102;
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
    animation: show-slow .3s ease-in;
    .fg-modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border-radius: 8px;
        position: relative;
        .fg-modal-header {
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
            h1,h2,h3,h4,h5,h6 {
                margin-bottom: 0;
            }
        }
        .fg-modal-body{
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
        }
        .fg-modal-footer{
            align-items: center;
            justify-content: space-between;
            padding: 10px 10px 0px 10px;
        }
    }

    .width-30 {
        width: 30%;
    }
    .width-40 {
        width: 40%;
    }
    .width-50 {
        width: 50%;
    }
    .width-80 {
        width: 80%;
    }
    .width-100 {
        width: 100%;
    }
    
    .close {
        position: absolute;
        color: #aaaaaa;
        float: right;
        font-size: 32px;
        font-weight: 500;
        right: 17px;
        top: 5px;
        // Fix Increase click area
        padding: 0.4em 0.5em 0.5em 0.5em;
        margin: -0.4em -0.5em -0.5em -0.5em;
        z-index: 3;
    }
    
    .close:hover,
    .close:focus {
        color: #aaaaaa;
        text-decoration: none;
        cursor: pointer;
    }
    }
    @keyframes show-slow { 
        0% {
        opacity: 0;
        }
    
        100% {
        opacity: 1;
        }
    }
</style>