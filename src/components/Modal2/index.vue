<template>
    <div v-if="isVisible" class="dialog-overlay" @click="closeDialog">
        <div class="dialog-content" @click.stop>
            <BorderBox11 v-if="theme === '1'">
                    <div class="dialog-content-inner">
                        <div class="dialog-header">
                            <span class="dialog-title">{{ title }}</span>
                            <button class="dialog-close-btn" @click="closeDialog">×</button>
                        </div>
                        <div class="dialog-body">
                            <slot></slot> <!-- 这里是弹窗的内容，父组件通过插槽传入 -->
                        </div>
                        <div class="dialog-footer">
                            <button class="dialog-btn" @click="onCancel">取消</button>
                            <button class="dialog-btn" @click="onConfirm">确认</button>
                        </div>
                    </div>
            </BorderBox11>
        </div>

    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import BorderBox11 from '../BorderBox11/index.vue'

// 接收父组件传入的 props
const props = defineProps({
    title: {
        type: String,
        default: '弹窗标题'
    },
    visible: {
        type: Boolean,
        default: false
    },
    theme: {
        type: String,
        default: '1'
    }
})

// 向父组件发送事件
const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

// 控制弹窗显示与隐藏
const isVisible = ref(props.visible)

// 监听 `visible` 的变化
watch(() => props.visible, (newVal) => {
    isVisible.value = newVal
})

// 打开弹窗
const closeDialog = () => {
    // isVisible.value = false
    emit('update:visible', false)  // 通过事件通知父组件关闭弹窗
}

// 确认按钮点击事件
const onConfirm = () => {
    emit('confirm')  // 向父组件发送确认事件
    closeDialog()    // 关闭弹窗
}

// 取消按钮点击事件
const onCancel = () => {
    emit('cancel')  // 向父组件发送取消事件
    closeDialog()   // 关闭弹窗
}
</script>

<style scoped>
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog-content {
    /* background-color: white; */
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: modal-open 0.3s ease-out forwards;
}

@keyframes modal-open {
    0% {
        transform: scale(0.7);
        opacity: 0;
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}


.dialog-content-inner {
    padding: 10px;
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.dialog-title {
    font-size: 18px;
    font-weight: bold;
    color: #f0f0f0;
    padding-left: 10px;
}

.dialog-close-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #f0f0f0;
}

.dialog-body {
    margin-bottom: 20px;
    min-height: 100px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
}

.dialog-btn {
    padding: 8px 16px;
    margin-left: 10px;
    background-color: transparent;
    color: #f0f0f0;
    border: 1px solid #f0f0f09f;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.dialog-btn:hover {
    background-color: #0056b3;
    border: 1px solid #0056b3;
}
</style>