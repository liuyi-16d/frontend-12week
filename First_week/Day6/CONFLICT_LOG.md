## 2026-11-08 冲突：VIP_RATE 15% vs 20%

- 分支：feature/promo-rate-15（0.15）、feature/promo-rate-20（0.20）
- 冲突文件：First_week/Day5/utils/promo.js 第 1 行
- 原因：两条分支改了同一行、值不同
- 解决：保留 0.15，弃用 0.20
- 合并提交：57c74f9

## 2026-11-08 冲突：AFTERFULLREDUCTION()是否删除或修改

- 分支:A(删除方法)、B(修改阈值)
- 冲突文件：First_week/Day5/utils/promo.js 第 3-7 行
- 原因：两条分支修改了邻近的代码
- 解决：根据代码是否仍需使用该方法决定修改
- 合并提交：a8d2f3f
