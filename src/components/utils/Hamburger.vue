<template>
    <div class="action" @click="$emit('toggle')">
        <div class="hamburger">
            <div v-for="i in 3" :key="i" class="line" :style="{background: color}" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Hamburger',
    props: {
        color: {
            type: String,
            default: '#dadada'
        }
    }
})
</script>

<style lang="scss" scoped>
    .action {
        cursor: pointer;
        .hamburger {
            >.line {
                width: 25px;
                height: 2px;
                background: #dadada;
                &:nth-child(2) {
                    margin: 5px 0;
                }
            }
        }
    }
</style>