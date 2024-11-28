<template>
    <div class="service-list-total-bandwidth-message">
        <div class="labels">
            <div class="label">Total traffic</div>
            <div class="label">Goal</div>
        </div>

        <div class="labels">
            <div class="value">{{ totalBandwidth }} MiB/s</div>
            <div class="value">100 MiB/s</div>
        </div>

        <div class="bar-outer">
            <div class="bar" :style="{ width: percentage }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Service } from '@/types/Service';

const props = defineProps<{
    services: Service[];
}>();

const totalBandwidth = computed(() => {
    return props.services.reduce((total, service) => total + service.bandwidth, 0);
});

const percentage = computed(() => {
    return `${Math.round((totalBandwidth.value / 100) * 100)}%`;
});
</script>

<style scoped>
.service-list-total-bandwidth-message {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: var(--spacing-lg);
    font-size: 0.77rem;
}

.labels {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.value {
    margin-bottom: 8px;
}

.bar-outer {
    position: absolute;
    bottom: -10px;
    left: 0;
    height: 10px;
    width: 100%;
    background: var(--extra-extra-muted-color);
    border-radius: var(--spacing-sm);
    z-index: -1;
}

.bar {
    height: 100%;
    background: var(--secondary-color);
    border-radius: var(--spacing-sm);
}
</style>