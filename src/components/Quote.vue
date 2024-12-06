<template>
    <div class="quote">
        <q>
            <slot name="quote" />
        </q>
        <p>—
            <slot name="author" />
        </p>
    </div>
</template>

<style scoped>
.quote {
    margin: var(--spacing-xl) 0;
}

q {
    font-family: "Frank Ruhl Libre", serif;
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4;
    max-width: 75%;
    text-wrap: pretty;
}

p {
    color: var(--muted-color);
    font-size: 1rem;
    font-weight: 500;
}
</style>