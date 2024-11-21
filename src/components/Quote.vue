<template>
    <div class="quote">
        <q><slot name="quote" /></q>
        <p>- <slot name="author" /></p>
    </div>
</template>

<style scoped>
.quote {
    margin-top: var(--spacing-base);
}

q {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 1.32rem;
    max-width: 75%;
    text-wrap: pretty;
}

p {
    color: var(--muted-color);
    font-size: 0.85rem;
}
</style>