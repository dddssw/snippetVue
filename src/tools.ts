import path from "path";
import { select } from "@inquirer/prompts";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { parse } from "@babel/parser";
export let routerPath;
export let pagePath;
export let apiPath;
export let tsDeclarationPath;
getConfigure();
export function getConfigure() {
  const configurePath = path.join(fileURLToPath(import.meta.url),'../../', "custom.json");
  if (fs.existsSync(configurePath)) {
    const configureJson = JSON.parse(fs.readFileSync(configurePath, "utf-8"));
    configureJson.routerPath.split(".");
    routerPath = path.join(process.cwd(), configureJson.routerPath);
    routerPath = routerPath.replace("@", "src");
    pagePath = configureJson.pagePath;
    pagePath = pagePath.replace("@", "src");
    apiPath = configureJson.apiPath;
    apiPath = apiPath.replace("@", "src");
    tsDeclarationPath = configureJson.tsDeclarationPath;
    tsDeclarationPath = tsDeclarationPath.replace("@", "src");
    const routerPathCode = fs.readFileSync(routerPath, "utf-8");
    const ast = parse(routerPathCode, {
      sourceType: "module",
      plugins: path.extname(routerPath) === ".ts" ? ["typescript"] : [],
    });
    return ast;
  }
}
export function writeRouter(content) {
  fs.writeFileSync(routerPath, content, { encoding: "utf8" });
}
export async function createFile(createPaths: string[]) {
  const templateDir = path.join(
    dirname(fileURLToPath(import.meta.url)),
    "template"
  );
  for (let createPath of createPaths) {
    //需要创建的文件路径
    createPath = path.join(process.cwd(), createPath);
    if (fs.existsSync(createPath)) {
      console.error("路径已存在");
      continue;
    }
    const ext = path.extname(createPath);
    if (ext.includes(".")) {
      let allTemplateFile: string[] = [];
      getFilesAndFoldersInDir(templateDir);
      allTemplateFile = allTemplateFile.filter(
        (item) => path.extname(item) === path.extname(createPath)
      );
      const choices = allTemplateFile.map((item) => {
        return {
          name: path.basename(item, path.extname(item)),
          value: item,
        };
      });
      const answer = await select({
        message: "选择一个模板 " + createPath,
        choices,
      });
      // 读取源文件内容
      const fileContent = fs.readFileSync(answer, "utf-8");
      fs.mkdirSync(dirname(createPath), { recursive: true });
      // 将内容写入新文件
      fs.writeFileSync(createPath, fileContent);
      console.log(
        chalk.blue(
          "-------------------------页面创建成功--------------------------"
        )
      );
      //获取目录下的扁平化文件
      function getFilesAndFoldersInDir(root) {
        const items = fs.readdirSync(root);
        items.forEach((item) => {
          const itemPath = path.join(root, item);
          const stat = fs.statSync(itemPath);
          if (stat.isDirectory()) {
            getFilesAndFoldersInDir(itemPath);
          } else {
            allTemplateFile.push(itemPath);
          }
        });
      }
    } else {
      fs.mkdirSync(createPath, { recursive: true });
    }
  }
}
