<template>
    <div :class="{ featured }">
        <h4>
            <slot name="title" />
        </h4>

        <p v-if="slots.body">
            <slot name="body" />
        </p>

        <slot />
    </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

defineProps<{
    featured?: boolean;
}>();

const slots = useSlots();
</script>

<style scoped>
.featured {
    background: var(--extra-extra-muted-color);
    padding: var(--spacing-sm) var(--spacing-lg);
    margin: var(--spacing-base) 0;
    border-radius: var(--spacing-base);
}
</style>