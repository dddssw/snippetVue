import { Command } from "commander";
import chalk from "chalk";
import { execa } from "execa";
import { highlightCode } from "./constant/printCode";
import {
  rawlist,
  input,
  checkbox,
  Separator,
  number,
  confirm,
  search,
} from "@inquirer/prompts";
import {
  getConfigure,
  writeRouter,
  createFile,
  pagePath,
  apiPath,
  tsDeclarationPath,
} from "./tools";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import type { ExportDefaultDeclaration } from "@babel/types";
import generate from "@babel/generator";
import { Node } from "babel__traverse";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const program = new Command();
import elComponents, { operate } from "./constant/component";
import { dirname } from "path";

/*
选择需要插入的位置（末尾）
多选：需要哪些字段，含children会进入递归

*/
program
  .command("addr")
  .description("路由表添加路由")
  .action(async (str, options) => {
    const ast = getConfigure();
    let data;
    traverse(ast as Node, {
      ExportDefaultDeclaration({ node }) {
        data = node as ExportDefaultDeclaration;
      },
    });
    const res = [data];
    if (!data) return;
    await helper(data.declaration, 1);
    console.log(
      chalk.blue("开始路由配置，请选择需要的配置项（多选），空格选中")
    );
    async function helper(node, index) {
      if (node.type === "ArrayExpression") {
        let choices = node.elements.map((item) => {
          const childrenIndex = item.properties.findIndex(
            (i) => i.key.name === "children"
          );
          const metaIndex = item.properties.findIndex(
            (i) => i.key.name === "meta"
          );
          const titleIndex = item.properties[
            metaIndex
          ].value.properties.findIndex((i) => i.key.name === "title");
          return {
            name: item.properties[metaIndex].value.properties[titleIndex].value
              .value,
            value: item.properties[childrenIndex],
          };
        });
        choices = choices.filter((item) => item.value);
        if (choices.length === 0) {
          return;
        }
        choices.unshift({ name: "new router", value: "new" });
        const answer = await rawlist({
          message: "选择目标层级" + index,
          choices,
        });
        res.push(answer);
        if (answer === "new") {
          return;
        }
        //@ts-ignore
        await helper(answer.value, index + 1);
      }
    }
    //新节点
    const pageSet = new Set();
    const arrLiteral = t.arrayExpression([]);
    const num = await number({
      message: "输入生成子节点数量",
      default: 1,
    });
    await gener(arrLiteral, num);
    //插入新节点
    if (res[res.length - 1] === "new") {
      //第一个node是导出的node不是数组node
      if (res[res.length - 2].type === "ExportDefaultDeclaration") {
        res[res.length - 2].declaration.elements = res[
          res.length - 2
        ].declaration.elements.concat(arrLiteral.elements);
      } else {
        res[res.length - 2].value.elements = res[
          res.length - 2
        ].value.elements.concat(arrLiteral.elements);
      }
    } else {
      res[res.length - 1].value.elements = res[
        res.length - 1
      ].value.elements.concat(arrLiteral.elements);
    }
    //写入code
    writeRouter(generate(ast).code);
    console.log(
      chalk.blue("-------------------------配置完成--------------------------")
    );
    console.log(
      chalk.blue(
        "-------------------------路由表已更新--------------------------"
      )
    );
    const packagePath = path.join(
      fileURLToPath(import.meta.url),
      "../../",
      "package.json"
    );
    let packageJson;
    let order;
    if (fs.existsSync(packagePath)) {
      packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
    }
    order = Object.keys(packageJson.bin)[0];
    if (pageSet.size !== 0) {
      await createComponentPage();
    }
    await createApiRequestPage();
    await createTsDeclarationPage();
    async function createComponentPage() {
      const needPage = await confirm({
        message: "是否需要创建组件页面?",
        default: true,
      });
      if (needPage) {
        //@ts-ignore
        await execa(order, ["addp", "-d", ...Array.from(pageSet)], {
          stdio: "inherit", // 将当前终端的输入、输出流继承给子进程
        });
      }
    }
    async function createApiRequestPage() {
      const needPage = await confirm({
        message: "是否需要api请求文件?",
        default: true,
      });
      if (needPage) {
        const pagePath = await input({
          message: "输入路由path",
          required: true,
        });
        await execa(order, ["addp", "-d", path.join(apiPath, pagePath)], {
          stdio: "inherit", // 将当前终端的输入、输出流继承给子进程
        });
      }
    }
    async function createTsDeclarationPage() {
      const needPage = await confirm({
        message: "是否需要ts声明文件?",
        default: true,
      });
      if (needPage) {
        const pagePath = await input({
          message: "输入路径path",
          required: true,
        });
        await execa(
          order,
          ["addp", "-d", path.join(tsDeclarationPath, pagePath)],
          {
            stdio: "inherit", // 将当前终端的输入、输出流继承给子进程
          }
        );
      }
    }
    function addAttr(objLiteral, name, value) {
      objLiteral.properties.push(t.objectProperty(t.identifier(name), value));
    }
    async function gener(taget, num = 0, level = 0) {
      if (t.isArrayExpression(taget)) {
        for (let i = 0; i < num; i++) {
          const obj = t.objectExpression([]);
          await processChild(obj, level, i);
          taget.elements.push(obj);
        }
      }
      // else {
      //   await processChild(taget, level);
      // }
    }

    async function processChild(objLiteral, level = 0, index = 1) {
      console.log(
        chalk.blue(
          `-------------------------正在配置第${level + 1}层的第${
            index + 1
          }个节点-------------------------`
        )
      );
      const showList = await checkbox({
        message: "-".repeat(level) + "选择子路由配置",
        choices: [
          { name: "path", value: "path", checked: true, disabled: "必填" },
          { name: "name", value: "name", checked: true, disabled: "必填" },
          new Separator(),
          { name: "component", value: "component" },
          { name: "meta", value: "meta", description: "路由元信息" },
          { name: "children", value: "children", description: "是否有子路由" },
          {
            name: "beforeEnter",
            value: "beforeEnter",
            description: "路由拦截器",
          },
        ],
      });
      const answers = {
        path: await input({ message: "输入路由path", required: true }),
        name: await input({ message: "输入路由name", required: true }),
      };
      addAttr(objLiteral, "name", t.stringLiteral(answers.name));
      addAttr(objLiteral, "path", t.stringLiteral(answers.path));
      for (let i = 0; i < showList.length; i++) {
        const params = showList[i];
        let res;
        if (params === "component") {
          res = await input({ message: "输入组件路径", required: true });
          pageSet.add(path.join(pagePath, res));
          addAttr(
            objLiteral,
            params,
            t.stringLiteral(`() => import('${res}')`)
          );
        } else if (params === "beforeEnter") {
          res = "beforeEnter: (to, from) => {}";
          addAttr(objLiteral, params, t.stringLiteral(res));
        } else if (params === "children") {
          const num = await number({
            message: "输入生成子节点数量",
            default: 1,
          });
          if (num === 0) {
            return;
          }
          const arrValue = t.arrayExpression([]);
          addAttr(objLiteral, "children", arrValue);
          await gener(arrValue, num, level + 1);
        } else if (params === "meta") {
          const metaObjLiteral = t.objectExpression([]);
          console.log(
            chalk.blue(
              "-------------------------------------------------------"
            )
          );
          const metaList = await checkbox({
            message: "-".repeat(level) + "选择meta配置",
            choices: [
              {
                name: "title",
                value: "title",
                checked: true,
                disabled: "必填",
              },
              {
                name: "keepAlive",
                value: "keepAlive",
                checked: true,
                disabled: "必填",
              },
              new Separator(),
              { name: "hideInMenu", value: "hideInMen" },
            ],
          });
          const answers = {
            title: await input({ message: "输入面包屑title", required: true }),
            keepAlive: await confirm({ message: "是否缓存?", default: true }),
          };
          console.log(
            chalk.blue(
              "-------------------------------------------------------"
            )
          );
          addAttr(metaObjLiteral, "title", t.stringLiteral(answers.title));
          addAttr(
            metaObjLiteral,
            "keepAlive",
            t.booleanLiteral(answers.keepAlive)
          );
          for (let i = 0; i < metaList.length; i++) {
            const params = showList[i];
            let res;
            if (params === "hideInMenu") {
              res = await confirm({
                message: "是否在侧边栏显示?",
                default: true,
              });
              addAttr(metaObjLiteral, "hideInMenu", t.booleanLiteral(res));
            }
          }
          addAttr(objLiteral, "meta", metaObjLiteral);
        }
      }
    }
  });
