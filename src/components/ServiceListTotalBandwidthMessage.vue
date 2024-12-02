<template>
    <div class="service-list-total-bandwidth-message">
        <div class="labels legend">
            <div class="label">Total</div>
            <div class="label">Goal</div>
        </div>

        <div class="labels">
            <template v-if="!goalMet">
                <div class="value current">{{ totalBandwidth }} Mbps</div>
                <div class="value">{{ goal }} Mbps</div>
            </template>

            <template v-else>
                <div class="value">We've met our goal!</div>
            </template>
        </div>

        <div class="bar-outer">
            <div ref="innerBarRef" class="bar" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Service } from '@/types/Service';

const props = defineProps<{
    services: Service[];
    goal: number;
}>();

const innerBarRef = ref<Element>();

const isVisible = ref(false);

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting;
    });
});

onMounted(() => {
    intersectionObserver.observe(innerBarRef.value!);
});

const totalBandwidth = computed(() => {
    return Math.min(props.services.reduce((total, service) => total + service.bandwidth, 0), props.goal);
});

const currentBandwidthOpacity = computed(() => {
    if (!isVisible.value) {
        return '0';
    }

    return `1`;
});

const percentage = computed(() => {
    if (!isVisible.value) {
        return '0%';
    }

    return `${Math.round((totalBandwidth.value / props.goal) * 100)}%`;
});

const goalMet = computed(() => {
    return totalBandwidth.value > (props.goal - 200);
});
</script>

<style scoped>
.service-list-total-bandwidth-message {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: var(--spacing-lg);
    font-size: var(--font-size-small);
}

.labels {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.legend {
    opacity: 0.5;
    font-weight: 500;
    text-transform: uppercase;
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
    transition: all 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-property: width;
    transition-delay: 300ms;
    width: v-bind(percentage);
}

.current {
    margin-left: v-bind(percentage);
    transform: translateX(-50%);
    transition: all 800ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-property: margin-left, opacity;
    transition-delay: 300ms;
    opacity: v-bind(currentBandwidthOpacity);
    color: var(--secondary-color);
}
</style>