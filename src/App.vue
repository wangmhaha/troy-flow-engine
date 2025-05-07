<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-27 15:03:16
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-07 17:27:10
 -->
<template>
  <div class="container">
    <TroyFlowEngine
      :getDeptTree="getDeptTree"
      :getUserList="getUserList"
      :getRoleList="getRoleList"
      @on-save="saveFlow"
      :value="data"
      :is-read-only="false"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { TroyFlowEngine } from "../packages";
const data = ref({});

const getUserList = async (deptId, { pageNum, pageSize }) => {
  // 模拟一个请求
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: 5,
        rows: [
          {
            createBy: "admin",
            createTime: "2025-04-17 05:21:33",
            updateBy: null,
            updateTime: null,
            remark: "管理员",
            userId: 1,
            deptId: 103,
            userName: "admin",
            nickName: "若依",
            realName: "若依管理员",
            email: "ry@163.com",
            phonenumber: "15888888888",
            sex: "1",
            avatar: "",
            password: null,
            status: "0",
            delFlag: "0",
            loginIp: "127.0.0.1",
            loginDate: "2025-04-29T15:16:33.000+08:00",
            dept: {
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              deptId: 103,
              parentId: null,
              ancestors: null,
              deptName: "研发部门",
              orderNum: null,
              leader: "若依",
              phone: null,
              email: null,
              status: null,
              delFlag: null,
              parentName: null,
              children: [],
              sysUsers: null,
            },
            roles: [],
            roleIds: null,
            postIds: null,
            roleId: null,
            admin: true,
          },
          {
            createBy: "admin",
            createTime: "2025-04-17 05:21:33",
            updateBy: null,
            updateTime: null,
            remark: "测试员",
            userId: 2,
            deptId: 105,
            userName: "ry",
            nickName: "若依",
            realName: "若依",
            email: "ry@qq.com",
            phonenumber: "15666666666",
            sex: "1",
            avatar: "",
            password: null,
            status: "0",
            delFlag: "0",
            loginIp: "127.0.0.1",
            loginDate: "2025-04-17T05:21:33.000+08:00",
            dept: {
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              deptId: 105,
              parentId: null,
              ancestors: null,
              deptName: "测试部门",
              orderNum: null,
              leader: "若依",
              phone: null,
              email: null,
              status: null,
              delFlag: null,
              parentName: null,
              children: [],
              sysUsers: null,
            },
            roles: [],
            roleIds: null,
            postIds: null,
            roleId: null,
            admin: false,
          },
          {
            createBy: "admin",
            createTime: "2025-04-23 05:27:42",
            updateBy: null,
            updateTime: null,
            remark: null,
            userId: 100,
            deptId: 104,
            userName: "genghua",
            nickName: "耿华",
            realName: "耿华",
            email: "",
            phonenumber: "18780206140",
            sex: "0",
            avatar: "",
            password: null,
            status: "0",
            delFlag: "0",
            loginIp: "127.0.0.1",
            loginDate: "2025-04-29T15:35:52.000+08:00",
            dept: {
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              deptId: 104,
              parentId: null,
              ancestors: null,
              deptName: "市场部门",
              orderNum: null,
              leader: "若依",
              phone: null,
              email: null,
              status: null,
              delFlag: null,
              parentName: null,
              children: [],
              sysUsers: null,
            },
            roles: [],
            roleIds: null,
            postIds: null,
            roleId: null,
            admin: false,
          },
          {
            createBy: "admin",
            createTime: "2025-04-23 05:28:27",
            updateBy: null,
            updateTime: null,
            remark: null,
            userId: 101,
            deptId: 104,
            userName: "wangmin",
            nickName: "王敏",
            realName: "王敏",
            email: "",
            phonenumber: "",
            sex: "0",
            avatar: "",
            password: null,
            status: "0",
            delFlag: "0",
            loginIp: "10.0.23.87",
            loginDate: "2025-04-27T11:55:49.000+08:00",
            dept: {
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              deptId: 104,
              parentId: null,
              ancestors: null,
              deptName: "市场部门",
              orderNum: null,
              leader: "若依",
              phone: null,
              email: null,
              status: null,
              delFlag: null,
              parentName: null,
              children: [],
              sysUsers: null,
            },
            roles: [],
            roleIds: null,
            postIds: null,
            roleId: null,
            admin: false,
          },
          {
            createBy: "admin",
            createTime: "2025-04-29 02:55:17",
            updateBy: null,
            updateTime: null,
            remark: null,
            userId: 102,
            deptId: 101,
            userName: "luoqiang",
            nickName: null,
            realName: "罗强",
            email: "",
            phonenumber: "",
            sex: "0",
            avatar: "",
            password: null,
            status: "0",
            delFlag: "0",
            loginIp: "",
            loginDate: null,
            dept: {
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              deptId: 101,
              parentId: null,
              ancestors: null,
              deptName: "深圳总公司",
              orderNum: null,
              leader: "若依",
              phone: null,
              email: null,
              status: null,
              delFlag: null,
              parentName: null,
              children: [],
              sysUsers: null,
            },
            roles: [],
            roleIds: null,
            postIds: null,
            roleId: null,
            admin: false,
          },
        ],
        code: 200,
        msg: "查询成功",
      });
    }, 1000);
  });
  return data;
};

