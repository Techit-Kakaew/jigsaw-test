<template>
    <nav class="navbar">
        <div class="brand">
            <img class="logo" src="@/assets/jigsaw-logo.svg" alt="logo">
            <div class="name">
                <div class="title">Company's name</div>
                <div class="sub-title">Slogan of the company</div>
            </div>
        </div>
        <div class="nav-item">
            <div class="nav-list">
                <div class="custom-input">
                    <img class="icon" src="@/assets/icon/icon-search.svg" alt="icon-search" />
                    <input 
                        class="search-input"
                        placeholder="Search" />
                </div>
            </div>
            <div class="nav-list">
                <div class="vertical-seperator" />
            </div>
            <div class="nav-list">
                <img class="icon" src="@/assets/icon/icon-chat.svg" alt="icon-1" />
            </div>
            <div class="nav-list">
                <img class="icon" src="@/assets/icon/icon-bell.svg" alt="icon-2" />
            </div>
            <div class="nav-list">
                <img class="icon" src="@/assets/icon/icon-info.svg" alt="icon-3" />
            </div>
            <div class="nav-list">
                <img class="icon" src="@/assets/icon/icon-menu.svg" alt="icon-4" />
            </div>
            <div class="nav-list">
                <img class="icon" src="@/assets/icon/icon-avatar-1.svg" alt="icon-5" />
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Navbar',
    setup() {
        //
    },
})
</script>


<style lang="scss" scoped>
    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 75px;
        padding: 15px;
        background: #ffffff;
        box-shadow: 0px 2px 12px rgba(23, 28, 45, 0.1);
        position: sticky;
        top: 0;
        z-index: 1;
        >.brand {
            display: flex;
            align-items: center;
            >.logo {
                width: 50px;
                height: 50px;
                object-fit: cover;
                margin-right: 8px;
            }
            >.name {
                >.title {
                    text-align: left;
                }
                >.sub-title {
                    font-size: 14px;
                    color: #747988;
                    text-align: left;
                }
            }
        }
        >.nav-item {
            display: flex;
            align-items: center;
            >.nav-list {
                >.custom-input {
                    position: relative;
                    >.icon {
                        position: absolute;
                        top: 50%;
                        left: 10px;
                        transform: translateY(-50%);
                    }
                    >.search-input {
                        width: 100%;
                        height: 40px;
                        padding: 0 15px 0 35px;
                        border: 1px solid #ebebeb;
                        border-radius: 100px;
                        &:focus {
                            outline: none;
                        }
                    }
                }
                >.vertical-seperator {
                    width: 1px;
                    height: 50px;
                    background: #ebebeb;
                    margin-left: 20px;
                }
                >.icon {
                    width: 35px;
                    height: 35px;
                    margin-left: 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>