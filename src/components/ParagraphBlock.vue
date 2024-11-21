<template>
    <h4>
        <slot name="title" />
    </h4>

    <p v-if="slots.body">
        <slot name="body" />
    </p>

    <slot />
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>