program
  .command("addp")
  .description("新增页面")
  .option("-d, --data [datas...]", "如果覆盖文件")
  .action((str, options) => {
    console.log(options);
    const pathArr = options.data;
    createFile(pathArr);
  });
program
  .command("el")
  .description("生成elementplus的组件模板")
  .action(async (str, options) => {
    const component = await search({
      message: "选择要生成的组件",
      pageSize: elComponents.length,
      source: async (input, { signal }) => {
        if (!input) {
          return elComponents;
        }
        signal;
        return elComponents.filter((item) => item.name.includes(input));
      },
    });
    const data = await operate[component]();
    console.log(data.template);
    fs.writeFileSync(path.join(dirname(fileURLToPath(import.meta.url)), "../", "file.js"), JSON.stringify(data.template), "utf-8");
    const filePath = path.join(process.cwd(), "tempTemplateData.js");
    fs.writeFileSync(filePath, JSON.stringify(data));
  });
program
  .command("info")
  .description("信息")
  .argument("<string>", "查询什么")
  .action(async (str, options) => {
    infoData[str]();
  });
const infoData = {
  tableexpose: async () => {
    const list = [
      "getSelectionRows 用于多选表格，返回当前选中的行数据,也可以监听select-change进行赋值",
      "toggleRowSelection 用于多选表格，切换某一行的选中状态，第一个参数是行数据（row），如果使用了第二个参数，则可直接设置这一行选中与否",
      "clearSelection 用于多选表格，清空用户的选择",
    ];
    consoleInfo(list, "el-table expose");
  },
  validTable: async () => {
    const list = [
      "table的源数据作为form :model绑定的一个属性",
      "在需要校验的组件外包裹el-form-item组件",
      `<el-form-item :prop="'tableData.' + index + '.name'" :rules="rules.name">`,
      `这里校验的是:model绑定数据下.tableData[index].name,所以组件也绑定这个值即可`,
      `<el-input v-model="row.name">`,
    ];
    consoleInfo(list, "el-form校验el-table");
  },
  debounce: () => {
    const codeSnippet = `
function debounce(func, duration) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(()=>{func.apply(this, args)}, duration);
  };
}
`;
    highlightCode(codeSnippet);
  },
  throttle: () => {
    const codeSnippet = `
function throttle(func, duration) {
  let wait = false;

  return function (...args) {
    if(!wait){
      wait = true
      func.apply(this,args)
      setTimeout(()=>{wait = false},duration)
    }
  };
}
`;
    highlightCode(codeSnippet);
  },
  "vue2/vue3": () => {
    const list = [
      "重构了响应式系统，性能优化，和Api的改进",
      "vue3使用了基于proxy的响应式系统，支持深度响应式和动态属性的监听",
      "引入了Composition api,使逻辑复用更加方便",
      "新增了fragment，teleport,suspense这样的内置组件",
      "使用ts进行重写，在idea中的代码提示效果更好",
      "在性能方面，优化了模板编译和diff算法，并且支持树摇，打包体积进一步缩小",
    ];
    consoleInfo(list, "vue3与vue2的不同");
  },
  "watch/watcheffect": () => {
    const list = [
      "都是用来监听响应式数据的变化，但使用场景不同",
      "watch需要显式指定依赖对象，监听多个数据需要用数组，并能提供新值和旧值",
      "watcheffect能自动收集所有依赖",
      "watch可以配置flush，deep,immediated,watcheffect只有flush，没有deep,immediated相当于是true",
      "如果只需要监听一个对象中的几个属性，使用watcheffect更好，因为它将只跟踪回调中使用到的属性，而不是递归的跟踪所有属性",
    ];
    consoleInfo(list, "watch watcheffect的区别");
  },
  "ref/reactive": () => {
    const list = [
      "都是用来创建响应式数据，但是使用场景有些不同",
      "reactive只能用于复杂数据类型，而ref更为通用，但是使用需要多写一个.value。",
      "并且需要注意ref有自动解包策略",
      "watch对ref reactive数据监听不同，如果是reactive，修改它的任何属性都会触发",
      "对应ref，默认情况下只会对.value的重新分配做出反应，但是可以使用deep让他监听所有的嵌套属性",
      "https://github.com/orgs/vuejs/discussions/9428(playground中有bug未解决)",
    ];
    consoleInfo(list, "ref reactive");
  },
  "watch/computed": () => {
    const list = [
      "watch是监听动作，computed是计算属性",
      "watch没缓存，只要监听的数据变化就执行。computed有缓存，只有响应式数据改变才会重新计算",
      "watch可以执行异步操作，computed不行",
      "watch常用于一个数据影响多个数据，而computer常用于多个数据影响一个数据",
    ];
    consoleInfo(list, "watch/computed 的区别");
  },
  "defineProperty/proxy": () => {
    const list = [
      "使用defineProperty是因为当时proxy兼容性不好",
      "defineProperty只能劫持对象属性的getter和setter，并且无法监听会修改原数组的数组方法，所以对这些方法就行重写",
      "proxy能直接劫持整个对象",
      "可以直接监听对象，数组的变化，并且拦截类型多达13种",
    ];
    consoleInfo(list, "defineProperty/proxy 的区别");
  },
  data: () => {
    const list = [
      "data是一个组件的状态，如果他是一个对象",
      "这个组件被多次引用，那么data将指向同一个地址，但是我们不需要状态共享",
      "所以通过函数返回一个新对象，把状态隔离",
    ];
    consoleInfo(list, "为什么data是一个函数");
  },
  cli: () => {
    const list = [
      "为了降低在项目寻找最佳实践的成本，用于代码生成和自动化,遵循了模块化，便于扩展的原则",
      "例如为input写了一个指令，于是我不得不前往其他文件里查找复制粘贴进来",
    ];
    consoleInfo(list, "背景");
    const list1 = [
      "新增模块需要在路由表进行注册然后新建文件，通过脚手架命令把这个步骤自动化",
      "首先使用babel/parse路由表进行分析，解析出它的层级关系，在通过inquery的交互功能选择在哪个节点上进行新增",
      "确定完位置后对路由表信息进行配置，根据bable/types生成ast节点，将新的ast解析成js代码。这样路由表也就自动更新了",
      "配置之后会询问是否生成模板代码，查找模板自动生成文件",
    ];
    consoleInfo(list1, "难点");
    const list2 = [
      "生成element组件模板代码，但是form表单比较特殊。因为el-form-item会包含其他组件",
      "所以我需要开启另一个进程，并与主进程共享输入输出，但是这样父子进程之间无法通信",
      "想了一些办法来解决，我导出一个对象，在子进程修改对象的键值，等待子进程执行完。再在主进程读取这个对象。",
      "但是发现拿到的对象还是初始值。所以换了一种方式，把对象换成了直接输出文件，在进行读取。这样就可以拿到了",
    ];
    consoleInfo(list2, "难点");
  },
  优化: () => {
    const list = [
      "图片使用webp格式，进行图片/组件的懒加载,将第三方库上传到cdn",
      "通过树摇删除无用代码，使用gzip压缩，合理控制打包文件大小，充分利用浏览器缓存策略",
      "将长任务移动到web worker，防止阻塞页面",
      "防抖和节流，避免内存泄露",
      "使用虚拟列表，大文件上传技术",
    ];
    consoleInfo(list, "性能优化");
  },
  scoped: () => {
    const list = [
      "scoped会为组件生成唯一标识，并在dom上添加这个属性，选择器也会在末尾加上这个属性选择器",
      "使用scoped无法修改第三方组件库的样式，因为最后选择器会加上这个属性，但是使用样式穿透可以实现修改样式",
      "本质是用了样式穿透后，在deep之后的选择器最后就不会加上这个属性",
      "或者新增一个不带scoped的style，但要注意不要产生全局污染",
    ];
    consoleInfo(list, "scoped");
  },
  动态规划: () => {
    const list = [
      "dp[i]代表什么:前i个的结果或者是以第i个结束的结果",
      "需要注意如果有n个数据,要加上0的情况所以需要拿到dp[n],注意下标,不要取错了值",
      "对于最简单的动态规划，尽可能补全初始值，直到判断不了，复杂的可能需要两个for循环",
    ];
  },
  "0/1背包": () => {
    const list = [
      "都需要两层for循环,一层循环物品,一层循环背包(从0开始)",
      "二维:dp[i][j]代表从从第0~i个物品中选满足重量j的最大价值",
      "dp[i][j]=Math.max(dp[i-1][j],d[[i-1][j-weight[i]]+value[i]])",
      "一维:dp[j]代表从容量为j的最大价值,为什么能用一维,可以看上当前层只依赖上一层,dp[i]=Math.max(dp[i],dp[i-weight[i]]+value[i]",
      "循环背包时逆序,因为只跟上方和左上方的数据有关,这个时候不能提前更新它",
    ];
    consoleInfo(list, "0/1背包");
    const codeSnippet = ` let dp=new Array(target+1).fill(false)
    dp[0]=true
    for(let i=0;i<nums.length;i++){
      for(let j=target;j>=nums[i];j--){
        dp[j]=dp[j]||dp[j-nums[i]]
      }
    }
    return dp[target]`;
    highlightCode(codeSnippet);
  },
  完全背包: () => {
    const list = [
      "初始化bp数组，长度是背包value+1,设置初始值",
      "let dp = new Array(amount + 1).fill(Infinity)",
      "dp[0] = 0;",
      "两层for循环，外层循环背包，i从1开始，取值要注意减一，内层循环物品，满足条件，进行判断dp[i]=dp[i]||dp[i-cur.length]",
      "注意i，j不要用混了，length不要拼写错误",
    ];
    consoleInfo(list, "完全背包");
    const codeSnippet = `var wordBreak = function(s, wordDict) {
    let dp=new Array(s.length+1).fill(false)
    dp[0]=true
    for(let i=1;i<=s.length;i++){
       for(let j=0;j<wordDict.length;j++){
        let cur = wordDict[j]
        if(i-cur.length>=0&&s.slice(i-cur.length,i)===cur){
            dp[i]=dp[i]||dp[i-cur.length]
        }
       }
    }
    return dp[s.length]
};`;
    highlightCode(codeSnippet);
  },
  js基本数据类型有哪些及它们的区别: () => {
    const list = [
      "js有八种数据类型,分别是null,undefined,number,string,boolean,object,symbol,bigint",
      "symbol和bigint是es6新增的,symbol是为了创建一个独一无二的数据,解决可能出现的全局变量冲突的问题",
      "js的number类型是基于IEEE754标准,最大可以表示的数是2^53-1,超过这个范围精度会丢失,bigint能表示任意大小的数,不会出现精度丢失",
      "这些数据可以分为原始数据类型和引用数据类型",
      "两种类型的区别在于存储位置的不同,原始数据类型放在栈中,引用数据类型放在堆中.但是在栈中会存放指向堆的指针",
    ];
  },
  数据类型检测的方式有哪些: () => {
    const list = [
      "typeof",
      "typeof null 的结果为 object,这是官方承认的 typeof 的错误，这个问题来自于 JavaScript 语言的早期阶段，并为了兼容性而保留了下来。null 绝对不是一个 object。null 有自己的类型，它是一个特殊值。typeof 的行为在这里是错误的。",
      "typeof alert 按理应该是返回 object。但是 typeof 会对函数区分对待，并返回 function。这也是来自于 JavaScript 语言早期的问题。从技术上讲，这种行为是不正确的，但在实际编程中却非常方便。",
      "instanceof,其内部运行机制是判断在其原型链中能否找到该类型的原型,只能正确判断引用数据类型，而不能判断基本数据类型",
    ];
  },
  this: () => {
    const list = [
      "指向当前执行上下文中的 执行环境 或 函数调用的上下文",
      "箭头函数的写法更简洁,箭头函数没有this,继承与外部词法环境,不能被修改,没有arguments,不能成为构造函数",
    ];
  },
  原型: () => {
    const list = [
      "对象有一个特殊的隐藏属性prototype,它要么为null,要么就是另一个对象的引用,该对象被称为原型",
      "属性 [[Prototype]] 是内部的而且是隐藏的,但是使用特殊的名字 __proto__ 可以设置它",
      "当访问一个对象的属性,如果没找到就会到原型里找,原型里又有它的原型,这样一直寻找,就是一条原型链,原型链的终点是null",
    ];
  },
  闭包: () => {
    const list = [
      "闭包 是指一个函数可以记住其外部变量并可以访问这些变量",
      "例如防抖节流函数",
      "注意内存泄漏",
    ];
  },
  内存泄漏: () => {
    const list = ["意外的全局变量", "闭包", "定时器", "没有清理的dom引用"];
  },
  "var,let,const": () => {
    const list = [
      "let const 有块级作用域,var没有",
      "var允许重复声明",
      "使用var声明的全局函数和变量会成为全局对象的属性",
      "var声明会被提升,,但是赋值不会,let const有暂时性死区",
      "const必须设置初始值,const声明之后不能重新赋值",
    ];
  },
  new: () => {
    const list = [
      "创建一个空对象分配给this",
      "执行函数体,通常会修改this",
      "返回this",
    ];
  },
  es6: () => {
    const list = [
      "let const",
      "箭头函数",
      "解构赋值",
      "模版字符串",
      "promise",
      "扩展运算符",
    ];
  },
  promise: () => {
    const codeSnippet = `//ajax改造成promise
      function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    // 设置请求成功的回调
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText); // 请求成功，返回响应内容
      } else {
        reject(new Error()); // 请求失败
      }
    };

    // 设置请求失败的回调
    xhr.onerror = function() {
      reject(new Error('Network error')); // 网络错误
    };

    // 发送请求
    xhr.send();
  });
}

// 使用 Promise 的方式进行调用
ajax('https://api.example.com/data')
  .then(response => {
    console.log('Success:', response);
  })
  .catch(error => {
    console.log('Error:', error);
  });
`;
    highlightCode(codeSnippet);
  },
  "null/undefined": () => {
    const list = [
      "基本是同义的,只有一些细微的差别,null表示此处不应该有值,undefined表示此处应该有一个值,只是没有定义",
      "所以访问一个不存在的对象属性返回是undefined",
      "在双等检查中返回true,除此之外,它们在双等检查中不会进行隐式转换",
    ];
    consoleInfo(list, "null undefined的区别");
  },
  "":()=>{
    const list = [
      "发现有一些可以公用的方法每个人都单独实现了，造成了项目体积无意义的膨胀。分析了几个原因",
      "其他人压根不知道已经有实现这个功能的方法",
      "有学习成本，需要看别人的代码了解怎么实现",
      "因此需要通用集中管理hook和utils，最好直接展示在vscode侧边栏里，所以想到开发一个插件",
      "首先需要拿到一个文件导出的内容，开始想直接使用import，webpack打包忽略这个import语句，并且使用tsc编译ts文件，但是实际上是不支持",
      "也考虑使用正则，但是太过繁琐，因为导出语法有几种。而且不是很踏实",
      "最后发现使用babel解析出ast，然后在分析这个树，可以获得导出的内容",
      "然后根据获取到的数据在插件中递归渲染一个树视图，得益于ast额外提供的注释节点，位置信息",
      "鼠标悬浮即可显示注释，点击可以跳转文件并自动滚动到导出内容并高亮"
    ];
    const list1=[
      "解决路由表路由子信息meta数据冗余问题，有的时候新增一个路由，只是从别的位置简单的复制粘贴",
      "导致meta出现一些无意义的数据，而且了解这些meta属性是需要一定时间的",
      "在此基础上，创建完路由还需要创建页面",
      "所以使用脚手架来解决这个问题，基本思路是解析路由表，选择节点位置插入新路由，配置路由表，里面会有相关属性的描述。",
      "自动更新路由表，选择模板文件并生成，生成文件是抽离注册成另一个命令",
    ]
    const list2=[
      "有的时候需要在全局查找一些最佳实践，例如我注册了一个指令，只允许输入全角。我想要用这个指令，不得不切换上下文来查找其他使用到的地方并复制粘贴。",
      "在例如使用组件，需要在template写模板，然后滚动到script注册变量函数。",
      "",
      "",
      "",
    ]
  }
};
function consoleInfo(list, name) {
  const totalLength = 80;
  const nameLine = ` ${name} `;
  const sideLength = Math.floor((totalLength - nameLine.length) / 2);
  const fullLine = "=".repeat(totalLength);
  const nameLineWithPadding =
    "=".repeat(sideLength) +
    nameLine +
    "=".repeat(totalLength - sideLength - nameLine.length);

  console.log(chalk.blue(nameLineWithPadding));
  list.forEach((item, index) => {
    console.log(chalk.bold(`[${index + 1}]`) + chalk.bold.black(` ${item}`));
  });
  console.log(chalk.blue(fullLine));
}
program.parse();
