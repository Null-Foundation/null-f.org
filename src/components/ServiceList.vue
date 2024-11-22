<template>
    <ul>
        <ServiceListLoader v-if="loading" />

        <template v-else>
            <ServiceListItem v-for="service in services" :key="service.hostname" :service="service" />
            <ServiceListMultiRelayMessage v-if="services?.filter(service => service.isMultiInstance).length" />
            <ServiceListTotalBandwidthMessage v-if="services?.length" :services="services" />
        </template>
    </ul>
</template>

<script setup lang="ts">
import type { Service } from '@/types/Service';
import ServiceListLoader from './ServiceListLoader.vue';
import ServiceListItem from './ServiceListItem.vue';
import ServiceListMultiRelayMessage from './ServiceListMultiRelayMessage.vue';
import ServiceListTotalBandwidthMessage from './ServiceListTotalBandwidthMessage.vue';

defineProps<{
    services: Service[];
    loading: boolean;
}>();
</script>

<style scoped>
ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding-inline-start: 0px;
}
</style>