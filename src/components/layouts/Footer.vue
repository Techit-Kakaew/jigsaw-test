<template>
    <div class="footer">
        <div class="link-list">
            <div class="item">
                <a class="text" href="#">Automation (v1.0.0#10000)</a>
            </div>
            <div class="setperator" />
            <div class="item">
                <a class="text" href="#">About E-Office</a>
            </div>
            <div class="setperator" />
            <div class="item">
                <a class="text" href="#">Manual</a> 
            </div>
            <div class="setperator" />
            <div class="item">
                <a class="text" href="#">Report a problem</a> 
            </div>
        </div>
        <div class="powerby-text">
            Powered by a free JigsawOffice license. Please consider purchasing it today
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Footer',
    setup() {
        //
    },
})
</script>

<style lang="scss" scoped>
    .footer {
        margin-top: 15px;
        padding: 15px;
        border-top: 1px solid #E8E8EA;
        >.link-list {
            display: flex;
            justify-content: center;
            align-items: center;
            >.item {
                >.text {
                    font-size: 14px;
                    color: #454957;
                    text-decoration: none;
                }
            }
            >.setperator {
                height: 15px;
                width: 1px;
                background: #454957;
                margin: 0 15px;
            }
        }
        >.powerby-text {
            text-align: center;
            color: #A2A4AB;
            font-size: 13px;
        }
    }
</style>
