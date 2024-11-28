<template>
    <div class="table">
        <div v-for="service in services" :key="service.hostname" class="row">
            <div class="cell" data-title="Hostname">
                <a :href="service.metricsUrl" target="_blank">
                    {{ service.hostname }}
                </a>
            </div>

            <div class="cell" data-title="AS Name">
                {{ service.asName }}
                <img class="flag" :src="`https://flagsapi.com/${service.countryCode}/flat/64.png`" draggable="false" />
            </div>

            <div class="cell" data-title="Bandwidth">
                <template v-if="!service.offline">
                    {{ service.bandwidth }} MiB/s
                </template>

                <template v-else>
                    <div class="offline">offline</div>
                </template>
            </div>

            <div class="cell monospace" data-title="IPv4">
                {{ service.ipv4 }}
            </div>

            <div class="cell monospace" data-title="IPv6">
                {{ service.ipv6 || "no IPv6 connectivity" }}
            </div>
        </div>
    </div>

    <Section>
        <ServiceListLoader v-if="loading" />
        <ServiceListTotalBandwidthMessage v-else-if="services?.length" :services="services" />
    </Section>
</template>

<script setup lang="ts">
import type { Service } from '@/types/Service';
import Section from "@/components/Section.vue";
import ServiceListLoader from '@/components/ServiceListLoader.vue';
import ServiceListTotalBandwidthMessage from '@/components/ServiceListTotalBandwidthMessage.vue';

defineProps<{
    services: Service[];
    loading: boolean
}>();
</script>

<style scoped>
.flag {
    width: 10px;
    height: 10px;
    margin-bottom: -2px;
    margin-left: 4px;
}

.offline {
    color: var(--warning-color);
}

.table {
    width: 100%;
    max-width: 800px;
    display: table;
    margin: 0 auto;
    font-size: 0.7rem;
    margin-top: 40px;
    margin-bottom: 40px;
    font-weight: 400;
}

.monospace {
    font-family: monospace;
}

@media screen and (max-width: 800px) {
    .table {
        display: block;
    }
}

.row {
    display: table-row;
    background: var(--background-color);
}

.row:nth-of-type(odd) {
    background: rgba(155, 155, 155, 0.1);
}

@media screen and (max-width: 800px) {
    .row {
        padding: 14px 0 7px;
        display: block;
    }

    .row:nth-of-type(odd) {
        background: none
    }

    .row.header {
        padding: 0;
        height: 6px;
    }

    .row.header .cell {
        display: none;
    }

    .row .cell:before {
        margin-bottom: 3px;
        content: attr(data-title);
        min-width: 98px;
        font-size: 10px;
        line-height: 10px;
        font-weight: bold;
        text-transform: uppercase;
        color: var(--muted-color);
        display: block;
    }
}

.cell {
    padding: 6px 12px;
    display: table-cell;
}

@media screen and (max-width: 800px) {
    .cell {
        display: block;
    }
}
</style>