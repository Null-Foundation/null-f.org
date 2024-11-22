import { ref, watch } from "vue";

const localStorageKey = "appearanceMode";
const enabledTransitionStyle = "0.2s ease-in-out";

export const useAppearanceMode = () => {
    const appearanceMode = ref(String(localStorage.getItem(localStorageKey) || "dark"));

    const toggleAppearanceMode = () => {
        appearanceMode.value = appearanceMode.value === "dark" ? "light" : "dark";
        localStorage.setItem(localStorageKey, appearanceMode.value);
    };

    watch(
        () => appearanceMode.value,
        () => {
            document.body.className = appearanceMode.value;

            if (document.body.style.transition !== enabledTransitionStyle) {
                document.body.style.transition = enabledTransitionStyle;
            }
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
