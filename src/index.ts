import { Command } from "commander";
import chalk from "chalk";
import { execa } from "execa";
import { res } from "./constant/res";
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
    const pathArr = options._optionValues.data;
    createFile(pathArr);
  });
program
  .command("el")
  .description("生成elementplus的组件模板")
  .action(async (str, options) => {
    const component = await search({
      message: "选择要生成的组件",
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
    fs.writeFileSync("./file.js", JSON.stringify(data.template), "utf-8");
    //  console.log(data.template);
  });
program.parse();