const getDeptTree = async () => {
  // 模拟一个请求
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 100,
          label: "若依科技",
          disabled: false,
          children: [
            {
              id: 101,
              label: "深圳总公司",
              disabled: false,
              children: [
                {
                  id: 103,
                  label: "研发部门",
                  disabled: false,
                },
                {
                  id: 104,
                  label: "市场部门",
                  disabled: false,
                },
                {
                  id: 105,
                  label: "测试部门",
                  disabled: false,
                },
                {
                  id: 106,
                  label: "财务部门",
                  disabled: false,
                },
                {
                  id: 107,
                  label: "运维部门",
                  disabled: false,
                },
              ],
            },
            {
              id: 102,
              label: "长沙分公司",
              disabled: false,
              children: [
                {
                  id: 108,
                  label: "市场部门",
                  disabled: false,
                },
                {
                  id: 109,
                  label: "财务部门",
                  disabled: false,
                },
              ],
            },
          ],
        },
      ]);
    }, 1000);
  });
  return data;
};

const getRoleList = async () => {
  // 模拟一个请求
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          createBy: null,
          createTime: "2025-04-17 05:21:33",
          updateBy: null,
          updateTime: null,
          remark: "超级管理员",
          roleId: 1,
          roleName: "超级管理员",
          roleKey: "admin",
          roleSort: 1,
          dataScope: "1",
          menuCheckStrictly: true,
          deptCheckStrictly: true,
          status: "0",
          delFlag: "0",
          flag: false,
          menuIds: null,
          deptIds: null,
          permissions: null,
          admin: true,
        },
        {
          createBy: null,
          createTime: "2025-04-17 05:21:33",
          updateBy: null,
          updateTime: null,
          remark: "普通角色",
          roleId: 2,
          roleName: "普通角色",
          roleKey: "common",
          roleSort: 2,
          dataScope: "2",
          menuCheckStrictly: true,
          deptCheckStrictly: true,
          status: "0",
          delFlag: "0",
          flag: false,
          menuIds: null,
          deptIds: null,
          permissions: null,
          admin: false,
        },
      ]);
    }, 1000);
  });
  return data;
};

const saveFlow = (data) => {
  console.log("data", data);
};

