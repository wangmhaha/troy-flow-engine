<!--
 * @Descripttion: 
 * @version: 
 * @Author: wangmin
 * @Date: 2025-04-27 15:03:16
 * @LastEditors: wangmin
 * @LastEditTime: 2025-05-06 14:36:07
 -->
<template>
  <div class="container">
    <TroyFlowEngine
      :getDeptTree="getDeptTree"
      :getUserList="getUserList"
      :getRoleList="getRoleList"
      @on-save="saveFlow"
    />
  </div>
</template>
<script setup>
import { TroyFlowEngine } from "../packages";

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
</script>

<style scoped>
.container {
  width: 100%;
  height: 500px;
}
</style>
