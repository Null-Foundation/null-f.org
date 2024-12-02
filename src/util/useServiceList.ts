import type { Service } from "../types/Service";
import { getServiceMetrics } from "@/http/getServiceMetrics";
import { onMounted, ref, watch } from "vue";

export const useServiceList = () => {
    const loading = ref(true);
    const services = ref<Service[]>([]);
    const lastUpdated = ref<string>('');
    const goal = ref(5600);

    onMounted(async () => {
        const serviceMetrics = await getServiceMetrics();

        services.value = serviceMetrics.relays;
        lastUpdated.value = serviceMetrics.lastUpdated;
        loading.value = false;
    });

    return {
        loading,
        services,
        goal,
        lastUpdated,
    };
}
