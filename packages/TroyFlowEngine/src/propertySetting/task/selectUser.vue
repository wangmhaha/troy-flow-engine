<template>
  <div class="select-user-container">
    <el-input
      v-model="selectedUserNames"
      placeholder="请选择用户"
      readonly
      class="input-with-button"
    >
      <template #append>
        <el-button @click="handleOpenDialog">
          <el-icon :size="16" class="el-icon--left">
            <User />
          </el-icon>
        </el-button>
      </template>
    </el-input>

    <el-dialog v-model="dialogVisible" title="选择用户" width="1000px">
      <div class="dialog-content">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-card>
              <template #header>
                <div class="department-tree-header">
                  <span>选择部门</span>
                </div>
              </template>
              <el-tree
                ref="treeRef"
                :data="departmentList"
                :props="defaultProps"
                @node-click="handleNodeClick"
                node-key="id"
              />
            </el-card>
          </el-col>
          <el-col :span="18">
            <el-card>
              <template #header>
                <div class="user-list-header">
                  <span>选择用户</span>
                </div>
              </template>
              <el-table
                :data="userList"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55" />
                <el-table-column prop="realName" label="姓名" />
                <el-table-column prop="dept.deptName" label="部门" />
              </el-table>
              <div class="pagination-container">
                <el-pagination
                  v-show="total > 0"
                  :total="total"
                  background
                  layout="prev, pager, next"
                  v-model:current-page="queryParams.pageNum"
                  v-model:page-size="queryParams.pageSize"
                  @change="handleCurrentChange"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { User } from "@element-plus/icons-vue";

const props = defineProps({
  value: {
    type: [String, Array],
    default: "",
  },
  approverText: {
    type: String,
    default: "",
  },
  getDeptTree: {
    type: Function,
    required: true,
  },
  getUserList: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["update:value", "update:approverText"]);
// 用户列表数据
const userList = ref([]);
// 选中的用户数据
const selectedUsers = ref([]);
const selectedUserNames = ref("");

watch(
  () => props.approverText,
  (newValue) => {
    selectedUserNames.value = newValue || "";
  },
  {
    immediate: true,
  }
);
// 弹窗显示控制
const dialogVisible = ref(false);

// 部门树数据
const departmentList = ref([]);
const defaultProps = {
  children: "children",
  label: "label",
};

// 分页相关数据
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(0);

// 打开弹窗
const handleOpenDialog = async () => {
  dialogVisible.value = true;
  // 获取部门树数据
  await loadDepartmentList();
};

// 加载部门树数据
const loadDepartmentList = async () => {
  try {
    departmentList.value = await props.getDeptTree();
  } catch (error) {
    console.error("获取部门树数据失败：", error);
  }
};

// 点击部门树节点
const handleNodeClick = async (data, query) => {
  try {
    const result = await props.getUserList(
      data.id,
      !query ? { pageNum: 1, pageSize: 10 } : query
    );
    total.value = result.total;
    userList.value = result.rows;
  } catch (error) {
    console.error("获取用户列表失败：", error);
  }
};

// 表格选择变化
const handleSelectionChange = (selection) => {
  selectedUsers.value = selection;
  selectedUserNames.value = selection.map((user) => user.realName).join(", ");
};

// 页码改变
const handleCurrentChange = async (page) => {
  queryParams.value.pageNum = page;
  if (treeRef.value) {
    const currentNode = treeRef.value.getCurrentNode();
    if (currentNode) {
      await handleNodeClick(currentNode, queryParams.value);
    }
  }
};

// 确认选择
const handleConfirm = () => {
  dialogVisible.value = false;
  emit(
    "update:value",
    selectedUsers.value.map((user) => user.userId).join(",")
  );
  emit("update:approverText", selectedUserNames.value);
};
</script>

<style scoped>
.select-user-container {
  width: 100%;
}

.input-with-button {
  width: 100%;
}

.dialog-content {
  display: flex;
  width: 100%;
}

.el-row {
  width: 100%;
  height: 100%;
}

.el-col {
  height: 100%;
}

.el-card {
  height: auto;
  min-height: 400px;
}

:deep(.el-card__body) {
  height: auto;
  padding: 0;
  overflow: visible;
}

.department-tree-header {
  padding: 0 10px;
}

:deep(.el-tree) {
  padding: 10px;
}

.user-list {
  height: 100%;
}

:deep(.el-table) {
  min-height: 300px;
}

.pagination-container {
  padding: 15px 0;
  display: flex;
  justify-content: center;
}

.dialog-footer {
  padding: 20px 0 0;
}
</style>
