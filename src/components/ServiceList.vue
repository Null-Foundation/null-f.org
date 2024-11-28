<template>
    <div v-if="!loading" class="table">
        <div class="row header">
            <div v-for="title in [
                'Hostname',
                'AS Name',
                'Traffic',
                'IP:Port',
            ]" :key="title" class="cell" :data-title="title">
                {{ title }}
            </div>
        </div>
        <div v-for="service in services" :key="service.hostname" class="row">
            <div class="cell" data-title="Hostname">
                <a :href="service.metricsUrl" target="_blank">
                    {{ service.hostname }}
                </a>
            </div>

            <div class="cell" data-title="AS Name">
                {{ service.asName }}
                <img class="flag" :title="service.countryCode"
                    :src="`https://flagsapi.com/${service.countryCode}/flat/64.png`" draggable="false" />
            </div>

            <div class="cell" data-title="Traffic">
                <template v-if="!service.offline">
                    {{ service.bandwidth }} MiB/s
                </template>

                <template v-else>
                    <div class="offline">offline</div>
                </template>
            </div>

            <div class="cell" data-title="IP:Port">
                <div class="ips monospace">
                    <span>{{ service.ipv4 }}</span>
                    <span> {{ service.ipv6 || "no IPv6 connectivity" }}</span>
                </div>
            </div>
        </div>
    </div>

    <Section>
        <ServiceListLoader v-if="loading" />
        <ServiceListTotalBandwidthMessage v-else-if="services?.length" :services="services" :goal-mi-bs />
    </Section>
</template>

<script setup lang="ts">
import type { Service } from '@/types/Service';
import Section from "@/components/Section.vue";
import ServiceListLoader from '@/components/ServiceListLoader.vue';
import ServiceListTotalBandwidthMessage from '@/components/ServiceListTotalBandwidthMessage.vue';

defineProps<{
    services: Service[];
    loading: boolean;
    goalMiBs: number;
}>();
</script>

<style scoped>
.table {
    width: 100%;
    max-width: 730px;
    display: table;
    margin: 0 auto;
    font-size: var(--font-size-small);
    margin-top: 40px;
    margin-bottom: 40px;
    font-weight: 400;
    overflow: hidden;
    border-radius: var(--spacing-sm);
}

a:link,
a:visited {
    text-decoration: none;
    text-underline-offset: 0;
}

@media screen and (max-width: 730px) {
    .table {
        display: block;
        max-width: 550px;
        margin: 0 auto;
    }
}

.row {
    display: table-row;
    background: var(--background-color);
}

.row:nth-of-type(odd) {
    background: var(--extra-extra-muted-color);
}

@media screen and (max-width: 730px) {
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

.header {
    font-size: var(--font-size-extra-small);
    font-weight: bold;
    text-transform: uppercase;
    color: var(--muted-color);
}

.cell {
    padding: 6px 12px;
    display: table-cell;
}

@media screen and (max-width: 730px) {
    .cell {
        display: block;
    }
}

.flag {
    width: 10px;
    height: 10px;
    margin-bottom: -1px;
    margin-left: 4px;
}

.offline {
    color: var(--warning-color);
}

.ips {
    display: flex;
    flex-direction: column;
    gap: 0rem;
    line-height: 1.7rem;
    font-family: monospace;
}

.ips span {
    user-select: all;
}
</style>