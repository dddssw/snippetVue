import { checkbox, input, number, confirm, select } from "@inquirer/prompts";
import chalk from "chalk";
import { execa } from "execa";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const elComponents = [
  { name: "el-input 输入框", value: "el-input" },
  { name: "el-select 选择框", value: "el-select" },
  { name: "el-radio-group 单选框", value: "el-radio-group" },
  { name: "el-checkbox-group 多选框", value: "el-checkbox-group" },
  { name: "el-switch 切换开关", value: "el-switch" },
  { name: "el-dialog 弹窗", value: "el-dialog" },
  { name: "el-form 表单", value: "el-form" },
  { name: "el-form-item", value: "el-form-item" },
  { name: "el-table 列表", value: "el-table" },
  { name: "el-table-column", value: "el-table-column" },
];
function getOrder() {
  const packagePath = path.join(
    fileURLToPath(import.meta.url),
    "../../../",
    "package.json"
  );
  let packageJson;
  let order;
  if (fs.existsSync(packagePath)) {
    packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
  }
  order = Object.keys(packageJson.bin)[0];
  return order;
}
export default elComponents;
const inputChoices = [
  {
    name: "v-model",
    value: "v-model",
  },
  {
    name: "placeholder",
    value: "placeholder",
  },
  {
    name: "maxlength",
    value: "maxlength",
  },
  {
    name: "disabled",
    value: "disabled",
  },
  {
    name: "clearable ",
    value: "clearable ",
  },
  {
    name: "@input",
    value: "@input",
  },
  {
    name: "@keydown.enter",
    value: "@keydown.enter",
  },
];
const selectChoices = [
  {
    name: "v-model",
    value: "v-model",
  },
  {
    name: "filterable",
    value: "filterable",
  },
  {
    name: "multiple",
    value: "multiple",
  },
  {
    name: "collapse-tags",
    value: "collapse-tags",
  },
  {
    name: "collapse-tags-tooltip",
    value: "collapse-tags-tooltip",
  },
  {
    name: "max-collapse-tags",
    value: "max-collapse-tags",
  },
  {
    name: "clearable ",
    value: "clearable ",
  },
  {
    name: "@change",
    value: "@change",
  },
];
const radioGroupChoices = [
  {
    name: "v-model",
    value: "v-model",
  },
  {
    name: "@change",
    value: "@change",
  },
];
const checkboxGroupChoices = [
  {
    name: "v-model",
    value: "v-model",
  },
  {
    name: "@change",
    value: "@change",
  },
];
const switchChoices = [
  {
    name: "v-model",
    value: "v-model",
  },
  {
    name: "inline-prompt",
    value: "inline-prompt",
  },
  {
    name: "active-text",
    value: "active-text",
  },
  {
    name: "inactive-text",
    value: "inactive-text",
  },
  {
    name: "style",
    value: "switchStyle",
  },
  {
    name: "before-change",
    value: "before-change",
  },
];
const formChoices = [
  {
    name: ":model",
    value: ":model",
  },
  {
    name: "ref",
    value: "ref",
  },
  {
    name: "inline 一个el-form-item不再单独占据一行",
    value: "inline",
  },
  {
    name: "label-position 标签的位置（left/right/top），也可以单独给el-form-item设置",
    value: "label-position",
  },
  {
    name: "rules 校验规则 trigger中blur代表失去焦点，change代表修改数据",
    value: "rules",
  },
];
const formItemChoices = [
  {
    name: "label",
    value: "label",
  },
  {
    name: "label-width",
    value: "label-width",
  },
  {
    name: "required 是否为必填项",
    value: "required",
  },
  {
    name: "show-message 是否显示校验错误信息",
    value: "show-message",
  },
  {
    name: "rules el-form上可以设置，如果校验的是数组在这上面设置",
    value: "rules",
  },
];
const dialogChoices = [
  {
    name: "v-model",
    value: "v-model",
  },
  {
    value: "title",
    name: "title 弹窗名",
  },
  {
    value: "width",
    name: "width 弹窗宽度",
  },
  {
    value: "close-on-click-modal",
    name: "close-on-click-modal 是否可以通过点击 modal 关闭 Dialog",
  },
  {
    name: "center 使标题head和底部footer居中",
    value: "center",
  },
  {
    name: "align-center 使对话框水平垂直居中。所以top属性将不起作用",
    value: "align-center",
  },
  {
    name: "@close 弹窗关闭的回调",
    value: "@close",
  },
  {
    value: ":before-close",
    name: ":before-close 绑定一个函数，关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候.(done)=>{done()}",
  },
];
const tableChoices = [
  { name: "ref", value: "ref" },
  { value: ":data", name: ":data 数据源" },
  {
    value: "show-overflow-tooltip",
    name: "show-overflow-tooltip 超出悬浮展示全部",
  },
  {
    value: ":row-style",
    name: "row-style 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。函数参数是row",
  },
  {
    value: ":row-class-name",
    name: "row-class-name 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。函数参数是row",
  },
  {
    value: ":default-sort",
    name: "default-sort 设置默认的排序列和排序顺序",
  },
  {
    value: "@row-click",
    name: "@row-click 点击某一行触发，参数是这一行的数据",
  },
  {
    value: "@sort-change",
    name: "@sort-change 后端排序，表格的排序条件发生变化的时候会触发该事件",
  },
  {
    value: "@select",
    name: "@select 多选时手动勾选数据行的 Checkbox 时触发的事件",
  },
  {
    value: "@select-all",
    name: "@select-all 多选时勾选全选 Checkbox 时触发的事件",
  },
];
const tableColumnChoices = [
  {
    name: "是否需要默认插槽",
    value: "defaultSlot",
  },
  {
    name: "prop",
    value: "prop",
  },
  {
    name: "label",
    value: "label",
  },
  {
    name: "width",
    value: "width",
  },
  {
    name: "sortable  如果需要后端排序，需将 sortable 设置为 custom，同时在 Table 上监听 sort-change 事件",
    value: "sortable",
  },
];
const functionTemplate = {
  "@select": `{
  let selected = selection.length && selection.indexOf(row) !== -1 // true就是选中，0或者false是取消选中
}`,
  "@select-all": `{
  const isSelectAll = multipleTableRef.value.store.states.isAllSelected// isSelectAll为true就是全选，false是全不选
}`,
};
function generFunction(key, value) {
  return `function ${value}${functionTemplate[key]}`;
}
//要修改的对象，子组件名，父组件名是否有group el-select el-checkbox el-radio
async function configureGroupItem(data, name, group = true) {
  console.log(
    chalk.blue(
      `-------------------------开始配置${name}---------------------------`
    )
  );
  let options: { label: string; value: any }[] | string = await input({
    message: "输入数组[{label:xx,value:xx}]或者一个响应式数据",
  });
  if (options.trim().startsWith("[")) {
    //为属性加上双引号
    options = options.replace(/(\w+)(:)/g, '"$1"$2');
    //然后为所有非数字的值加双引号
    options = JSON.parse(
      options.replace(/:([a-zA-Z_]\w*)/g, (match, value) => {
        if (
          /^\d+(\.\d+)?$/.test(value) ||
          value === "true" ||
          value === "false"
        ) {
          return `:${value}`; // 数字或布尔值不加双引号
        }
        return `:"${value}"`; // 其他非数字和非布尔值加双引号
      })
    );
    let optionsTemplate = "";
    for (let i = 0; i < options.length; i++) {
      const cur = options[i] as {
        label: string;
        value: any;
      };
      optionsTemplate += `<${name} label="${cur.label}" ${
        typeof cur.value === "number" || typeof cur.value === "boolean"
          ? ":"
          : ""
      }value="${cur.value}" />`;
      if (i !== options.length - 1) {
        optionsTemplate += "\n";
      }
    }
    data.template = `<${name === "el-option" ? "el-select" : name}${
      group ? "-group" : ""
    }
     ${data.attributes}>
     ${optionsTemplate}
     </${name === "el-option" ? "el-select" : name}${group ? "-group" : ""}>`;
    return data;
  } else {
    data.modelValue.push(`const ${options} = ref()`);
    let label = await input({
      message: "输入label对应的字段名",
      default: "label",
    });
    let value = await input({
      message: "输入value对应的字段名",
      default: "value",
    });
    const optionsTemplate = `<${name}
      v-for="{${label},${value}} in ${options}"
      :key="${value}"
      :label="${label}"
      :value="${value}"
    />`;
    data.template = `<${name === "el-option" ? "el-select" : name}${
      group ? "-group" : ""
    } 
     ${data.attributes}
     >
     ${optionsTemplate}
     </${name === "el-option" ? "el-select" : name}${group ? "-group" : ""}>`;
    return data;
  }
}
async function configureComponent(name, choices) {
  console.log(
    chalk.blue(
      `-------------------------开始配置${name}---------------------------`
    )
  );
  const showList = await checkbox({
    message: "选择属性（Attribute）",
    choices,
    loop: false,
    pageSize: choices.length,
  });
  let res = {};
  for (let i = 0; i < showList.length; i++) {
    const cur = showList[i] as string;
    if (dealAttr[cur]) {
      res[cur] = await dealAttr[cur]();
    } else {
      res[cur] = true;
    }
  }
  return res;
}
function attrAnalyse(res): any {
  let attributes = "";
  let modelValue = [];
  let functionValue = [];

  Object.entries(res).forEach(([key, value], index, array) => {
    if (key === "defaultSlot") {
      return;
    }
    if (
      (key === "v-model" ||
        key === ":model" ||
        key === ":data" ||
        key === "ref") &&
      !(value as string).includes(".")
    ) {
      modelValue.push(`const ${value} = ref()`);
    }
    if (key.startsWith("@")) {
      if (key in functionTemplate) {
        functionValue.push(generFunction(key, value));
      } else {
        functionValue.push(`function ${value} {
        ${
          key === "@sort-change"
            ? ` console.log(column)
  if (column.prop === 'modifyTime') {
    if (!column.order) {
     
    } else {

    }
  }`
            : ""
        }
            }`);
      }
      attributes += `${key}="${(value as string).replace(/\([^\)]*\)/g, "")}"`;
      return;
    }
    if (typeof value === "boolean" && value) {
      attributes += `${key}`;
    } else {
      attributes += `${
        typeof value === "number" || typeof value === "boolean" ? ":" : ""
      }${key}="${value}"`;
    }
    // 如果不是最后一个属性，添加换行符
    if (index !== array.length - 1) {
      attributes += "\n";
    }
  });
  return { attributes, modelValue, functionValue };
}
export const operate = {
  "el-input": async () => {
    const res = await configureComponent("el-input", inputChoices);
    const data = attrAnalyse(res);
    data.template = `<el-input 
     ${data.attributes}
     ><el-input />`;
    return data;
  },
  "el-switch": async () => {
    const res = await configureComponent("el-switch", switchChoices);
    const data = attrAnalyse(res);
    data.template = `<el-switch 
     ${data.attributes}
     ><el-switch />`;
    return data;
  },
  "el-dialog": async () => {
    const res = await configureComponent("el-dialog", dialogChoices);
    const data = attrAnalyse(res);
    data.template = `<el-dialog 
     ${data.attributes}
     >
      <template #footer>
      <div>
        <el-button @click="">取消</el-button>
        <el-button type="primary" @click="">
          确定
        </el-button>
      </div>
    </template>
     <el-dialog />`;
    return data;
  },
  "el-select": async () => {
    const res = await configureComponent("el-select", selectChoices);
    const data = attrAnalyse(res);
    await configureGroupItem(data, "el-option", false);
    return data;
  },
  "el-radio-group": async () => {
    const res = await configureComponent("el-radio-group", radioGroupChoices);
    const data = attrAnalyse(res);
    await configureGroupItem(data, "el-radio");
    return data;
  },
  "el-checkbox-group": async () => {
    const type = await select({
      message: "是否需要带全选",
      choices: [
        {
          name: "yes",
          value: true,
        },
        {
          name: "no",
          value: false,
        },
      ],
    });
    if (type) {
      let sourceData = await input({
        message: "输入循环的源数据",
        default: "",
      });
      let model = await input({
        message: "输入checkbox-group v-model的数据",
        default: "",
      });
      let label = await input({
        message: "输入label对应的字段名",
        default: "label",
      });
      let value = await input({
        message: "输入value对应的字段名",
        default: "value",
      });
      return {
        template: ` <el-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    全部
  </el-checkbox>
  <el-checkbox-group
    v-model="${model}"
    @change="handleCheckedCitiesChange"
  >
    <el-checkbox v-for="{${label},${value}} in ${sourceData}" :key="${label}" :label="${label}" :value="${value}">
      {{ ${label} }}
    </el-checkbox>
  </el-checkbox-group>`,
        modelValue: [
          "const checkAll = ref(false)",
          "const isIndeterminate = ref(false)",
          `const ${sourceData} = ref([])`,
          `const ${model} = ref([])`,
        ],
        functionValue: [
          `function handleCheckAllChange (val: boolean) {
  ${model}.value = val ? ${sourceData} : []
  isIndeterminate.value = false
}`,
          `function handleCheckedDataChange (value) {
  const checkedCount = value.length
  checkAll.value = checkedCount === ${sourceData}.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < ${sourceData}.length
}`,
        ],
      };
    } else {
      const res = await configureComponent(
        "el-checkbox-group",
        checkboxGroupChoices
      );
      const data = attrAnalyse(res);
      await configureGroupItem(data, "el-checkbox");
      return data;
    }
  },
  "el-form": async () => {
    const res = await configureComponent("el-form", formChoices);
    const data = attrAnalyse(res);
    let itemData = [];
    while (true) {
      const cur = await operate["el-form-item"]();
      itemData.push(cur.template);
      const answer = await confirm({
        message: "是否添加下一个el-form-item？",
        default: true,
      });
      if (!answer) {
        break;
      }
    }
    const itemCode = itemData.map((item) => item).join("\n");
    data.template = `<el-form
     ${data.attributes}
     ${itemCode}
     ><el-form />`;
    if ("rules" in res) {
      const answer = await confirm({
        message:
          "是否需要自定义校验(接受参数rule,value(待校验的值),callback(new Error代表校验失败))",
        default: true,
      });
      if (!answer) {
        data.modelValue.push(`const rules = {
      name: [
        { required: true, message: '请输入', trigger: 'blur' },
          ]}`);
      } else {
        data.modelValue.push(`const rules = {
      name: [
        { required: true, message: '请输入', trigger: 'blur' },
          ],
           pass: [{ validator: validatePass, trigger: 'blur' }],
          }`);
        data.functionValue
          .push(`function validatePass(rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}`);
        data.functionValue
          .push(`function submitForm(formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
    }
  })
}`);
      }
    }
    return data;
  },
  "el-form-item": async () => {
    const res = await configureComponent("el-form-item", formItemChoices);
    const data = attrAnalyse(res);
    console.log(
      chalk.blue(
        `-------------------------开始配置el-form-item插槽---------------------------`
      )
    );
    //@ts-ignore
    await execa("node", ["bin/main.js", "el"], {
      stdio: "inherit",
    });
    let child = fs.readFileSync(
      path.join(dirname(fileURLToPath(import.meta.url)), "../../", "file.js")
    );
    let replace = child.toString().replace(/"/g, "");
    data.template = `<el-form-item  ${data.attributes}>
    ${replace}
    </el-form-item>`;
    data.template = data.template.replace(/\\n/g, "\n");
    return data;
  },
  "el-table": async () => {
    const res = await configureComponent("el-table", tableChoices);
    const data = attrAnalyse(res);
    let itemData = [];
    while (true) {
      const cur = await operate["el-table-column"]();
      itemData.push(cur.template);
      const answer = await confirm({
        message: "是否添加下一个el-table-column？",
        default: true,
      });
      if (!answer) {
        break;
      }
    }
    const needMulit = await confirm({
      message: "是否需要多选功能，可以通过multipleSelection知道选中了哪些数据",
      default: false,
    });
    const disabled = await confirm({ message: "是否选项需要禁用多选",default:false });
    if(needMulit){
        itemData.unshift(
          ` <el-table-column type="selection" width="55" ${disabled?':selectable="isDisabledSelect}"':''} />`
        );
        if(disabled){
            data.functionValue.push(`function isDisabledSelect(row) {
  if (row.status === 10) {
    return true
  }
}`);
        }
        data.modelValue.push(`const multipleSelection = ref([])`);
         data.functionValue.push(`function handleSelectionChange(val) {
  multipleSelection.value = val
}`);
    }
    const itemCode = itemData.map((item) => item).join("\n");
    data.template = `<el-table
     ${needMulit?'@selection-change="handleSelectionChange"':''}${data.attributes}
     ${itemCode}
     ><el-table />`;
    return data;
  },
  "el-table-column": async () => {
    const res = await configureComponent("el-table-column", tableColumnChoices);
    const data = attrAnalyse(res);
    if ("defaultSlot" in res) {
      data.template = `<el-table-column 
     ${data.attributes}>
      <template #default="{ row }">
       
        </template>
        </el-table-column>
     `;
    } else {
      data.template = `<el-table-column ${data.attributes} />`;
    }
    return data;
  },
};
const dealAttr = {
  "v-model": async () => {
    return await input({
      message: "输入v-model绑定的响应式数据",
      required: true,
    });
  },
  ":model": async () => {
    return await input({
      message: "输入:model绑定的响应式数据",
      required: true,
    });
  },
  ref: async () => {
    return await input({
      message: "输入ref的响应式数据",
      required: true,
    });
  },
  placeholder: async () => {
    return await input({ message: "输入placeholder", default: "请输入" });
  },
  label: async () => {
    return await input({ message: "输入label" });
  },
  prop: async () => {
    return await input({ message: "输入prop" });
  },
  rules: async () => {
    return await input({ message: "输入rules表单校验规则", default: "rules" });
  },
  width: async () => {
    return await input({ message: "输入width" });
  },
  title: async () => {
    return await input({ message: "输入title" });
  },
  "label-width": async () => {
    return await input({ message: "输入label-width", default: "auto" });
  },
  ":before-close": async () => {
    return await input({ message: "输入:before-close的回调函数" });
  },
  "active-text": async () => {
    return await input({ message: "输入开启展示的文本", default: "已启用" });
  },
  "inactive-text": async () => {
    return await input({ message: "输入关闭展示的文本", default: "已禁用" });
  },
  switchStyle: async () => {
    return await input({
      message: "switch开关的颜色",
      default: "--el-switch-on-color: #45af2e; --el-switch-off-color: #bcbcbc",
    });
  },
  clearable: async () => {
    return await confirm({ message: "clearable" });
  },
  multiple: async () => {
    return await confirm({ message: "是非多选multiple" });
  },
  "collapse-tags": async () => {
    return await confirm({ message: "折叠标签，多余的会放在一个格子里" });
  },
  "collapse-tags-tooltip": async () => {
    return await confirm({ message: "鼠标悬停折叠文字以显示具体所选值" });
  },
  "max-collapse-tags": async () => {
    return await number({
      message:
        "需要显示的 Tag 的最大数量 只有当 collapse-tags 设置为 true 时才会生效。",
    });
  },
  filterable: async () => {
    return await confirm({ message: "是否可筛选filterable" });
  },
  "inline-prompt": async () => {
    return await confirm({ message: "图标是否在switch内部" });
  },
  "close-on-click-modal": async () => {
    return false;
  },
  "before-change": async () => {
    return await input({
      message:
        "设置beforeChange属性，若返回 false 或者返回 Promise 且被 reject，则停止切换。注意这里一般需要一个函数",
    });
  },
  maxlength: async () => {
    return await input({ message: "输入maxlength", default: "100" });
  },
  ":row-style": async () => {
    return await input({ message: "输入:row-style", default: "{height:60px}" });
  },
  ":row-class-name": async () => {
    return await input({
      message: "输入row-class-name",
      default: "tableRowClassName",
    });
  },
  ":default-sort": async () => {
    return await input({
      message: "输入默认的排序",
      required: true,
      default: "{ prop: 'modifyTime', order: 'descending' }",
    });
  },
  "@sort-change": async () => {
    return await input({
      message: "输入后端排序函数",
      required: true,
      default: "handleSortChange",
    });
  },
  "@row-click": async () => {
    return await input({
      message: "输入点击某一行触发的事件",
      required: true,
      default: "rowClick",
    });
  },
  "@input": async () => {
    return await input({ message: "@input输入事件", required: true });
  },
  "@change": async () => {
    return await input({ message: "@change事件", required: true });
  },
  "@close": async () => {
    return await input({ message: "@close事件", required: true });
  },
  "@select": async () => {
    return await input({
      message: "@selct事件",
      required: true,
      default: "itemHandleSelectionChange(selection, row)",
    });
  },
  "@select-all": async () => {
    return await input({
      message: "@select-all事件",
      required: true,
      default: "handleSelectAll()",
    });
  },
  "@keydown.enter": async () => {
    return await input({
      message: "@keydown.enter点击回车触发的事件",
      required: true,
    });
  },
  "label-position": async () => {
    await select({
      message: "选择label-position",
      choices: [
        {
          name: "left",
          value: "left",
        },
        {
          name: "right",
          value: "right",
        },
        {
          name: "top",
          value: "top",
        },
      ],
    });
  },
};
