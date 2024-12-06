export default [{
  path: "/materialCenter",
  name: "materialCenter",
  meta: {
    title: "物料中心",
    icon: "menu-material",
    keepAlive: true
  },
  children: [
  // 非生产物料(730之前：格采商城管理)
  {
    path: "/materialCenter/mallManage",
    name: "materialCenter/mallManage",
    meta: {
      title: "非生产物料",
      icon: "dashboard",
      keepAlive: true
    },
    children: [{
      path: "/materialCenter/mallManage/spec/specManage",
      name: "materialCenter/mallManage/spec/specManage",
      component: () => import("@/views/materialCenter/mallManage/spec/SpecManage.vue"),
      meta: {
        title: "规格管理",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/materialCenter/mallManage/spec/specAdd",
      name: "materialCenter/mallManage/spec/specAdd",
      component: () => import("@/views/materialCenter/mallManage/spec/SpecAdd.vue"),
      meta: {
        title: "新增规格",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "规格管理",
          path: "/materialCenter/mallManage/spec/specManage"
        }
      },
      beforeEnter: (to, from) => {
        if (from.path === "/materialCenter/mallManage/spec/specManage") {
          to.meta.source = "/materialCenter/mallManage/spec/specManage";
          to.meta.shouldRefresh = true;
        } else if (from.path === "/materialCenter/mallManage/spu/spuAdd") {
          to.meta.source = "/materialCenter/mallManage/spu/spuAdd";
          to.meta.shouldRefresh = false;
        }
      }
    }, {
      path: "/materialCenter/mallManage/spec/specDetail",
      name: "materialCenter/mallManage/spec/specDetail",
      component: () => import("@/views/materialCenter/mallManage/spec/SpecDetail.vue"),
      meta: {
        title: "修改规格",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "规格管理",
          path: "/materialCenter/mallManage/spec/specManage"
        }
      },
      beforeEnter: (to, from) => {
        to.meta.source = from.path;
        to.meta.shouldRefresh = true;
      }
    }, {
      path: "/materialCenter/mallManage/spu/spuManage",
      name: "materialCenter/mallManage/spu/spuManage",
      component: () => import("@/views/materialCenter/mallManage/spu/SpuManage.vue"),
      meta: {
        title: "SPU管理",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/materialCenter/mallManage/spu/spuAdd",
      name: "materialCenter/mallManage/spu/spuAdd",
      component: () => import("@/views/materialCenter/mallManage/spu/SpuAdd.vue"),
      meta: {
        title: "新增SPU",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "SPU管理",
          path: "/materialCenter/mallManage/spu/spuManage"
        }
      }
    }, {
      path: "/materialCenter/mallManage/spu/spuDetail",
      name: "materialCenter/mallManage/spu/spuDetail",
      component: () => import("@/views/materialCenter/mallManage/spu/SpuDetail.vue"),
      meta: {
        title: "查看SPU",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "SPU管理",
          path: "/materialCenter/mallManage/spu/spuManage"
        }
      }
    }, {
      path: "/materialCenter/mallManage/spu/spuEdit",
      name: "materialCenter/mallManage/spu/spuEdit",
      component: () => import("@/views/materialCenter/mallManage/spu/SpuEdit.vue"),
      meta: {
        title: "修改SPU",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        shouldRefresh: false,
        parent: {
          title: "SPU管理",
          path: "/materialCenter/mallManage/spu/spuManage"
        }
      },
      beforeEnter: (to, from) => {
        if (from.path === "/materialCenter/mallManage/spec/specAdd") {
          to.meta.source = "/materialCenter/mallManage/spu/spuManage";
        } else {
          to.meta.source = from.path;
        }
        to.meta.query = from.query;
      }
    }, {
      path: "/materialCenter/mallManage/sku/skuManage",
      name: "materialCenter/mallManage/sku/skuManage",
      component: () => import("@/views/materialCenter/mallManage/sku/SkuManage.vue"),
      meta: {
        title: "SKU管理",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/materialCenter/mallManage/sku/skuDetail",
      name: "materialCenter/mallManage/sku/skuDetail",
      component: () => import("@/views/materialCenter/mallManage/sku/SkuDetail.vue"),
      meta: {
        title: "查看SKU",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "SKU管理",
          path: "/materialCenter/mallManage/sku/skuManage"
        }
      }
    }, {
      path: "/materialCenter/mallManage/sku/skuEdit",
      name: "materialCenter/mallManage/sku/skuEdit",
      component: () => import("@/views/materialCenter/mallManage/sku/SkuEdit.vue"),
      meta: {
        title: "修改SKU",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        shouldRefresh: false,
        parent: {
          title: "SKU管理",
          path: "/materialCenter/mallManage/sku/skuManage"
        }
      },
      beforeEnter: (to, from) => {
        if (from.path === "/materialCenter/mallManage/sku/skuManage" || from.path === "/materialCenter/mallManage/spu/spuDetail" || from.path === "/materialCenter/mallManage/sku/skuDetail") {
          to.meta.shouldRefresh = true;
        }
        to.meta.source = from.path;
        to.meta.query = from.query;
      }
    }, {
      path: "/materialCenter/mallManage/material/materialBinding",
      name: "materialCenter/mallManage/material/materialBinding",
      component: () => import("@/views/materialCenter/mallManage/material/MaterialBinding.vue"),
      meta: {
        title: "非生产物料管理",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/materialCenter/mallManage/material/bindingSpu",
      name: "materialCenter/mallManage/material/bindingSpu",
      component: () => import("@/views/materialCenter/mallManage/material/BindingSpu.vue"),
      meta: {
        title: "物料绑定",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "非生产物料管理",
          path: "/materialCenter/mallManage/material/materialBinding"
        }
      }
    },
    // 物料详情
    {
      path: "/materialCenter/mallManage/material/materialDetail",
      name: "materialCenter/mallManage/material/materialDetail",
      component: () => import("@/views/materialCenter/mallManage/material/MaterialDetail.vue"),
      meta: {
        title: "查看非生产物料",
        icon: "dashboard",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "非生产物料管理",
          path: "/materialCenter/mallManage/material/materialBinding"
        }
      }
    },
    // 物料详情-修改
    {
      path: "/materialCenter/mallManage/material/materialEdit",
      name: "materialCenter/mallManage/material/materialEdit",
      component: () => import("@/views/materialCenter/mallManage/material/MaterialEdit.vue"),
      meta: {
        title: "修改非生产物料",
        icon: "dashboard",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "非生产物料管理",
          path: "/materialCenter/mallManage/material/materialBinding"
        }
      }
    },
    // 物料档案
    {
      path: "/materialCenter/mallManage/materialArchives",
      name: "materialCenter/mallManage/materialArchives",
      component: () => import("@/views/materialCenter/mallManage/materialArchives/MaterialArchives.vue"),
      meta: {
        title: "非生产物料档案",
        icon: "dashboard",
        keepAlive: true
      }
    },
    // 档案详情
    {
      path: "/materialCenter/mallManage/materialArchives/archivesDetail",
      name: "materialCenter/mallManage/materialArchives/archivesDetail",
      component: () => import("@/views/materialCenter/mallManage/materialArchives/ArchivesDetail.vue"),
      meta: {
        title: "查看非生产物料档案",
        icon: "dashboard",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "非生产物料档案",
          path: "/materialCenter/mallManage/materialArchives"
        }
      }
    },
    // 非生产物料源数据
    {
      path: "/materialCenter/mallManage/material/sourceDataManage",
      name: "materialCenter/mallManage/material/sourceDataManage",
      component: () => import("@/views/materialCenter/mallManage/material/SourceDataManage.vue"),
      meta: {
        title: "非生产物料源数据",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      name: "1",
      path: "1",
      component: "() => import('1')",
      meta: {
        title: "1",
        keepAlive: true
      },
      children: [{
        name: "1",
        path: "1"
      }]
    }]
  },
  // 生产物料
  {
    path: "/materialCenter/production",
    name: "materialCenter/production",
    meta: {
      title: "生产物料",
      icon: "dashboard",
      keepAlive: true
    },
    children: [{
      path: "/materialCenter/production/materialManage",
      name: "materialCenter/production/materialManage",
      component: () => import("@/views/materialCenter/production/materialManage.vue"),
      meta: {
        title: "生产物料管理",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/materialCenter/production/materialManage/materialManageDetail",
      name: "materialCenter/production/materialManage/materialManageDetail",
      component: () => import("@/views/materialCenter/production/materialManageDetail.vue"),
      meta: {
        title: "查看生产物料",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "生产物料管理",
          path: "/materialCenter/mallManage/spec/specManage"
        }
      }
    }, {
      path: "/materialCenter/production/materials",
      name: "materialCenter/production/materials",
      component: () => import("@/views/materialCenter/production/Materials.vue"),
      meta: {
        title: "生产物料档案",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/materialCenter/production/dataSource",
      name: "materialCenter/production/dataSource",
      component: () => import("@/views/materialCenter/production/MaterialsDataSource.vue"),
      meta: {
        title: "生产物料源数据",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/materialCenter/production/materials/materialsDetail",
      name: "materialCenter/production/materials/materialsDetail",
      component: () => import("@/views/materialCenter/production/MaterialsDetail.vue"),
      meta: {
        title: "查看生产物料档案",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "生产物料档案",
          path: "/materialCenter/production/materials"
        },
        keepAlive: true
      }
    }, {
      path: "/materialCenter/production/newMaterialApply",
      name: "materialCenter/production/newMaterialApply",
      component: () => import("@/views/materialCenter/production/newMaterialApply/NewMaterialApplyList.vue"),
      meta: {
        title: "新品申请管理",
        icon: "dashboard",
        keepAlive: true
      }
    },
    //新品申请单
    {
      path: "/materialCenter/production/newMaterialApply/newApplyForm",
      name: "materialCenter/production/newMaterialApply/newApplyForm",
      component: () => import("@/views/materialCenter/production/newMaterialApply/NewApplyForm.vue"),
      meta: {
        title: "新品申请单",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "新品申请管理",
          path: "/materialCenter/production/newMaterialApply"
        }
      }
    },
    //新品申请单详情
    {
      path: "/materialCenter/production/newMaterialApply/applyFormDetail",
      name: "/materialCenter/production/newMaterialApply/applyFormDetail",
      component: () => import("@/views/materialCenter/production/newMaterialApply/NewMaterialDetail.vue"),
      meta: {
        title: "新品申请单详情",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "新品申请管理",
          path: "/materialCenter/production/newMaterialApply"
        }
      }
    },
    //新品申请单详情申请补充信息列表查看补充单
    {
      path: "/materialCenter/production/newMaterialApply/applyFormDetail/paramsSupplySheet",
      name: "materialCenter/production/newMaterialApply/applyFormDetail/paramsSupplySheet",
      component: () => import("@/views/materialCenter/production/newMaterialApply/ParamsSupplySheet.vue"),
      meta: {
        title: "查看参数补充单",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "新品申请管理",
          path: "/materialCenter/production/newMaterialApply/applyFormDetail"
        }
      }
    },
    //新品申请单-参数补充单-转正补充
    {
      path: "/materialCenter/production/newMaterialApply/applyFormDetail/toFormalSupplySheet",
      name: "materialCenter/production/newMaterialApply/applyFormDetail/toFormalSupplySheet",
      component: () => import("@/views/materialCenter/production/newMaterialApply/ToFormalSupplySheet.vue"),
      meta: {
        title: "查看参数补充单",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "新品申请管理",
          path: "/materialCenter/production/newMaterialApply/applyFormDetail"
        }
      }
    },
    //查看原始单据
    {
      path: "/materialCenter/production/newMaterialApply/OriginalDetail",
      name: "/materialCenter/production/newMaterialApply/OriginalDetail",
      component: () => import("@/views/materialCenter/production/newMaterialApply/OriginalDetail.vue"),
      meta: {
        title: "原始单据详情",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "新品申请管理",
          path: "/materialCenter/production/newMaterialApply"
        }
      }
    },
    // 新品申请单提交成功页面
    {
      path: "/materialCenter/production/newMaterialApply/submitSuccess",
      name: "/materialCenter/production/newMaterialApply/submitSuccess",
      component: () => import("@/views/materialCenter/production/newMaterialApply/addComponents/SubmitSuccess.vue"),
      meta: {
        title: "新品申请单",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "新品申请管理",
          path: "/materialCenter/production/newMaterialApply"
        }
      }
    }]
  },
  // 类目管理
  {
    path: "/materialCenter/categoryManage",
    name: "materialCenter/categoryManage",
    component: () => import("@/views/materialCenter/categoryManage/CategoryManage.vue"),
    meta: {
      title: "类目管理",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/materialCenter/tempMaterial/tempMaterial",
    name: "materialCenter/tempMaterial/tempMaterial",
    component: () => import("@/views/materialCenter/tempMaterial/TempMaterial.vue"),
    meta: {
      title: "临时物料管理",
      keepAlive: true
    }
  }, {
    path: "/materialCenter/tempMaterial/detail",
    name: "materialCenter/tempMaterial/detail",
    component: () => import("@/views/materialCenter/tempMaterial/Detail.vue"),
    meta: {
      title: "查看管理单",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "临时物料管理",
        path: "/materialCenter/tempMaterial/tempMaterial"
      }
    }
  }, {
    path: "/materialCenter/tempMaterial/confirm",
    name: "materialCenter/tempMaterial/confirm",
    component: () => import("@/views/materialCenter/tempMaterial/confirm.vue"),
    meta: {
      title: "物料信息确认",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "临时物料管理",
        path: "/materialCenter/tempMaterial/tempMaterial"
      }
    }
  }]
},
//财务中心
{
  path: "/financialCenter",
  name: "financialCenter",
  meta: {
    title: "大财务中心",
    icon: "menu-finance",
    keepAlive: true
  },
  children: [
  // 定额管理
  {
    path: "/financialCenter/quotaManage",
    name: "financialCenter/quotaManage",
    meta: {
      title: "定额管理",
      icon: "dashboard",
      keepAlive: true
    },
    children: [
    //预算管理
    {
      path: "/financialCenter/quotaManage/budgetManage",
      name: "financialCenter/quotaManage/budgetManage",
      component: () => import("@/views/financialCenter/quotaManage/budget/BudgetManage.vue"),
      meta: {
        title: "预算管理",
        icon: "dashboard",
        keepAlive: true
      }
    },
    //定额配置
    {
      path: "/financialCenter/quotaManage/quotaConfigManage",
      name: "financialCenter/quotaManage/quotaConfigManage",
      component: () => import("@/views/financialCenter/quotaManage/QuotaConfigManage.vue"),
      meta: {
        title: "定额配置",
        icon: "dashboard",
        keepAlive: true
      }
    },
    //扩额管理
    {
      path: "/financialCenter/quotaManage/quotaApproveManage",
      name: "financialCenter/quotaManage/quotaApproveManage",
      component: () => import("@/views/financialCenter/quotaManage/extend/ExtendManage.vue"),
      meta: {
        title: "扩额管理",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/financialCenter/quotaManage/quotaDetail",
      name: "financialCenter/quotaManage/quotaDetail",
      component: () => import("@/views/financialCenter/quotaManage/QuotaDetail.vue"),
      meta: {
        title: "定额详情",
        icon: "dashboard",
        keepAlive: false,
        hideInMenu: true
      }
    }, {
      path: "/financialCenter/quotaManage/addQuota",
      name: "financialCenter/quotaManage/addQuota",
      component: () => import("@/views/financialCenter/quotaManage/addQuota/AddQuota.vue"),
      meta: {
        title: "新增方案",
        icon: "dashboard",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "定额配置",
          path: "/financialCenter/quotaManage/quotaConfigManage"
        }
      },
      beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        const flag = "id" in to.query;
        if (flag) {
          to.meta.title = "编辑方案";
        }
      }
    }]
  },
  //询价核价模块
  {
    path: "/financialCenter/enquiryAndVerify",
    name: "financialCenter/enquiryAndVerify",
    meta: {
      title: "价格管理",
      keepAlive: true
    },
    children: [{
      path: "/financialCenter/enquiryAndVerify/enquiryManage",
      name: "financialCenter/enquiryAndVerify/enquiryManage",
      component: () => import("@/views/financialCenter/enquiryAndVerify/enquiryManage/index.vue"),
      meta: {
        title: "询价管理",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/inquiryPriceLib",
      name: "financialCenter/enquiryAndVerify/inquiryPriceLib",
      component: () => import("@/views/financialCenter/enquiryAndVerify/inquiryPriceLib/index.vue"),
      meta: {
        title: "询价价格库",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/enquiryManage/add",
      name: "financialCenter/enquiryAndVerify/enquiryManage/add",
      component: () => import("@/views/financialCenter/enquiryAndVerify/enquiryManage/EnquiryEdit.vue"),
      meta: {
        title: "发起询价",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "询价管理",
          path: "/financialCenter/enquiryAndVerify/enquiryManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/enquiryManage/edit",
      name: "financialCenter/enquiryAndVerify/enquiryManage/edit",
      component: () => import("@/views/financialCenter/enquiryAndVerify/enquiryManage/EnquiryEdit.vue"),
      meta: {
        title: "编辑",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "询价管理",
          path: "/financialCenter/enquiryAndVerify/enquiryManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/enquiryManage/view",
      name: "financialCenter/enquiryAndVerify/enquiryManage/view",
      component: () => import("@/views/financialCenter/enquiryAndVerify/enquiryManage/EnquiryView.vue"),
      meta: {
        title: "查看询价",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "询价管理",
          path: "/financialCenter/enquiryAndVerify/enquiryManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/enquiryManage/handle",
      name: "financialCenter/enquiryAndVerify/enquiryManage/handle",
      component: () => import("@/views/financialCenter/enquiryAndVerify/enquiryManage/EnquiryView.vue"),
      meta: {
        title: "处理询价",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "询价管理",
          path: "/financialCenter/enquiryAndVerify/enquiryManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/verifyManage",
      name: "financialCenter/enquiryAndVerify/verifyManage",
      component: () => import("@/views/financialCenter/enquiryAndVerify/verifyManage/index.vue"),
      meta: {
        title: "核价管理",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/verifyManage/launchVerifyPrice",
      name: "financialCenter/enquiryAndVerify/verifyManage/launchVerifyPrice",
      component: () => import("@/views/financialCenter/enquiryAndVerify/verifyManage/LaunchVerifyPrice.vue"),
      meta: {
        title: "发起核价",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "核价管理",
          path: "/financialCenter/enquiryAndVerify/verifyManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/verifyManage/detail",
      name: "financialCenter/enquiryAndVerify/verifyManage/detail",
      component: () => import("@/views/financialCenter/enquiryAndVerify/verifyManage/Detail.vue"),
      meta: {
        title: "报告预览",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "核价管理",
          path: "/financialCenter/enquiryAndVerify/verifyManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/verifyPriceLib",
      name: "financialCenter/enquiryAndVerify/verifyPriceLib",
      component: () => import("@/views/financialCenter/enquiryAndVerify/verifyPriceLib/index.vue"),
      meta: {
        title: "核价价格库",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/pricingManage",
      name: "financialCenter/enquiryAndVerify/pricingManage",
      component: () => import("@/views/financialCenter/enquiryAndVerify/pricingManage/index.vue"),
      meta: {
        title: "定价管理",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/pricingManage/addPricing",
      name: "financialCenter/enquiryAndVerify/pricingManage/addPricing",
      component: () => import("@/views/financialCenter/enquiryAndVerify/pricingManage/addPricing.vue"),
      meta: {
        title: "新增定价",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "定价管理",
          path: "/financialCenter/enquiryAndVerify/pricingManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/pricingManage/editPricing",
      name: "financialCenter/enquiryAndVerify/pricingManage/editPricing",
      component: () => import("@/views/financialCenter/enquiryAndVerify/pricingManage/addPricing.vue"),
      meta: {
        title: "编辑定价",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "定价管理",
          path: "/financialCenter/enquiryAndVerify/pricingManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/pricingManage/detail",
      name: "financialCenter/enquiryAndVerify/pricingManage/detail",
      component: () => import("@/views/financialCenter/enquiryAndVerify/pricingManage/addPricing.vue"),
      meta: {
        title: "定价详情",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "定价管理",
          path: "/financialCenter/enquiryAndVerify/pricingManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/pricingManage/releaseSuccess",
      name: "financialCenter/enquiryAndVerify/pricingManage/releaseSuccess",
      component: () => import("@/views/financialCenter/enquiryAndVerify/pricingManage/ReleaseSuccess.vue"),
      meta: {
        title: "发起成功",
        icon: "dashboard",
        hideInMenu: true,
        parent: {
          title: "定价管理",
          path: "/financialCenter/enquiryAndVerify/pricingManage"
        }
      }
    }, {
      path: "/financialCenter/enquiryAndVerify/proMaterialPriceLib",
      name: "financialCenter/enquiryAndVerify/proMaterialPriceLib",
      component: () => import("@/views/financialCenter/enquiryAndVerify/proMaterialPriceLib/index.vue"),
      meta: {
        title: "生产物料定价价格库",
        icon: "dashboard",
        keepAlive: true
      }
    }]
  }]
},
//组织权限中心
{
  path: "/permissionCenter",
  name: "permissionCenter",
  // redirect: '/permissionCenter/organization',
  meta: {
    title: "组织权限中心",
    icon: "menu-org",
    keepAlive: true
  },
  children: [
  //组织架构
  {
    path: "/permissionCenter/organization",
    name: "permissionCenter/organization",
    component: () => import("@/views/permissionCenter/org/Organization.vue"),
    meta: {
      title: "组织架构",
      keepAlive: true,
      access: ["add", "edit", "delete"]
    }
  }, {
    path: "/permissionCenter/organization/add",
    name: "permissionCenter/organization/add",
    component: () => import("@/views/permissionCenter/org/OrganizationAdd.vue"),
    meta: {
      title: "新增组织",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "组织架构",
        path: "/permissionCenter/organization"
      }
    }
  }, {
    path: "/permissionCenter/organization/edit",
    name: "permissionCenter/organization/edit",
    component: () => import("@/views/permissionCenter/org/OrganizationAdd.vue"),
    meta: {
      title: "编辑组织",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "组织架构",
        path: "/permissionCenter/organization"
      }
    }
  },
  //角色管理
  {
    path: "/permissionCenter/roleManage",
    name: "permissionCenter/roleManage",
    component: () => import("@/views/permissionCenter/role/RoleManage.vue"),
    meta: {
      title: "角色管理",
      icon: "dashboard",
      keepAlive: true
    }
  },
  //用户管理
  {
    path: "/permissionCenter/userManage",
    name: "permissionCenter/userManage",
    component: () => import("@/views/permissionCenter/user/UserManage.vue"),
    meta: {
      title: "用户管理",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/permissionCenter/userManage/add",
    name: "permissionCenter/userManage/add",
    component: () => import("@/views/permissionCenter/user/UserAdd.vue"),
    meta: {
      title: "新增用户",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "用户管理",
        path: "/permissionCenter/userManage"
      }
    }
  }, {
    path: "/permissionCenter/userManage/detail",
    name: "permissionCenter/userManage/detail",
    component: () => import("@/views/permissionCenter/user/UserDetail.vue"),
    meta: {
      title: "用户详情",
      keepAlive: true,
      hideInMenu: true
    }
  }, {
    path: "/permissionCenter/userManage/manageSetting",
    name: "permissionCenter/userManage/manageSetting",
    component: () => import("@/views/permissionCenter/user/UserManageSetting.vue"),
    meta: {
      title: "管辖配置",
      keepAlive: true,
      hideInMenu: true
    }
  }]
}, {
  path: "/tradeCenter",
  name: "tradeCenter",
  meta: {
    title: "大交易中心",
    icon: "menu_trade_center",
    keepAlive: true
  },
  children: [{
    path: "/tradeCenter/nonProductionOrder",
    name: "tradeCenter/nonProductionOrder",
    component: () => import("@/views/tradeCenter/nonProductionOrder/index.vue"),
    meta: {
      title: "非生产订单",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/tradeCenter/nonProductionOrder/sourcingRouteDetail",
    name: "tradeCenter/nonProductionOrder/sourcingRouteDetail",
    component: () => import("@/views/tradeCenter/nonProductionOrder/SourcingRouteDetail.vue"),
    meta: {
      title: "详情",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "非生产订单",
        path: "/tradeCenter/nonProductionOrder"
      }
    }
  }, {
    path: "/tradeCenter/nonProductionOrder/orderHandlingDetail",
    name: "tradeCenter/nonProductionOrder/orderHandlingDetail",
    component: () => import("@/views/tradeCenter/nonProductionOrder/OrderHandlingDetail.vue"),
    meta: {
      title: "详情",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "非生产订单",
        path: "/tradeCenter/nonProductionOrder"
      }
    }
  }, {
    path: "/tradeCenter/nonProductionOrder/mergeProductRows",
    name: "tradeCenter/nonProductionOrder/mergeProductRows",
    component: () => import("@/views/tradeCenter/nonProductionOrder/MergeProductRows.vue"),
    meta: {
      title: "合并",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "非生产订单",
        path: "/tradeCenter/nonProductionOrder"
      }
    }
  }, {
    path: "/tradeCenter/nonProductionOrder/decompositionOrder",
    name: "tradeCenter/nonProductionOrder/decompositionOrder",
    component: () => import("@/views/tradeCenter/nonProductionOrder/DecompositionOrder.vue"),
    meta: {
      title: "拆分",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "非生产订单",
        path: "/tradeCenter/nonProductionOrder"
      }
    }
  }, {
    path: "/productionOrder",
    name: "productionOrder",
    meta: {
      title: "生产订单",
      keepAlive: true
    },
    children: [{
      path: "/productionOrder/formManager",
      name: "productionOrder/formManager",
      component: () => import("@/views/tradeCenter/productionOrder/formManage/FormManager.vue"),
      meta: {
        title: "表单管理",
        keepAlive: true,
        access: []
      }
    }, {
      path: "/productionOrder/airConditionerModePlate",
      name: "productionOrder/airConditionerModePlate",
      component: () => import("@/views/tradeCenter/productionOrder/airConditionerMode/AirConditionerModePlate.vue"),
      meta: {
        title: "空调板块",
        keepAlive: true
      }
    }, {
      path: "/productionOrder/airConditionerModePlate/demandEntryDetail",
      name: "productionOrder/airConditionerModePlate/demandEntryDetail",
      component: () => import("@/views/tradeCenter/productionOrder/airConditionerMode/DemandEntryDetail.vue"),
      meta: {
        title: "查看需求录入",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "空调板块",
          path: "/productionOrder/airConditionerModePlate"
        }
      }
    }, {
      path: "/productionOrder/airConditionerModePlate/demandEntryEdit",
      name: "productionOrder/airConditionerModePlate/demandEntryEdit",
      component: () => import("@/views/tradeCenter/productionOrder/airConditionerMode/DemandEntryEdit.vue"),
      meta: {
        title: "编辑需求录入",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "空调板块",
          path: "/productionOrder/airConditionerModePlate"
        }
      }
    }, {
      path: "/productionOrder/airConditionerModePlate/demandTakeOnDetail",
      name: "productionOrder/airConditionerModePlate/demandTakeOnDetail",
      component: () => import("@/views/tradeCenter/productionOrder/airConditionerMode/DemandTakeOnDetail.vue"),
      meta: {
        title: "查看需求承接",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "空调板块",
          path: "/productionOrder/airConditionerModePlate"
        }
      }
    }, {
      path: "/productionOrder/airConditionerModePlate/demandTakeOnEdit",
      name: "productionOrder/airConditionerModePlate/demandTakeOnEdit",
      component: () => import("@/views/tradeCenter/productionOrder/airConditionerMode/DemandTakeOnEdit.vue"),
      meta: {
        title: "处理需求承接",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "空调板块",
          path: "/productionOrder/airConditionerModePlate"
        }
      }
    }, {
      path: "/productionOrder/addNewMode",
      name: "productionOrder/addNewMode",
      component: () => import("@/views/tradeCenter/productionOrder/formManage/AddNewMode.vue"),
      meta: {
        title: "新增模板",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "表单管理",
          path: "/productionOrder/formManager"
        }
      }
    }, {
      path: "/productionOrder/modeDetail",
      name: "productionOrder/modeDetail",
      component: () => import("@/views/tradeCenter/productionOrder/formManage/ModeDetail.vue"),
      meta: {
        title: "模板详情",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "表单管理",
          path: "/productionOrder/formManager"
        }
      }
    }, {
      path: "/productionOrder/editMode",
      name: "productionOrder/editMode",
      component: () => import("@/views/tradeCenter/productionOrder/formManage/EditNewMode.vue"),
      meta: {
        title: "编辑模板",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "表单管理",
          path: "/productionOrder/formManager"
        }
      }
    }, {
      path: "/productionOrder/AddNewDemand",
      name: "productionOrder/AddNewDemand",
      component: () => import("@/views/tradeCenter/productionOrder/airConditionerMode/AddNewDemand.vue"),
      meta: {
        title: "新增需求",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "生产订单",
          path: "/productionOrder/formManager"
        }
      }
    }]
  }, {
    path: "/tradeCenter/deliveryManagement",
    name: "tradeCenter/deliveryManagement",
    component: () => import("@/views/tradeCenter/deliveryManagement/DeliveryManagement.vue"),
    meta: {
      title: "送货管理",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/tradeCenter/deliveryManagement/deliveryPlanDetail",
    name: "tradeCenter/deliveryManagement/DeliveryPlanDetail",
    component: () => import("@/views/tradeCenter/deliveryManagement/deliveryPlan/DeliveryPlanDetail.vue"),
    meta: {
      title: "送货计划详情",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "送货管理",
        path: "/tradeCenter/deliveryManagement"
      }
    }
  }, {
    path: "/tradeCenter/deliveryManagement/deliveryNoteDetail",
    name: "tradeCenter/deliveryManagement/deliveryNoteDetail",
    component: () => import("@/views/tradeCenter/deliveryManagement/deliveryNote/DeliveryNoteDetail.vue"),
    meta: {
      title: "送货单详情",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "送货管理",
        path: "/tradeCenter/deliveryManagement"
      }
    }
  }, {
    path: "/tradeCenter/productionMaterialsProcurement",
    name: "tradeCenter/productionMaterialsProcurement",
    meta: {
      title: "生产物料采购",
      keepAlive: true
    },
    children: [{
      path: "/tradeCenter/productionMaterialsProcurement/purchaseOrder",
      name: "tradeCenter/productionMaterialsProcurement/purchaseOrder",
      component: () => import("@/views/tradeCenter/productionMaterialsProcurement/purchaseOrder/PurchaseOrder.vue"),
      meta: {
        title: "采购订单",
        keepAlive: true,
        access: []
      }
    }, {
      path: "/tradeCenter/productionMaterialsProcurement/purchaseOrder/purchaseOrderDetail",
      name: "tradeCenter/productionMaterialsProcurement/purchaseOrder/purchaseOrderDetail",
      component: () => import("@/views/tradeCenter/productionMaterialsProcurement/purchaseOrder/PurchaseOrderDetail.vue"),
      meta: {
        title: "详情",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "采购订单",
          path: "/tradeCenter/productionMaterialsProcurement/purchaseOrder"
        }
      }
    }, {
      path: "/tradeCenter/productionMaterialsProcurement/applyOrder",
      name: "tradeCenter/productionMaterialsProcurement/applyOrder",
      component: () => import("@/views/tradeCenter/productionMaterialsProcurement/applyOrder/index.vue"),
      meta: {
        title: "申购订单",
        keepAlive: true
      }
    }, {
      path: "/tradeCenter/productionMaterialsProcurement/applyOrder/detail",
      name: "tradeCenter/productionMaterialsProcurement/applyOrder/detail",
      component: () => import("@/views/tradeCenter/productionMaterialsProcurement/applyOrder/Detail.vue"),
      meta: {
        title: "详情",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "申购订单",
          path: "/tradeCenter/productionMaterialsProcurement/applyOrder"
        }
      }
    }, {
      path: "/tradeCenter/productionMaterialsProcurement/applyOrder/waitProcess",
      name: "tradeCenter/productionMaterialsProcurement/applyOrder/waitProcess",
      component: () => import("@/views/tradeCenter/productionMaterialsProcurement/applyOrder/WaitProcess.vue"),
      meta: {
        title: "处理",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "申购订单",
          path: "/tradeCenter/productionMaterialsProcurement/applyOrder"
        }
      }
    }, {
      path: "/tradeCenter/productionMaterialsProcurement/applyOrder/batchWaitProcess",
      name: "tradeCenter/productionMaterialsProcurement/applyOrder/batchWaitProcess",
      component: () => import("@/views/tradeCenter/productionMaterialsProcurement/applyOrder/BatchWaitProcess.vue"),
      meta: {
        title: "批量处理",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "申购订单",
          path: "/tradeCenter/productionMaterialsProcurement/applyOrder"
        }
      }
    }]
  }, {
    path: "/tradeCenter/deliveryWithShortage",
    name: "tradeCenter/deliveryWithShortage",
    meta: {
      title: "送货管理(短缺)",
      keepAlive: true
    },
    children: [{
      // 需要修改tabValue的值，收录在@/store/tabs的变量changeTabPathArr
      path: "/tradeCenter/deliveryWithShortage/deliveryPlan",
      name: "tradeCenter/deliveryWithShortage/deliveryPlan",
      component: () => import("@/views/tradeCenter/deliveryWithShortage/deliveryPlan/index.vue"),
      meta: {
        title: "送货排程",
        keepAlive: true
      }
    }, {
      path: "/tradeCenter/deliveryWithShortage/shortageDetail",
      name: "tradeCenter/deliveryWithShortage/shortageDetail",
      component: () => import("@/views/tradeCenter/deliveryWithShortage/deliveryPlan/ShortageDetail.vue"),
      meta: {
        title: "短缺明细",
        hideInMenu: true,
        grandAncestors: [{
          title: "送货排程"
        }, {
          title: "需求短缺列表",
          path: "/tradeCenter/deliveryWithShortage/deliveryPlan"
        }]
      }
    }, {
      path: "/tradeCenter/deliveryWithShortage/processingRecordsDetail",
      name: "tradeCenter/deliveryWithShortage/processingRecordsDetail",
      component: () => import("@/views/tradeCenter/deliveryWithShortage/deliveryPlan/ProcessingRecordsDetail.vue"),
      meta: {
        title: "详情",
        hideInMenu: true,
        grandAncestors: [{
          title: "送货排程",
          path: "/tradeCenter/deliveryWithShortage/deliveryPlan",
          breadcrumbTitle: "列表"
        }
        // {title: '列表',path: '/tradeCenter/deliveryWithShortage/deliveryPlan'}
        ]
      }
    },
    // 物料情况看板
    {
      path: "/tradeCenter/deliveryWithShortage/materialDash",
      name: "tradeCenter/deliveryWithShortage/materialDash",
      component: () => import("@/views/tradeCenter/deliveryWithShortage/deliveryPlan/components/MaterialDash.vue"),
      meta: {
        title: "物料情况看板",
        keepAlive: false,
        hideInMenu: true,
        grandAncestors: [{
          title: "送货排程"
        }, {
          title: "送货计划",
          path: "/tradeCenter/deliveryWithShortage/deliveryPlan"
        }]
      }
    }, {
      path: "/tradeCenter/deliveryWithShortage/deliveryNoteList",
      name: "tradeCenter/deliveryWithShortage/deliveryNoteList",
      component: () => import("@/views/tradeCenter/deliveryWithShortage/deliveryPlan/DeliveryNoteList.vue"),
      meta: {
        title: "送货单",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "送货计划",
          path: "/tradeCenter/deliveryWithShortage/deliveryPlan"
        },
        grandAncestors: [{
          title: "送货排程"
        }]
      },
      beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
        const fromQuery = from.query;
        if (Object.keys(to.query).length === 0 && from.path === "/tradeCenter/deliveryWithShortage/deliveryNoteDetail") {
          // 点击送货单详情面包屑，同时带上新的sendPlanId参数query
          next({
            path: to.path,
            query: {
              ...to.query,
              sendPlanId: fromQuery.sendPlanId || to.query.sendPlanId
            }
          });
        } else {
          next(true);
        }
      }
    }, {
      path: "/tradeCenter/deliveryWithShortage/deliveryNoteDetail",
      name: "tradeCenter/deliveryWithShortage/deliveryNoteDetail",
      component: () => import("@/views/tradeCenter/deliveryWithShortage/deliveryPlan/DeliveryNoteDetail.vue"),
      meta: {
        title: "送货单详情",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "送货单",
          path: "/tradeCenter/deliveryWithShortage/deliveryNoteList"
        },
        grandAncestors: [{
          title: "送货排程"
        }, {
          title: "送货计划",
          path: "/tradeCenter/deliveryWithShortage/deliveryPlan"
        }]
      }
    }]
  }]
},
// 供应商中心
{
  path: "/supplierManage",
  name: "supplierManage",
  meta: {
    title: "供应商中心",
    icon: "menu-org",
    keepAlive: true
  },
  children: [
  // 入驻管理
  {
    path: "/supplierManage/entryManagement",
    name: "supplierManage/entryManagement",
    meta: {
      title: "入驻管理",
      keepAlive: true
    },
    children: [
    // 企业资质核验
    {
      path: "/supplierManage/entryManagement/registrationVerification",
      name: "supplierManage/entryManagement/registrationVerification",
      component: () => import("@/views/supplierManage/entryManagement/registrationVerification/RegistrationVerification.vue"),
      meta: {
        title: "企业资质核验",
        keepAlive: true,
        access: []
      }
    },
    //资质核验详情
    {
      path: "/supplierManage/entryManagement/registrationVerification/detail",
      name: "supplierManage/entryManagement/registrationVerification/detail",
      component: () => import("@/views/supplierManage/entryManagement/registrationVerification/DetailDisplayAndUpdate.vue"),
      meta: {
        title: "申请单详情",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "企业资质核验",
          path: "/supplierManage/entryManagement/registrationVerification"
        }
      }
    },
    // 开发准入-列表
    {
      path: "/supplierManage/entryManagement/developmentAccess",
      name: "supplierManage/entryManagement/developmentAccess",
      component: () => import("@/views/supplierManage/entryManagement/developmentAccess/DevelopmentAccess.vue"),
      meta: {
        title: "开发准入",
        keepAlive: true
      }
    },
    // 开发准入-详情
    {
      path: "/supplierManage/entryManagement/developmentAccess/detail",
      name: "supplierManage/entryManagement/detail",
      component: () => import("@/views/supplierManage/entryManagement/developmentAccess/DevelopmentAccessDetail.vue"),
      meta: {
        title: "开发准入详情",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "开发准入",
          path: "/supplierManage/entryManagement/developmentAccess"
        }
      }
    },
    //协议管理
    {
      path: "/supplierManage/entryManagement/agreementManagement",
      name: "supplierManage/entryManagement/agreementManagement",
      component: () => import("@/views/supplierManage/entryManagement/agreementManagement/AgreementManagement.vue"),
      meta: {
        title: "协议管理",
        keepAlive: true
      }
    },
    //协议管理-详情
    {
      path: "/supplierManage/entryManagement/agreementManagement/detail",
      name: "supplierManage/entryManagement/agreementManagement/detail",
      component: () => import("@/views/supplierManage/entryManagement/agreementManagement/AgreementDetail.vue"),
      meta: {
        title: "查看详情",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "协议管理",
          path: "/supplierManage/entryManagement/agreementManagement"
        }
      }
    }]
  },
  // 物料确认
  {
    path: "/supplierManage/materialConfirmation",
    name: "supplierManage/materialConfirmation",
    meta: {
      title: "物料确认",
      keepAlive: true
    },
    children: [
    // 供应拓展
    {
      path: "/supplierManage/materialConfirmation/supplyExpansion",
      name: "supplierManage/materialConfirmation/supplyExpansion",
      component: () => import("@/views/supplierManage/materialConfirmation/supplyExpansion/SupplyExpansion.vue"),
      meta: {
        title: "供应拓展",
        keepAlive: true,
        access: []
      }
    },
    // 供应拓展详情
    {
      path: "/supplierManage/materialConfirmation/supplyExpansion/detail",
      name: "supplierManage/materialConfirmation/supplyExpansion/detail",
      component: () => import("@/views/supplierManage/materialConfirmation/supplyExpansion/SupplyExpansionDetail.vue"),
      meta: {
        title: "详情",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "供应拓展",
          path: "/supplierManage/materialConfirmation/supplyExpansion"
        }
      },
      beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        const flag = "isAdd" in to.query;
        if (flag) {
          to.meta.title = "新建物料拓展单";
        } else {
          to.meta.title = "详情";
        }
      }
    },
    // 供应拓展详情-处理记录
    {
      path: "/supplierManage/materialConfirmation/supplyExpansion/recorderDetail",
      name: "supplierManage/materialConfirmation/supplyExpansion/recorderDetail",
      component: () => import("@/views/supplierManage/materialConfirmation/supplyExpansion/ProcessingRecordsDetail.vue"),
      meta: {
        title: "验证信息详情",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "详情",
          path: "/supplierManage/materialConfirmation/supplyExpansion/detail"
        }
      }
    },
    // 供应拓展详情-附件详情
    {
      path: "/supplierManage/materialConfirmation/supplyExpansion/attachmentDetail",
      name: "supplierManage/materialConfirmation/supplyExpansion/attachmentDetail",
      component: () => import("@/views/supplierManage/materialConfirmation/supplyExpansion/AttachmentDetail.vue"),
      meta: {
        title: "附件详情",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "详情",
          path: "/supplierManage/materialConfirmation/supplyExpansion/detail"
        }
      }
    },
    // 确认单
    {
      path: "/supplierManage/materialConfirmation/confirmationForm",
      name: "supplierManage/materialConfirmation/confirmationForm",
      component: () => import("@/views/supplierManage/materialConfirmation/confirmationForm/ConfirmationForm.vue"),
      meta: {
        title: "确认单",
        keepAlive: true,
        access: []
      }
    },
    // 确认单详情
    {
      path: "/supplierManage/materialConfirmation/confirmationForm/detail",
      name: "supplierManage/materialConfirmation/confirmationForm/detail",
      component: () => import("@/views/supplierManage/materialConfirmation/confirmationForm/ConfirmationFormDetail.vue"),
      meta: {
        title: "详情",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "确认单",
          path: "/supplierManage/materialConfirmation/confirmationForm"
        }
      }
    },
    // 确认单-处理记录
    {
      path: "/supplierManage/materialConfirmation/confirmationForm/recorderDetail",
      name: "supplierManage/materialConfirmation/confirmationForm/recorderDetail",
      component: () => import("@/views/supplierManage/materialConfirmation/supplyExpansion/ProcessingRecordsDetail.vue"),
      meta: {
        title: "验证信息记录",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "详情",
          path: "/supplierManage/materialConfirmation/confirmationForm/detail"
        }
      }
    }]
  },
  // 物料信息完善
  {
    path: "/supplierManage/materialMsgPerfection",
    name: "supplierManage/materialMsgPerfection",
    meta: {
      title: "物料信息完善",
      keepAlive: true
    },
    children: [
    // 物料完善单
    {
      path: "/supplierManage/materialMsgPerfection/materialCompletionList",
      name: "supplierManage/materialMsgPerfection/materialCompletionList",
      component: () => import("@/views/supplierManage/materialMsgPerfection/materialCompletionList/MaterialCompletionList.vue"),
      meta: {
        title: "物料完善单",
        keepAlive: true,
        access: []
      }
    },
    // 物料完善单-处理记录
    {
      path: "/supplierManage/materialMsgPerfection/materialCompletionList/recorderDetail",
      name: "supplierManage/materialMsgPerfection/materialCompletionList/recorderDetail",
      component: () => import("@/views/supplierManage/materialMsgPerfection/materialCompletionList/HandelMaterialOrder.vue"),
      meta: {
        title: "处理",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "物料完善单",
          path: "/supplierManage/materialMsgPerfection/materialCompletionList"
        }
      }
    },
    // 物料完善单-查看
    {
      path: "/supplierManage/materialMsgPerfection/materialCompletionList/viewMaterialOrder",
      name: "supplierManage/materialMsgPerfection/materialCompletionList/viewMaterialOrder",
      component: () => import("@/views/supplierManage/materialMsgPerfection/materialCompletionList/ViewMaterialOrder.vue"),
      meta: {
        title: "查看",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "物料完善单",
          path: "/supplierManage/materialMsgPerfection/materialCompletionList"
        }
      }
    },
    // 供应商物料信息
    {
      path: "/supplierManage/materialMsgPerfection/supplierMaterialMsg",
      name: "supplierManage/materialMsgPerfection/supplierMaterialMsg",
      component: () => import("@/views/supplierManage/materialMsgPerfection/supplierMaterialMsg/SupplierMaterialMsg.vue"),
      meta: {
        title: "供应商物料信息",
        keepAlive: true,
        access: []
      }
    },
    // 供应商物料信息-处理
    {
      path: "/supplierManage/materialMsgPerfection/supplierMaterialMsg/handelSupplierMaterial",
      name: "supplierManage/materialMsgPerfection/supplierMaterialMsg/HandelSupplierMaterial",
      component: () => import("@/views/supplierManage/materialMsgPerfection/supplierMaterialMsg/HandelSupplierMaterial.vue"),
      meta: {
        title: "详情",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "供应商物料信息",
          path: "/supplierManage/materialMsgPerfection/supplierMaterialMsg"
        }
      },
      beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        if (to.query.isHandle === "true") {
          // 点击送货单详情面包屑，同时带上新的sendPlanId参数query
          to.meta.title = "变更";
        } else {
          to.meta.title = "详情";
        }
      }
    }]
  },
  // 拓类管理-列表
  {
    path: "/supplierManage/categoryManagement",
    name: "supplierManage/categoryManagement",
    component: () => import("@/views/supplierManage/entryManagement/developmentAccess/DevelopmentAccess.vue"),
    meta: {
      title: "拓类管理",
      keepAlive: true
    }
  },
  // 拓类管理-详情
  {
    path: "/supplierManage/categoryManagement/detail",
    name: "supplierManage/categoryManagement/detail",
    component: () => import("@/views/supplierManage/entryManagement/developmentAccess/DevelopmentAccessDetail.vue"),
    meta: {
      title: "拓类管理详情",
      keepAlive: false,
      hideInMenu: true,
      parent: {
        title: "拓类管理",
        path: "/supplierManage/categoryManagement"
      }
    }
  },
  // 档案管理
  {
    path: "/supplierManage/userManagement",
    name: "supplierManage/userManagement",
    component: () => import("@/views/supplierManage/userManagement/List.vue"),
    meta: {
      title: "档案管理",
      keepAlive: true
    }
  },
  // 档案管理-档案详情
  {
    path: "/supplierManage/userManagement/archivesDetail",
    name: "supplierManage/userManagement/archivesDetail",
    component: () => import("@/views/supplierManage/userManagement/ArchivesDetail.vue"),
    meta: {
      title: "供应商档案",
      keepAlive: false,
      hideInMenu: true,
      parent: {
        title: "档案管理",
        path: "/supplierManage/userManagement"
      }
    }
  }]
},
// 待办中心
{
  path: "/todoCenter",
  name: "todoCenter",
  meta: {
    title: "待办中心",
    icon: "wait",
    keepAlive: true
  },
  component: () => import("@/views/todolistCenter/Tode.vue")
},
// 待办中心-处理详情页
{
  path: "/todoCenter/detail",
  name: "todoCenter/detail",
  meta: {
    title: "待办中心详情",
    icon: "menu-org",
    hideInMenu: true,
    keepAlive: true,
    parent: {
      title: "待办中心",
      path: "/todoCenter"
    }
  },
  component: () => import("@/views/todolistCenter/materialCertify/TodeDetail.vue")
},
// 待办中心-审厂任务处理详情页
{
  path: "/todoCenter/factoryDetail",
  name: "todoCenter/factoryDetail",
  meta: {
    title: "审厂任务详情",
    icon: "menu-org",
    hideInMenu: true,
    keepAlive: true,
    parent: {
      title: "待办中心",
      path: "/todoCenter"
    }
  },
  component: () => import("@/views/supplierManage/entryManagement/developmentAccess/DevelopmentAccessDetail.vue")
}, {
  path: "/approvalCenter",
  name: "approvalCenter",
  meta: {
    title: "审批中心",
    icon: "menu-org",
    keepAlive: true
  },
  children: [{
    path: "/approvalCenter/mySubmission/head",
    name: "approvalCenter/mySubmission",
    component: () => import("@/views/approvalCenter/mySubmission/MySubmission.vue"),
    meta: {
      title: "我提交的",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/approvalCenter/myApproval/head",
    name: "approvalCenter/myApproval",
    component: () => import("@/views/approvalCenter/myApproval/MyApproval.vue"),
    meta: {
      title: "我审批的",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/approvalCenter/myApproval/quotaManageDetail",
    name: "approvalCenter/myApproval/quotaManageDetail",
    component: () => import("@/views/approvalCenter/myApproval/QuotaManageDetail.vue"),
    meta: {
      title: "详情",
      icon: "dashboard",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "我审批的",
        path: "/approvalCenter/myApproval/head"
      }
    },
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      if (from.path === "/approvalCenter/mySubmission/head" && to.meta.parent) {
        to.meta.parent.title = "我提交的";
        to.meta.parent.path = "/approvalCenter/mySubmission/head";
      } else if (from.path === "/approvalCenter/myApproval/head" && to.meta.parent) {
        to.meta.parent.title = "我审批的";
        to.meta.parent.path = "/approvalCenter/myApproval/head";
      }
    }
  }, {
    path: "/approvalCenter/myApproval/budgetRequestDetail",
    name: "approvalCenter/myApproval/budgetRequestDetail",
    component: () => import("@/views/approvalCenter/myApproval/BudgetRequestDetailUI.vue"),
    meta: {
      title: "详情",
      icon: "dashboard",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "我审批的",
        path: "/approvalCenter/myApproval/head"
      }
    },
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      if (from.path === "/approvalCenter/mySubmission/head" && to.meta.parent) {
        to.meta.parent.title = "我提交的";
        to.meta.parent.path = "/approvalCenter/mySubmission/head";
      } else if (from.path === "/approvalCenter/myApproval/head" && to.meta.parent) {
        to.meta.parent.title = "我审批的";
        to.meta.parent.path = "/approvalCenter/myApproval/head";
      }
    }
  }, {
    path: "/approvalCenter/myApproval/mallOrderDetail",
    name: "approvalCenter/myApproval/mallOrderDetail",
    component: () => import("@/views/approvalCenter/myApproval/MallOrderDetail.vue"),
    meta: {
      title: "详情",
      icon: "dashboard",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "我审批的",
        path: "/approvalCenter/myApproval/head"
      }
    },
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      if (from.path === "/approvalCenter/mySubmission/head" && to.meta.parent) {
        to.meta.parent.title = "我提交的";
        to.meta.parent.path = "/approvalCenter/mySubmission/head";
      } else if (from.path === "/approvalCenter/myApproval/head" && to.meta.parent) {
        to.meta.parent.title = "我审批的";
        to.meta.parent.path = "/approvalCenter/myApproval/head";
      }
    }
  }, {
    path: "/approvalCenter/myApproval/ExpansionAmount",
    name: "approvalCenter/myApproval/ExpansionAmount",
    component: () => import("@/views/approvalCenter/myApproval/ExpansionAmount.vue"),
    meta: {
      title: "详情",
      icon: "dashboard",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "我审批的",
        path: "/approvalCenter/myApproval/head"
      }
    },
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      if (from.path === "/approvalCenter/mySubmission/head" && to.meta.parent) {
        to.meta.parent.title = "我提交的";
        to.meta.parent.path = "/approvalCenter/mySubmission/head";
      } else if (from.path === "/approvalCenter/myApproval/head" && to.meta.parent) {
        to.meta.parent.title = "我审批的";
        to.meta.parent.path = "/approvalCenter/myApproval/head";
      }
    }
  }]
},
// 系统设置
{
  path: "/systemSettings",
  name: "systemSettings",
  meta: {
    title: "系统设置",
    icon: "menu-org",
    keepAlive: true
  },
  children: [{
    path: "/systemSettings/menuManage",
    name: "systemSettings/menuManage",
    component: () => import("@/views/systemSettings/menuManage/MenuManage.vue"),
    meta: {
      title: "菜单管理",
      keepAlive: true
    }
  },
  // 接口补偿
  {
    path: "/systemSettings/dataDispatch/interfaceCompensation",
    name: "systemSettings/dataDispatch/interfaceCompensation",
    component: () => import("@/views/systemSettings/dataDispatch/InterfaceCompensation.vue"),
    meta: {
      title: "接口补偿",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/systemSettings/database",
    name: "systemSettings/database",
    meta: {
      title: "数据库",
      keepAlive: true
    },
    children: [
    // 送货仓库表
    {
      path: "/systemSettings/database/deliverWarehouseManage",
      name: "systemSettings/database/deliverWarehouseManage",
      component: () => import("@/views/systemSettings/database/DeliveryWarehouseTable.vue"),
      meta: {
        title: "送货仓库管理",
        icon: "dashboard",
        keepAlive: true
      }
    }]
  }, {
    path: "/systemSettings/processEngine",
    name: "systemSettings/processEngine",
    meta: {
      title: "流程引擎",
      keepAlive: true
    },
    children: [{
      path: "/systemSettings/processEngine/ProcessModel",
      name: "systemSettings/processEngine/ProcessModel",
      component: () => import("@/views/systemManage/ProcessModel.vue"),
      meta: {
        title: "流程模型",
        keepAlive: true
      }
    }, {
      path: "/systemSettings/processEngine/ProcessManage",
      name: "systemSettings/processEngine/ProcessManage",
      component: () => import("@/views/systemManage/ProcessManage.vue"),
      meta: {
        title: "流程管理",
        keepAlive: true
      }
    }, {
      path: "/systemSettings/processEngine/processDesign",
      name: "systemSettings/processEngine/processDesign",
      component: () => import("@/views/systemManage/ProcessDesign.vue"),
      meta: {
        title: "流程设计",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "流程管理",
          path: "/systemSettings/processEngine/ProcessManage"
        }
      }
    }]
  }, {
    path: "/systemSettings/operationLog",
    name: "systemSettings/operationLog",
    component: () => import("@/views/systemSettings/operationLog/operationLog.vue"),
    meta: {
      title: "操作日志",
      keepAlive: true
    }
  }]
},
// 业务配置
{
  path: "/businessConfig",
  name: "businessConfig",
  meta: {
    title: "业务配置",
    icon: "menu-org",
    keepAlive: true
  },
  children: [{
    path: "/businessConfig/tagsManage",
    name: "businessConfig/tagsManage",
    component: () => import("@/views/businessConfig/tagsManage/TagsManage.vue"),
    meta: {
      title: "标签管理",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/businessConfig/ShortageConfigPage",
    name: "businessConfig/ShortageConfigPage",
    component: () => import("@/views/businessConfig/algorithmManagement/ShortageConfigPage.vue"),
    meta: {
      title: "短缺配置方案",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/businessConfig/addShortageConfig",
    name: "businessConfig/addShortageConfig",
    component: () => import("@/views/businessConfig/algorithmManagement/AddShortageConfig.vue"),
    meta: {
      title: "新增短缺配置方案",
      icon: "dashboard",
      keepAlive: false,
      hideInMenu: true
    }
  }, {
    path: "/businessConfig/editShortageConfig",
    name: "businessConfig/editShortageConfig",
    component: () => import("@/views/businessConfig/algorithmManagement/EditShortageConfig.vue"),
    meta: {
      title: "编辑短缺配置方案",
      icon: "dashboard",
      keepAlive: false,
      hideInMenu: true
    }
  }, {
    path: "/businessConfig/detailShortageConfig",
    name: "businessConfig/detailShortageConfig",
    component: () => import("@/views/businessConfig/algorithmManagement/DetailShortageConfig.vue"),
    meta: {
      title: "短缺配置方案详情",
      icon: "dashboard",
      keepAlive: false,
      hideInMenu: true
    }
  }, {
    path: "/businessConfig/materialCertificationLink",
    name: "businessConfig/materialCertificationLink",
    component: () => import("@/views/businessConfig/materialCertificationLink/MaterialCertificationLink.vue"),
    meta: {
      title: "物料认证链路",
      keepAlive: true,
      access: []
    }
  }, {
    path: "/businessConfig/materialCertificationLink/historyTable",
    name: "businessConfig/materialCertificationLink/historyTable",
    component: () => import("@/views/businessConfig/materialCertificationLink/HistoryTable.vue"),
    meta: {
      title: "历史版本",
      keepAlive: false,
      hideInMenu: true,
      parent: {
        title: "物料认证链路",
        path: "/businessConfig/materialCertificationLink"
      }
    }
  }, {
    path: "/businessConfig/materialCertificationLink/creat",
    name: "businessConfig/materialCertificationLink/creat",
    component: () => import("@/views/businessConfig/materialCertificationLink/ViewOrEdit.vue"),
    meta: {
      title: "创建链路配置",
      keepAlive: false,
      hideInMenu: true,
      parent: {
        title: "物料认证链路",
        path: "/businessConfig/materialCertificationLink"
      }
    }
  }, {
    path: "/businessConfig/materialCertificationLink/viewOrEdit",
    name: "businessConfig/materialCertificationLink/viewOrEdit",
    component: () => import("@/views/businessConfig/materialCertificationLink/ViewOrEdit.vue"),
    meta: {
      title: "编辑链路配置",
      keepAlive: false,
      hideInMenu: true,
      parent: {
        title: "物料认证链路",
        path: "/businessConfig/materialCertificationLink"
      }
    }
  }, {
    path: "/businessConfig/materialCertificationLink/viewDetail",
    name: "businessConfig/materialCertificationLink/viewDetail",
    component: () => import("@/views/businessConfig/materialCertificationLink/ViewDetail.vue"),
    meta: {
      title: "链路配置详情",
      keepAlive: false,
      hideInMenu: true,
      parent: {
        title: "物料认证链路",
        path: "/businessConfig/MaterialCertificationLink"
      }
    }
  }, {
    path: "/businessConfig/priceManagement",
    name: "businessConfig/priceManagement",
    meta: {
      title: "价格管理配置",
      keepAlive: true
    },
    children: [
    // 询价配置
    {
      path: "/businessConfig/priceManagement/InquiryConfig",
      name: "businessConfig/priceManagement/InquiryConfig",
      component: () => import("@/views/businessConfig/priceManagement/InquiryConfig/PriceManagement.vue"),
      meta: {
        title: "询价配置",
        icon: "dashboard",
        keepAlive: true
      }
    },
    // 价格管理-新增
    {
      path: "/businessConfig/priceManagement/InquiryConfig/add",
      name: "businessConfig/priceManagement/InquiryConfig/add",
      component: () => import("@/views/businessConfig/priceManagement/InquiryConfig/PriceConfigAdd.vue"),
      meta: {
        title: "价格管理新增",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true
      }
    },
    // 价格管理-详情
    {
      path: "/businessConfig/priceManagement/InquiryConfig/detail",
      name: "businessConfig/priceManagement/InquiryConfig/detail",
      component: () => import("@/views/businessConfig/priceManagement/InquiryConfig/PriceConfigDetail.vue"),
      meta: {
        title: "价格任务详情",
        icon: "dashboard",
        keepAlive: true,
        hideInMenu: true
      }
    },
    //价格构成
    {
      path: "/businessConfig/priceManagement/priceStructure",
      name: "businessConfig/priceManagement/priceStructure",
      component: () => import("@/views/businessConfig/priceManagement/priceStructure/index.vue"),
      meta: {
        title: "价格构成",
        icon: "dashboard",
        keepAlive: true
      }
    },
    //核价配置
    {
      path: "/businessConfig/priceManagement/verifyPriceConfig",
      name: "businessConfig/priceManagement/verifyPriceConfig",
      component: () => import("@/views/businessConfig/priceManagement/verifyPriceConfig/index.vue"),
      meta: {
        title: "核价配置",
        icon: "dashboard",
        keepAlive: true
      }
    }]
  }, {
    path: "/materialCenter/modelSettingList",
    name: "materialCenter/modelSettingList",
    component: () => import("@/views/materialCenter/modelSetting/modelSettingList.vue"),
    meta: {
      title: "生产物料模板",
      icon: "dashboard",
      keepAlive: true
    }
  }, {
    path: "/materialCenter/modelSettingAdd",
    name: "materialCenter/modelSettingAdd",
    component: () => import("@/views/materialCenter/modelSetting/modelSettingAdd.vue"),
    meta: {
      title: "新增物料模板",
      icon: "dashboard",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "生产物料模板",
        path: "/materialCenter/modelSettingList"
      }
    }
  }, {
    path: "/materialCenter/modelSettingDetail",
    name: "materialCenter/modelSettingDetail",
    component: () => import("@/views/materialCenter/modelSetting/modelSettingDetail.vue"),
    meta: {
      title: "查看生产物料模板",
      icon: "dashboard",
      keepAlive: true,
      hideInMenu: true,
      parent: {
        title: "生产物料模板",
        path: "/materialCenter/modelSettingList"
      }
    }
  },
  // {
  //   path: '/businessConfig/nonProductionMaterialTemplate',
  //   name: 'businessConfig/nonProductionMaterialTemplate',
  //   component: () => import('@/views/businessConfig/NonProductionMaterialTemplate/index.vue'),
  //   meta: {
  //     title: '非生产物料模板',
  //     icon: 'dashboard',
  //     keepAlive: true
  //   }
  // },
  {
    path: "/businessConfig/computeManage",
    name: "businessConfig/computeManage",
    meta: {
      title: "计算管理",
      keepAlive: true
    },
    children: [{
      path: "/businessConfig/computeManage/computeTemplate",
      name: "businessConfig/computeManage/computeTemplate",
      component: () => import("@/views/businessConfig/computeManage/computeTemplate/ComputeTemplate.vue"),
      meta: {
        title: "计算模板",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/businessConfig/computeManage/CreatTemplate",
      name: "businessConfig/computeManage/CreatTemplate",
      component: () => import("@/views/businessConfig/computeManage/computeTemplate/CreatTemplate.vue"),
      meta: {
        title: "创建计算模板",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "计算模板",
          path: "/businessConfig/computeManage/computeTemplate"
        }
      }
    }, {
      path: "/businessConfig/computeManage/ViewTemplate",
      name: "businessConfig/computeManage/ViewTemplate",
      component: () => import("@/views/businessConfig/computeManage/computeTemplate/ViewTemplate.vue"),
      meta: {
        title: "查看计算模板",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "计算模板",
          path: "/businessConfig/computeManage/computeTemplate"
        }
      }
    }, {
      path: "/businessConfig/computeManage/EditTemplate",
      name: "businessConfig/computeManage/EditTemplate",
      component: () => import("@/views/businessConfig/computeManage/computeTemplate/EditTemplate.vue"),
      meta: {
        title: "编辑计算模板",
        keepAlive: false,
        hideInMenu: true,
        parent: {
          title: "计算模板",
          path: "/businessConfig/computeManage/computeTemplate"
        }
      }
    }, {
      path: "/businessConfig/computeManage/supplierScoreboard",
      name: "businessConfig/computeManage/supplierScoreboard",
      component: () => import("@/views/businessConfig/computeManage/supplierScoreboard/SupplierScoreboardList.vue"),
      meta: {
        title: "供应商计分板",
        icon: "dashboard",
        keepAlive: true
      }
    }, {
      path: "/businessConfig/computeManage/materialCollection",
      name: "businessConfig/computeManage/materialCollection",
      component: () => import("@/views/businessConfig/computeManage/materialCollection/MaterialCollectionList.vue"),
      meta: {
        title: "物料集合",
        icon: "dashboard",
        keepAlive: false
      }
    }, {
      path: "/businessConfig/computeManage/materialCollection/add",
      name: "businessConfig/computeManage/materialCollection/add",
      component: () => import("@/views/businessConfig/computeManage/materialCollection/MaterialCollectionAdd.vue"),
      meta: {
        title: "物料集合新增",
        hideInMenu: true,
        keepAlive: false,
        parent: {
          title: "物料集合",
          path: "/businessConfig/computeManage/materialCollection"
        }
      }
    }, {
      path: "/businessConfig/computeManage/materialCollection/edit",
      name: "businessConfig/computeManage/materialCollection/edit",
      component: () => import("@/views/businessConfig/computeManage/materialCollection/MaterialCollectionAdd.vue"),
      meta: {
        title: "物料集合编辑",
        hideInMenu: true,
        keepAlive: false
      }
    }, {
      path: "/businessConfig/computeManage/materialCollection/detail",
      name: "businessConfig/computeManage/materialCollection/detail",
      component: () => import("@/views/businessConfig/computeManage/materialCollection/MaterialCollectionAdd.vue"),
      meta: {
        title: "物料集合详情",
        hideInMenu: true
      }
    }, {
      path: "/businessConfig/orderAllocationRule/allocationRulePage",
      name: "businessConfig/orderAllocationRule/allocationRulePage",
      component: () => import("@/views/businessConfig/orderAllocationRule/AllocationRulePage.vue"),
      meta: {
        title: "采购订单规则配置",
        keepAlive: true
      }
    }, {
      path: "/businessConfig/orderAllocationRule/addAllocationRule",
      name: "businessConfig/orderAllocationRule/addAllocationRule",
      component: () => import("@/views/businessConfig/orderAllocationRule/AddAllocationRule.vue"),
      meta: {
        title: "新增方案",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "采购订单规则配置",
          path: "/businessConfig/orderAllocationRule/allocationRulePage"
        }
      }
    }, {
      path: "/businessConfig/orderAllocationRule/allocationRuleDetail",
      name: "businessConfig/orderAllocationRule/allocationRuleDetail",
      component: () => import("@/views/businessConfig/orderAllocationRule/AllocationRuleDetail.vue"),
      meta: {
        title: "配置详情",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "采购订单规则配置",
          path: "/businessConfig/orderAllocationRule/allocationRulePage"
        }
      }
    }, {
      path: "/businessConfig/orderAllocationRule/editAllocationRule",
      name: "businessConfig/orderAllocationRule/editAllocationRule",
      component: () => import("@/views/businessConfig/orderAllocationRule/AddAllocationRule.vue"),
      meta: {
        title: "修改规则配置",
        keepAlive: true,
        hideInMenu: true,
        parent: {
          title: "采购订单规则配置",
          path: "/businessConfig/orderAllocationRule/allocationRulePage"
        }
      }
    }]
  }]
}
// {
//   path: '/personalCenter',
//   name: 'personalCenter',
//   meta: {
//     title: '个人中心',
//     icon: 'menu-org',
//     keepAlive: true
//   },
//   component: () => import('@/views/personalCenter/personalCenter.vue')
// }
, {
  name: "1",
  path: "1",
  component: "() => import('1.vue')",
  meta: {
    title: "13",
    keepAlive: true
  }
}, {
  name: "1",
  path: "1",
  component: "() => import('1')",
  meta: {
    title: "1",
    keepAlive: true
  }
}, {
  name: "1",
  path: "1",
  component: "() => import('1')",
  meta: {
    title: "1",
    keepAlive: true
  }
}, {
  name: "1",
  path: "1",
  component: "() => import('1')",
  meta: {
    title: "1",
    keepAlive: true
  }
}, {
  name: "1",
  path: "1",
  component: "() => import('data/data.vue')",
  meta: {
    title: "123",
    keepAlive: true
  }
}];