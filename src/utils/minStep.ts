export function minDistance(word1, word2) {
  let m = word1.length,
    n = word2.length;

  // 如果 word1 的长度比 word2 长，交换它们
  if (m < n) {
    [word1, word2] = [word2, word1];
    [m, n] = [n, m];
  }

  // 初始化一个大小为 (n+1) 的 dp 数组
  let dp = Array(n + 1)
    .fill(0)
    .map((_, index) => index); // dp[j] 代表 word1[0..i-1] 转换成 word2[0..j-1] 的最小操作数

  // 迭代 word1
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]; // prev 保存上一行的 dp[i-1][j-1] 的值
    dp[0] = i; // 初始化 dp[i][0]，即删除 i 个字符

    // 迭代 word2
    for (let j = 1; j <= n; j++) {
      let temp = dp[j]; // 临时保存 dp[i][j] 的当前值

      // 如果字符相同，不需要操作
      if (word1[i - 1] === word2[j - 1]) {
        dp[j] = prev;
      } else {
        // 否则，选择插入、删除或替换的最小操作
        dp[j] = Math.min(dp[j - 1], Math.min(dp[j], prev)) + 1;
      }

      prev = temp; // 更新 prev 为当前值，表示 dp[i-1][j-1]
    }
  }

  // 最终结果是 dp[n]，即将 word1 转换为 word2 的最小操作数
  return dp[n];
}
