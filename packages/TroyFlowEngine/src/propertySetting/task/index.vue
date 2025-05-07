<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-28 16:49:31
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-07 15:01:53
-->
<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="基础配置" name="basic">
          <el-form-item label="节点名称">
            <el-input v-model="form.displayName" placeholder="请输入节点名称" />
          </el-form-item>
          <slot name="form-item-task-form-key">
            <el-form-item label="节点表单">
              <el-select v-model="form.formKey" placeholder="请选择节点表单">
                <el-option label="表单1" value="form1"></el-option>
                <el-option label="表单2" value="form2"></el-option>
                <el-option label="表单3" value="form3"></el-option>
              </el-select>
            </el-form-item>
          </slot>
          <slot name="form-item-task-approver-type">
            <el-form-item label="审批人方式">
              <el-radio-group v-model="form.approverType">
                <el-radio-button label="指定用户" value="USER" />
                <el-radio-button label="角色" value="ROLE" />
                <el-radio-button label="部门" value="DEPT" />
              </el-radio-group>
            </el-form-item>
          </slot>
          <slot name="form-item-task-approver-value">
            <el-form-item label="选择用户" v-if="form.approverType === 'USER'">
              <SelectUser
                v-model:value="form.approverValue"
                v-model:approverText="form.approverText"
                :getDeptTree="getDeptTree"
                :getUserList="getUserList"
              />
            </el-form-item>
            <el-form-item label="选择角色" v-if="form.approverType === 'ROLE'">
              <el-select
                v-model="form.approverValue"
                placeholder="请选择角色"
                multiple
              >
                <el-option
                  v-for="role in roleList"
                  :key="role.roleId"
                  :label="role.roleName"
                  :value="role.roleId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="选择部门" v-if="form.approverType === 'DEPT'">
              <el-tree-select
                placeholder="请选择部门"
                v-model="form.approverValue"
                :data="deptList"
                :props="{ label: 'label', value: 'id' }"
              />
            </el-form-item>
          </slot>
          <slot name="form-item-task-perform-type">
            <el-form-item label="协作类型">
              <el-radio-group v-model="form.performType">
                <el-radio value="NORMAL">
                  普通
                  <el-tooltip
                    content="普通模式下，任务只需要一个人处理即可"
                    placement="top"
                  >
                    <el-icon class="tooltip-icon"><InfoFilled /></el-icon>
                  </el-tooltip>
                </el-radio>
                <el-radio value="COUNTERSIGN">
                  会签
                  <el-tooltip
                    content="所有办理都需要审批，建议选择用户；如果选择角色或者部门等，需自行通过办理人表达式或者监听器，转成具体办理用户"
                    placement="top"
                  >
                    <el-icon class="tooltip-icon"><InfoFilled /></el-icon>
                  </el-tooltip>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </slot>
          <slot name="form-item-task-expire-time">
            <el-form-item label="期望完成时间">
              <el-input-number
                v-model="form.expireTime"
                placeholder="请输入期望完成时间"
              >
                <template #suffix>
                  <span>分钟</span>
                </template>
              </el-input-number>
            </el-form-item>
          </slot>
          <slot name="form-item-task-reject-node">
            <el-form-item label="驳回节点">
              <el-select
                v-model="form.rejectNodeList"
                placeholder="请选择驳回节点"
                multiple
              >
                <el-option
                  v-for="node in currentNodeData"
                  :key="node.id"
                  :label="node.text.value"
                  :value="node.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </slot>
        </el-tab-pane>
        <el-tab-pane label="监听器" name="listener">
          <slot name="form-item-task-pre-interceptors">
            <el-form-item label="前置拦截器">
              <el-input
                v-model="form.preInterceptors"
                placeholder="请输入前置拦截器"
              />
            </el-form-item>
          </slot>
          <slot name="form-item-task-post-interceptors">
            <el-form-item label="后置拦截器">
              <el-input
                v-model="form.postInterceptors"
                placeholder="请输入后置拦截器"
              />
            </el-form-item>
          </slot>
        </el-tab-pane>
        <el-tab-pane label="按钮配置" name="btn">
          <slot name="form-item-task-buttons">
            <el-form-item label="按钮配置">
              <el-checkbox-group v-model="form.buttons">
                <el-checkbox label="同意" value="agree" />
                <el-checkbox label="驳回" value="reject" />
                <el-checkbox label="转办" value="transfer" />
              </el-checkbox-group>
            </el-form-item>
          </slot>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import SelectUser from "./selectUser.vue";
import { InfoFilled } from "@element-plus/icons-vue";

const roleList = ref([]);
const deptList = ref([]);
const activeName = ref("basic");
const rejectNode = computed(() => {
  return form.rejectNodeList.join(",");
});

const form = reactive({
  // 名称
  displayName: "",
  // 前置拦截器
  preInterceptors: "",
  // 后置拦截器
  postInterceptors: "",
  // 选择表单
  formKey: "",
  // 审批人方式
  approverType: "USER",
  // 审批人
  approverValue: "",
  // 审批人名称：
  approverText: "",
  // 参与类型
  performType: "NORMAL",
  // 期望完成时间
  expireTime: 0,
  // 按钮配置
  buttons: [],
  // 驳回节点
  rejectNodeList: [],
  // 驳回节点
  rejectNode: "",
});
const emit = defineEmits(["change"]);
const props = defineProps({
  value: {
    type: Object,
  },
  getDeptTree: {
    type: Function,
    default: async () => {},
  },
  getUserList: {
    type: Function,
    default: async () => {},
  },
  getRoleList: {
    type: Function,
    default: async () => {},
  },
  currentNodeData: {
    type: Array,
    default: () => [],
  },
});

watch(
  () => props.value,
  (newVal) => {
    if (!newVal) return;
    // 遍历对象的每个属性进行赋值，确保响应式更新
    if (Object.keys(newVal).length > 0) {
      Object.keys(newVal).forEach((key) => {
        if (key in form) {
          form[key] = newVal[key];
          // 单独处理驳回节点的回显赋值
          if (key === "rejectNode" && newVal[key]) {
            form.rejectNodeList = newVal[key].split(",");
          } else {
            form.rejectNodeList = [];
          }
        }
      });
    } else {
      form.displayName = "";
      form.formKey = "";
      form.preInterceptors = "";
      form.postInterceptors = "";
      form.approverType = "USER";
      form.approverValue = "";
      form.approverText = "";
      form.performType = "NORMAL";
      form.expireTime = 0;
      form.buttons = [];
      form.rejectNodeList = [];
      form.rejectNode = "";
    }
  },
  { deep: true, immediate: true }
);

watch(
  () => form.approverType,
  (newVal) => {
    if (newVal === "ROLE") {
      props.getRoleList().then((res) => {
        roleList.value = res;
      });
    }
    if (newVal === "DEPT") {
      props.getDeptTree().then((res) => {
        deptList.value = res;
      });
    }
  }
);

watch(
  () => form,
  (newVal) => {
    emit("change", { ...newVal, rejectNode: rejectNode.value });
  },
  { deep: true }
);

const handleClick = (tab, event) => {
  activeName.value = tab.name;
};
</script>

<style scoped>
.tooltip-icon {
  margin-left: 4px;
  font-size: 16px;
  color: #000 !important;
  cursor: help;
}
</style>
