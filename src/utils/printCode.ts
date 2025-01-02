import chalk from "chalk";
const keywordStyle = chalk.blue.bold; // 关键字（如 function, let, const）
const functionNameStyle = chalk.green; // 函数名
const commentStyle = chalk.gray; // 注释
const variableStyle = chalk.cyan; // 变量名
const stringStyle = chalk.yellow; // 字符串
export function highlightCode(code) {
  console.log(code
    .replace(/\b(function|let|const|return)\b/g, keywordStyle("$1")) // 高亮关键字
    .replace(
      /\b(debounce|clearTimeout|setTimeout|apply|effect)\b/g,
      functionNameStyle("$1")
    ) // 高亮函数名
    .replace(/\/\/.*/g, commentStyle("$&")) // 高亮注释
    .replace(/\b(timeout|func|args|duration)\b/g, variableStyle("$1")) // 高亮变量
    .replace(/(['"].*?['"])/g, stringStyle("$1"))); // 高亮字符串
}
export function consoleInfo(list, name) {
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