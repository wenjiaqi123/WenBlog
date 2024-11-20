<template>
  <Layout>
    <template #doc-footer-before> </template>
    <template #doc-after>
      <div style="margin-top: 24px">
        <!--
          这些值都是在 https://giscus.app/zh-CN 启用 giscus 里的 script 里生成的值,对应粘贴过来
          repo="github上 账号/仓库名"
          repo-id="生成的 repo-id"
          category="选择的 Discussions 类别"
          category-id="生成的 category-id"
        -->
        <Giscus
            :key="page.filePath"
            repo="wenjiaqi123/WenBlog"
            repo-id="R_kgDONRbB_A"
            category-id="DIC_kwDONRbB_M4CkZFr"
            mapping="pathname"
            strict="0"
            reactions-enabled="1"
            emit-metadata="1"
            input-position="top"
            lang="zh-CN"
            crossorigin="anonymous"
            :theme="isDark ? 'dark' : 'light'"
            loading="eager"
        />
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import { inBrowser, useData } from "vitepress";

const { isDark, page } = useData();

const { Layout } = DefaultTheme;

watch(isDark, (dark) => {
  if (!inBrowser) return;

  const iframe = document
      .querySelector("giscus-widget")
      ?.shadowRoot?.querySelector("iframe");

  iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
      "https://giscus.app"
  );
});
</script>