<template>
    <div class="footer">
        <pre>last updated: {{ lastUpdated || 'unknown' }}</pre>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    lastUpdated: string;
}>();
</script>

<style scoped>
.footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
    height: auto;
    gap: var(--spacing-base);
    margin-bottom: var(--spacing-base);
    pointer-events: none;
    user-select: none;
}

.footer pre {
    font-size: var(--font-size-extra-small);
    font-weight: 600;
    color: var(--muted-color);
}
</style>