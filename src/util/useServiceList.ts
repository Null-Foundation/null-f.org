import type { Service } from "../types/Service";
import { getServiceMetrics } from "@/http/getServiceMetrics";
import { onMounted, ref, watch } from "vue";

export const useServiceList = () => {
    const loading = ref(true);
    const services = ref<Service[]>([]);

    onMounted(async () => {
        services.value = await getServiceMetrics();
        loading.value = false;
    });

    return {
        loading,
        services,
    };
}
