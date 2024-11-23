<script setup lang="ts">
import Heading from "@/components/Heading.vue";
import HeadingAppearanceToggle from "@/components/HeadingAppearanceToggle.vue";
import Quote from "@/components/Quote.vue";
import ParagraphBlock from "@/components/ParagraphBlock.vue";
import Section from "@/components/Section.vue";
import ServiceList from "./components/ServiceList.vue";
import { useServiceList } from "@/util/useServiceList";
import { useAppearanceMode } from "@/util/useAppearanceMode";

const { toggleAppearanceMode, appearanceMode } = useAppearanceMode();

const { loading, services } = useServiceList();
</script>

<template>
  <HeadingAppearanceToggle :appearance-mode @toggle-appearance="toggleAppearanceMode" />

  <Section>
    <Heading :appearance-mode @toggle-appearance="toggleAppearanceMode" />

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

    <ParagraphBlock>
      <template #title>How much does all this cost?</template>
      <template #body>
        Currently, we pay approximately $400 USD per year to our upstream service providers. If you'd like to donate to
        the Null Foundation, please contact us at <a href="mailto:donate@null-f.org">donate[at]null-f.org</a> for more
        information.
        However, we recommend you donate directly to the Tor Project instead.
      </template>
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
          For any other inquiries, please contact our abuse helpdesk at <a
            href="mailto:abuse@null-f.org">abuse[at]null-f.org</a>. We will respond promptly during Pacific Standard
          Time (PST) business hours.
        </p>
      </template>
    </ParagraphBlock>
  </Section>
</template>
