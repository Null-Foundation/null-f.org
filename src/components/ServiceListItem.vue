<template>
    <li>
        <div>
            <a :href="service.metricsUrl" target="_blank">{{ service.hostname }}</a>
            <cite v-if="service.isMultiInstance">*</cite>
        </div>

        <div class="data-rows">
            <div class="row">
                <span>{{ service.ipv4 }}</span>
            </div>

            <div class="row">
                <span>{{ service.ipv6 || "no IPv6 connectivity" }}</span>
            </div>

            <div class="row">
                <span>{{ service.asName }}</span>
                <img class="flag" :src="`https://flagsapi.com/${service.countryCode}/flat/64.png`" draggable="false" />
            </div>

            <div class="row">
                <span v-if="!service.offline">traffic: {{ service.bandwidth }} MiB/s</span>

                <span v-else class="offline">offline</span>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { Service } from '@/types/Service';

defineProps<{
    service: Service;
}>();
</script>

<style scoped>
li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px dotted var(--extra-muted-color);
    padding: var(--spacing-lg) 0;
    align-items: center;
}

.data-rows {
    display: flex;
    flex-direction: column;
}

.row {
    font-family: monospace;
    font-size: 0.8rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--muted-color);
}

.offline {
    color: var(--warning-color);
}

.flag {
    height: 10px;
}

cite {
    font-size: 0.75em;
    color: var(--muted-color);
}

@media (max-width: 650px) {
    li {
        border-bottom: none;
        padding: 0;
        flex-direction: column;
        align-items: flex-start;
    }

    .data-rows {
        margin-top: var(--spacing-sm);
        justify-content: flex-start;
        align-items: flex-start;
    }
}
</style>