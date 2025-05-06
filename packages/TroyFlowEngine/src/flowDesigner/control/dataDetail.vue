<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-29 17:08:38
 * @LastEditors: wangmin
 * @LastEditTime: 2025-04-29 17:31:32
-->
<template>
  <div style="height: 60vh; overflow-y: scroll">
    <el-tabs v-model="activeName">
      <el-tab-pane label="json" name="json">
        <vue-json-pretty :data="json" :showLineNumber="true"></vue-json-pretty>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ref, watch } from "vue";

const activeName = ref("json");
const json = ref({});

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

watch(
  () => props.data,
  (newVal) => {
    json.value = newVal;
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style scoped></style>
