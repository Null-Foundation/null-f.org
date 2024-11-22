<template>
    <div class="heading">
        <img class="logo" :src="logo" alt="Null Foundation Logo" draggable="false" />
        <pre>https://null-f.org</pre>
    </div>

    <HeadingAppearanceToggle :appearance-mode @toggle-appearance="$emit('toggle-appearance')" />
</template>

<script setup lang="ts">
import HeadingAppearanceToggle from "./HeadingAppearanceToggle.vue";
import logo from '@/assets/logo.png';

defineProps<{
    appearanceMode: string;
}>();

defineEmits<{
    (e: "toggle-appearance"): void;
}>();
</script>

<style scoped>
.heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: auto;
    gap: var(--spacing-base);
    margin-bottom: var(--spacing-base);
}

.heading img {
    height: 38px;
    overflow: hidden;
    border-radius: var(--spacing-sm);
    border: 1px solid rgb(41, 39, 39);
}

.heading pre {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--muted-color);
}
</style>