<template>
    <div class="section">
        <slot />
    </div>
</template>

<style scoped>
.section {
    display: flex;
    flex-direction: column;
    max-width: 550px;
    margin: 0 auto;
}
</style>
