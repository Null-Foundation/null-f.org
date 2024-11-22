<template>
    <p>
        Total traffic: {{ totalBandwidth }} MiB/s
    </p>
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
</script>
