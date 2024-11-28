import { ref, watch } from "vue";

const localStorageKey = "appearanceMode";

export const useAppearanceMode = () => {
    const appearanceMode = ref(String(localStorage.getItem(localStorageKey) || "dark"));

    const toggleAppearanceMode = () => {
        appearanceMode.value = appearanceMode.value === "dark" ? "light" : "dark";
        localStorage.setItem(localStorageKey, appearanceMode.value);
    };

    watch(
        () => appearanceMode.value,
        () => {
            document.querySelector('html')!.className = appearanceMode.value;
        },
        {
            immediate: true,
        }
    )

    return {
        appearanceMode,
        toggleAppearanceMode,
    };
}
