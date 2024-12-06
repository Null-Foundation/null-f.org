<template>
    <div class="service-list-loader">
        <svg width="24" height="24">
            <image :xlink:href="spinner" :src="spinner" width="24" height="24" />
        </svg>

        <p>Fetching relay statuses...</p>
    </div>
</template>

<script setup lang="ts">
import spinner from '@/assets/spinner.svg';
</script>

<style scoped>
.service-list-loader {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: var(--spacing-base);
    align-items: center;
    color: var(--muted-color);
    width: 100%;
    margin: calc(2 * var(--spacing-base)) 0;
}

svg {
    width: 24px;
    height: 24px;
    opacity: 0.5;
}
</style>