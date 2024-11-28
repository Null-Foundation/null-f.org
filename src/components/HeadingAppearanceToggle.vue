<template>
    <div @click="$emit('toggle-appearance')" class="heading-appearance-toggle" title="Toggle appearance mode">
        <svg v-if="appearanceMode === 'dark'" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z">
            </path>
        </svg>

        <svg v-if="appearanceMode === 'light'" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z">
            </path>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    appearanceMode: string;
}>();

defineEmits<{
    (e: "toggle-appearance"): void;
}>();
</script>

<style scoped>
.heading-appearance-toggle {
    width: 16px;
    height: 16px;
    position: fixed;
    top: var(--spacing-base);
    right: var(--spacing-base);
    border: 1px solid transparent;
    padding: var(--spacing-sm);
    display: flex;
    border-radius: var(--spacing-sm);
    transition: border 0.2s ease-in-out;
}

.heading-appearance-toggle:hover {
    cursor: pointer;
    border: 1px solid var(--extra-extra-muted-color);
}

@media (max-width: 730px) {
    .heading-appearance-toggle {
        position: absolute;
    }
}
</style>