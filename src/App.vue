<script setup lang="ts">
import Heading from "@/components/Heading.vue";
import Quote from "@/components/Quote.vue";
import ParagraphBlock from "@/components/ParagraphBlock.vue";
import Section from "@/components/Section.vue";
import ServiceList from "./components/ServiceList.vue";
import type { Service } from "./types/Service";
import { getServiceMetrics } from "@/http/getServiceMetrics";
import { onMounted, ref } from "vue";

const loading = ref(true);
const services = ref<Service[]>([]);

onMounted(async () => {
  services.value = await getServiceMetrics();
  loading.value = false;
});
</script>

<template>
  <Section>
    <Heading />

    <Quote>
      <template #quote>Censorship ends in logical completeness when nobody is allowed to read any books except the books
        that nobody reads.</template>
      <template #author>George Bernard Shaw</template>
    </Quote>

    <ParagraphBlock>
      <template #title>What is Null Foundation?</template>
      <template #body>The Null Foundation is a non-profit organization committed to ensuring free and open access to the
        internet. We strive to uphold the fundamental human right to information, particularly in regions where
        censorship restricts
        access to knowledge and communication.</template>
    </ParagraphBlock>
  </Section>

  <Section>
    <ParagraphBlock>
      <template #title>What are your services?</template>
      <template #body>We fund and manage a variety of <a href="https://torproject.org" target="_blank">Tor</a> network
        relays, listed below.</template>
    </ParagraphBlock>

    <ServiceList :services="services" :loading="loading" />
  </Section>

  <Section>
    <ParagraphBlock>
      <template #title>How can I get in touch?</template>
      <template #body>For inquiries about our network or making a donation to the Null Foundation, please contact us
        at <a href="mailto:info@null-f.org">info[at]null-f.org</a>. Our team will respond promptly during Pacific
        Standard Time (PST) business hours.</template>
    </ParagraphBlock>
  </Section>

  <Section>
    <ParagraphBlock>
      <template #title>How can I report abuse?</template>
      <template #default>
        <p>Null Foundation does not collect or store any network data.
          We do not maintain accounts or track the identities of Tor network users, it cannot link communications to
          specific individuals.
        </p>

        <p>
          We do not provide email hosting services. If you have a complaint about spam, please contact the email server
          operator listed in the message header. They can address the issue in accordance with their own rules and
          applicable laws.
        </p>

        <p>
          Under the Digital Millennium Copyright Act (DMCA),
          ISPs are protected from liability for user activities through four safe harbors, as outlined in 17 U.S.C. 512.
        </p>

        <p>
          If you've understood the above and would still like to reach out regarding an abusive user on our network,
          please
          contact us at <a href="mailto:abuse@null-f.org">abuse[at]null-f.org</a> for immediate response.
        </p>
      </template>
    </ParagraphBlock>
  </Section>
</template>