onMounted(() => {
  setTimeout(() => {
    data.value = {
      nodes: [
        {
          id: "c7886030-a536-499d-8a18-26b6f721f419",
          type: "node:start",
          x: 171,
          y: 245,
          properties: {
            width: 56,
            height: 56,
          },
          text: {
            x: 171,
            y: 285,
            value: "开始",
          },
        },
        {
          id: "090e0484-6ae5-47ea-9f8c-937d162305a8",
          type: "node:task",
          x: 370,
          y: 253,
          properties: {
            displayName: "审批任务",
            preInterceptors: "",
            postInterceptors: "",
            formKey: "form1",
            approverType: "USER",
            approverValue: "100,101",
            approverText: "耿华, 王敏",
            performType: "NORMAL",
            expireTime: 0,
            buttons: [],
            rejectNode: "",
            width: 120,
            height: 80,
          },
          text: {
            x: 370,
            y: 253,
            value: "审批任务",
          },
        },
        {
          id: "ad608955-c7fc-4592-a88e-c8cb4c045663",
          type: "node:task",
          x: 797,
          y: 254,
          properties: {
            displayName: "领导审批",
            preInterceptors: "",
            postInterceptors: "",
            formKey: "",
            approverType: "USER",
            approverValue: "2",
            approverText: "若依",
            performType: "NORMAL",
            expireTime: 0,
            buttons: [],
            rejectNode: "",
            width: 120,
            height: 80,
          },
          text: {
            x: 797,
            y: 254,
            value: "领导审批",
          },
        },
        {
          id: "d89b6de7-587b-42b5-81be-a0c128346bf8",
          type: "node:decision",
          x: 539,
          y: 261,
          properties: {
            width: 50,
            height: 50,
          },
        },
        {
          id: "27a29cf9-a8bb-4f4e-81db-3285188f2ffe",
          type: "node:end",
          x: 798,
          y: 570,
          properties: {
            width: 56,
            height: 56,
          },
          text: {
            x: 798,
            y: 610,
            value: "结束",
          },
        },
      ],
      edges: [
        {
          id: "1e81f305-9603-4ba5-a357-c8e2cf38bbf8",
          type: "polyline",
          properties: {
            displayName: "day大于3天",
            conditionExpr: "#day>3",
          },
          sourceNodeId: "d89b6de7-587b-42b5-81be-a0c128346bf8",
          targetNodeId: "ad608955-c7fc-4592-a88e-c8cb4c045663",
          sourceAnchorId: "d89b6de7-587b-42b5-81be-a0c128346bf8_1",
          targetAnchorId: "ad608955-c7fc-4592-a88e-c8cb4c045663_2",
          startPoint: {
            x: 564,
            y: 261,
          },
          endPoint: {
            x: 737,
            y: 261,
          },
          text: {
            x: 695.5,
            y: 324,
            value: "day大于3天",
          },
          pointsList: [
            {
              x: 564,
              y: 261,
            },
            {
              x: 737,
              y: 261,
            },
          ],
        },
        {
          id: "7db069fc-f0a0-49b2-ba29-0866bbfbf3d6",
          type: "polyline",
          properties: {},
          sourceNodeId: "ad608955-c7fc-4592-a88e-c8cb4c045663",
          targetNodeId: "27a29cf9-a8bb-4f4e-81db-3285188f2ffe",
          sourceAnchorId: "ad608955-c7fc-4592-a88e-c8cb4c045663_2",
          targetAnchorId: "27a29cf9-a8bb-4f4e-81db-3285188f2ffe_0",
          startPoint: {
            x: 797,
            y: 294,
          },
          endPoint: {
            x: 798,
            y: 542,
          },
          pointsList: [
            {
              x: 797,
              y: 294,
            },
            {
              x: 797,
              y: 418,
            },
            {
              x: 798,
              y: 418,
            },
            {
              x: 798,
              y: 542,
            },
          ],
        },
        {
          id: "2d270855-3eb3-4a52-8f98-1f5b2c58ca40",
          type: "polyline",
          properties: {
            displayName: "day小于3天",
            conditionExpr: "#day<3",
          },
          sourceNodeId: "d89b6de7-587b-42b5-81be-a0c128346bf8",
          targetNodeId: "27a29cf9-a8bb-4f4e-81db-3285188f2ffe",
          sourceAnchorId: "d89b6de7-587b-42b5-81be-a0c128346bf8_2",
          targetAnchorId: "27a29cf9-a8bb-4f4e-81db-3285188f2ffe_3",
          startPoint: {
            x: 539,
            y: 286,
          },
          endPoint: {
            x: 770,
            y: 570,
          },
          text: {
            x: 539,
            y: 428,
            value: "day小于3天",
          },
          pointsList: [
            {
              x: 539,
              y: 286,
            },
            {
              x: 539,
              y: 570,
            },
            {
              x: 770,
              y: 570,
            },
          ],
        },
        {
          id: "1a0b418c-d57f-46f8-8999-1f671727bb1e",
          type: "polyline",
          properties: {},
          sourceNodeId: "090e0484-6ae5-47ea-9f8c-937d162305a8",
          targetNodeId: "d89b6de7-587b-42b5-81be-a0c128346bf8",
          sourceAnchorId: "090e0484-6ae5-47ea-9f8c-937d162305a8_1",
          targetAnchorId: "d89b6de7-587b-42b5-81be-a0c128346bf8_3",
          startPoint: {
            x: 430,
            y: 253,
          },
          endPoint: {
            x: 514,
            y: 261,
          },
          pointsList: [
            {
              x: 430,
              y: 253,
            },
            {
              x: 472,
              y: 253,
            },
            {
              x: 472,
              y: 261,
            },
            {
              x: 514,
              y: 261,
            },
          ],
        },
        {
          id: "e4a4c399-b999-4733-a689-d9e4acd3664d",
          type: "polyline",
          properties: {},
          sourceNodeId: "c7886030-a536-499d-8a18-26b6f721f419",
          targetNodeId: "090e0484-6ae5-47ea-9f8c-937d162305a8",
          sourceAnchorId: "c7886030-a536-499d-8a18-26b6f721f419_1",
          targetAnchorId: "090e0484-6ae5-47ea-9f8c-937d162305a8_3",
          startPoint: {
            x: 199,
            y: 245,
          },
          endPoint: {
            x: 310,
            y: 253,
          },
          pointsList: [
            {
              x: 199,
              y: 245,
            },
            {
              x: 254.5,
              y: 245,
            },
            {
              x: 254.5,
              y: 253,
            },
            {
              x: 310,
              y: 253,
            },
          ],
        },
      ],
    };
  }, 2000);
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 500px;
}
</style>
