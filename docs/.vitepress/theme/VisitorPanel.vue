<template>
  <div class="panel">
    <div class="container">
      <section class="grid">
        <span class="text">
          本站总访问量
          <span id="busuanzi_value_site_pv" class="font-bold">{{ sitePv }}</span> 次
        </span>
        <img
            src=""
            alt="heart"
            class="heart-img"
            width="50"
            height="50"
            @click="onLinkUmiHandle"
        />
        <span class="text">
          本站访客数
          <span id="busuanzi_value_site_uv" class="font-bold">{{ siteUv }}</span> 人次
        </span>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { inBrowser } from 'vitepress';
import busuanzi from 'busuanzi.pure.js';

const sitePv = ref('--');
const siteUv = ref('--');

const fetchVisitorCount = () => {
  if (inBrowser) {
    busuanzi.fetch();
    sitePv.value = document.getElementById('busuanzi_value_site_pv')?.innerText || '--';
    siteUv.value = document.getElementById('busuanzi_value_site_uv')?.innerText || '--';
  }
};

onMounted(() => {
  fetchVisitorCount();
});

const onLinkUmiHandle = () => {
  if (inBrowser) {
    window.open(
        'https://us.umami.is/share/Y2BYxCAm7R0DG2Xi/carlosme.fun',
        '_blank'
    );
  }
};
</script>

<style scoped>
.panel {
  margin-top: 12px;
  margin-bottom: 8px;
}

.container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  width: 100%;
  min-height: 32px;
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
}

.heart-img {
  border-radius: 4px;
  cursor: pointer;
}

.grid {
  font-weight: 500;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: 12px;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  display: grid;
}

.text {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>