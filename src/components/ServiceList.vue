<template>
    <ul>
        <ServiceListLoader v-if="loading" />
        <ServiceListItem v-else v-for="service in services" :key="service.hostname" :service="service" />
        <ServiceListMultiRelayMessage v-if="services?.filter(service => service.isMultiInstance).length" />
    </ul>
</template>

<script setup lang="ts">
import type { Service } from '@/types/Service';
import ServiceListLoader from './ServiceListLoader.vue';
import ServiceListItem from './ServiceListItem.vue';
import ServiceListMultiRelayMessage from './ServiceListMultiRelayMessage.vue';

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