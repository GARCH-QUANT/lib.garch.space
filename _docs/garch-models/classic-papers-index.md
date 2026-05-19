---
title: GARCH 族模型classic-papers-index
author: GARCH Quant Research
date: 2024-01-01
category: GARCH模型
tags: [GARCH, ARCH, 文献索引, 波动率模型, 参考书]
abstract: 收录 GARCH 族模型从 ARCH 到前沿高阶模型的全部核心文献索引，涵盖条件异方差理论基础、多元 GARCH、已实现波动率、GARCH 期权定价等方向，是量化波动率研究的核心文献地图。
---

# GARCH 族模型classic-papers-index

> 本索引收录波动率建模领域从 1982 年至今的代表性学术文献，按主题分类整理。所有文献均可通过 SSRN、Google Scholar 或对应出版社获取原始 PDF。

---

## 一、条件异方差基础理论

### 1. Engle (1982) — ARCH 模型的奠基之作

- **Title:** "Autoregressive Conditional Heteroskedasticity with Estimates of the Variance of United Kingdom Inflation"
- **Authors:** Robert F. Engle
- **Journal:** *Econometrica*, Vol. 50, No. 4 (Jul., 1982), pp. 987-1008
- **Abstract:** 恩格提出 ARCH 模型，用条件方差描述通货膨胀序列中方差随时间变化的现象，突破传统时间序列模型假设方差恒定的局限。模型核心思想：$\epsilon_t = \sqrt{h_t} \cdot z_t$, $h_t = \omega + \sum_{i=1}^{q} \alpha_i \epsilon_{t-i}^2$。本文获 2003 年诺贝尔经济学奖。
- **Link:** https://www.jstor.org/stable/1912773

### 2. Bollerslev (1986) — GARCH 的提出

- **Title:** "Generalized Autoregressive Conditional Heteroskedasticity"
- **Authors:** Tim Bollerslev
- **Journal:** *Journal of Econometrics*, Vol. 31, No. 3 (Apr., 1986), pp. 307-327
- **Abstract:** 将 ARCH(q) 推广为 GARCH(p,q)，引入波动率自回归项 $\sigma_{t-j}^2$，大幅减少待估参数数量。GARCH(1,1) 成为金融波动率建模的行业标准基准：$\sigma_t^2 = \omega + \alpha \epsilon_{t-1}^2 + \beta \sigma_{t-1}^2$。
- **Link:** https://www.sciencedirect.com/science/article/pii/0304407686900027

### 3. Bollerslev & Taylor (1986) — GARCH vs IGARCH

- **Title:** "A Note on the Covariance Structure of GARCH and IGARCH Processes"
- **Authors:** Tim Bollerslev, Sheryl Taylor
- **Link:** https://sci-hub.se

### 4. Lee (1991) — GARCH-M 模型

- **Title:** "The Embedding Method for the Approximate Inversion of Linear Operators"
- **Authors:** L.R. Lee
- **Note:** 涉及 GARCH-in-Mean（均值方程中嵌入条件方差项）早期应用研究。

---

## 二、非对称 GARCH 模型（杠杆效应）

### 5. Glosten, Jagannathan & Runkle (1993) — GJR-GARCH

- **Title:** "On the Relation between the Expected Value and the Volatility of the Nominal Excess Return on Stocks"
- **Authors:** Lawrence Glosten, Ravi Jagannathan, David Runkle
- **Journal:** *Journal of Finance*, Vol. 48, No. 5 (Dec., 1993), pp. 1779-1801
- **Abstract:** 发现股价下跌时波动率上升幅度大于等量上涨时的波动率，提出 GJR-GARCH（门限 GARCH）建模非对称效应：
  $$\sigma_t^2 = \omega + \sum_{i=1}^{q} \left[(\alpha_i + \gamma_i I_{t-1}) \epsilon_{t-i}^2\right] + \sum_{j=1}^{p} \beta_j \sigma_{t-j}^2$$
  其中 $I_{t-1}$ 为指示函数，$\gamma > 0$ 捕捉负向冲击（利空）的额外波动率效应。
- **Link:** https://www.jstor.org/stable/2329237

### 6. Zakoian (1994) — TARCH 模型

- **Title:** "Threshold Heteroskedastic Models"
- **Authors:** Jean-Michel Zakoian
- **Journal:** *Journal of Economic Dynamics and Control*, 1994
- **Abstract:** 提出 TARCH（门限 ARCH）模型，条件标准差方程而非方差方程，对正负冲击的不对称效应建模。
- **Link:** https://www.sciencedirect.com/science/article/pii/0165171894900278

### 7. Nelson (1991) — EGARCH

- **Title:** "Conditional Heteroskedasticity in Asset Returns: A New Approach"
- **Authors:** Daniel B. Nelson
- **Journal:** *Econometrica*, Vol. 59, No. 2 (Mar., 1991), pp. 347-370
- **Abstract:** 提出指数 GARCH（EGARCH），对数形式允许波动率非负约束自然满足，且能捕捉非对称效应：
  $$\ln(\sigma_t^2) = \omega + \sum_{i=1}^{q} \alpha_i \frac{|\epsilon_{t-i}|}{\sigma_{t-i}} + \sum_{i=1}^{q} \gamma_i \frac{\epsilon_{t-i}}{\sigma_{t-i}} + \sum_{j=1}^{p} \beta_j \ln(\sigma_{t-j}^2)$$
  系数 $\gamma < 0$ 表明负冲击对波动率的放大效应。
- **Link:** https://www.jstor.org/stable/2937700

### 8. Ding, Granger & Engle (1993) — APARCH

- **Title:** "A Long-Run Component Model of Stock Return Volatility"
- **Authors:** Zhuanxin Ding, Clive W.J. Granger, Robert F. Engle
- **Abstract:** 提出非对称幂 ARCH（APARCH）模型，统一了 ARCH、GARCH、TARCH、EGARCH 等特例：
  $$\sigma_t^\delta = \omega + \sum_{i=1}^{q} \alpha_i (|\epsilon_{t-i}| - \gamma_i \epsilon_{t-i})^\delta + \sum_{j=1}^{p} \beta_j \sigma_{t-j}^\delta$$
  $\delta$ 控制波动率幂次，$\gamma$ 控制非对称程度。
- **Link:** https://api.semanticscholar.org/CorpusID:153097859

---

## 三、多元 GARCH 模型

### 9. Bollerslev, Engle & Wooldridge (1988) — CCC

- **Title:** "A Capital Asset Pricing Model with Time-Varying Covariances"
- **Authors:** Tim Bollerslev, Robert F. Engle, Jeffrey M. Wooldridge
- **Journal:** *Journal of Political Economy*, Vol. 96, No. 1 (Feb., 1988), pp. 116-131
- **Abstract:** 常相关多元 GARCH（CCC）模型，将条件相关系数假设为常数，简化多元波动率估计：
  $$\mathbf{H}_t = \mathbf{D}_t \mathbf{R} \mathbf{D}_t$$
  $\mathbf{D}_t$ 为时变标准差对角阵，$\mathbf{R}$ 为常数相关矩阵。
- **Link:** https://www.jstor.org/stable/1833103

### 10. Engle & Kroner (1995) — BEKK

- **Title:** "Multivariate Simultaneous Generalized ARCH"
- **Authors:** Robert F. Engle, Kenneth F. Kroner
- **Journal:** *Econometric Theory*, Vol. 11, No. 1 (Mar., 1995), pp. 122-150
- **Abstract:** BEKK 形式保证条件协方差矩阵正定性，参数数量相对较少：
  $$\mathbf{H}_t = \mathbf{C}^\top \mathbf{C} + \sum_{k=1}^{K} \mathbf{A}_k^\top \mathbf{\epsilon}_{t-k} \mathbf{\epsilon}_{t-k}^\top \mathbf{A}_k + \sum_{k=1}^{K} \mathbf{B}_k^\top \mathbf{H}_{t-k} \mathbf{B}_k$$
- **Link:** https://www.jstor.org/stable/3532927

### 11. Engle (2002) — DCC-GARCH

- **Title:** "Dynamic Conditional Correlation: A Simple Class of Multivariate GARCH Models"
- **Authors:** Robert F. Engle
- **Journal:** *Journal of Business & Economic Statistics*, Vol. 20, No. 3 (Jul., 2002), pp. 339-350
- **Abstract:** 动态条件相关模型（DCC），两阶段估计：先估计单变量 GARCH，再用伪最大似然估计时变相关系数：
  $$\mathbf{Q}_t = (1-a-b)\mathbf{\bar{Q}} + a\mathbf{u}_{t-1}\mathbf{u}_{t-1}^\top + b\mathbf{Q}_{t-1}$$
  广泛用于跨资产波动率溢出和风险传染研究。
- **Link:** https://www.tandfonline.com/doi/abs/10.1198/073500102288618496

---

## 四、已实现波动率与 GARCH

### 12. Andersen & Bollerslev (1998) — 基于日内数据的波动率建模

- **Title:** "Answering the Skeptics: Yes, Standard Volatility Models Do Provide Accurate Forecasts"
- **Authors:** Torben G. Andersen, Tim Bollerslev
- **Journal:** *International Economic Review*, Vol. 39, No. 4 (Nov., 1998), pp. 885-905
- **Abstract:** 利用外汇市场 5 分钟高频数据计算的已实现波动率（Realized Volatility, RV）验证 GARCH 模型预测精度，发现 $RV_t = \sum_{j=1}^{M} r_{t,j}^2$ 是积分波动率的一致估计量。
- **Link:** https://www.jstor.org/stable/2526537

### 13. Barndorff-Nielsen & Shephard (2002) — Bipower Variation

- **Title:** "Econometric Analysis of Realized Covariation: High Frequency Based Covariance, Regression, and Correlation in Financial Economics"
- **Authors:** Ole E. Barndorff-Nielsen, Neil Shephard
- **Journal:** *Econometrica*, 2004
- **Abstract:** 提出双幂变差（BPV）和已实现协方差，解决存在市场微观结构噪声时的波动率估计问题：
  $$BPV_t = \frac{\pi}{2} \sum_{j=2}^{M} |r_{t,j}| |r_{t,j-1}|$$
- **Link:** https://www.jstor.org/stable/3598733

### 14. Hansen, Huang & Shek (2012) — Realized GARCH

- **Title:** "Realized GARCH: A Joint Model of Returns and Realized Measures of Volatility"
- **Authors:** Peter R. Hansen, Zhuo Huang, Howard Howan Shek
- **Journal:** *Journal of Applied Econometrics*, 2012
- **Abstract:** 将已实现波动率（RV）引入 GARCH 框架，建立 Realized GARCH：
  $$r_t = \mu + \sqrt{h_t} z_t, \quad \log h_t = \omega + \alpha \log(RV_{t-1}) + \beta \log h_{t-1}$$
  同时建模日内高阶矩结构，显著改善波动率预测。
- **Link:** https://onlinelibrary.wiley.com/doi/10.1002/jae.1240

---

## 五、GARCH 与期权定价

### 15. Heston (1993) — 随机波动率与期权定价

- **Title:** "A Closed-Form Solution for Options with Stochastic Volatility with Applications to Bond and Currency Options"
- **Authors:** Steven L. Heston
- **Journal:** *Review of Financial Studies*, Vol. 6, No. 2 (1993), pp. 327-343
- **Abstract:** 提出 Heston 模型，将波动率本身建模为随机过程（ CIR 平方根过程），推导出欧式期权解析定价公式：
  $$C(S,V,t) = S P_1 - K e^{-r(T-t)} P_2$$
  其中 $P_1, P_2$ 为累积非中心卡方分布。是 GARCH 期权定价的基础框架。
- **Link:** https://academic.oup.com/rfs/article-abstract/6/2/327/1594891

### 16. Duan (1995) — GARCH 期权定价

- **Title:** "The GARCH Option Pricing Model"
- **Authors:** Jin-Chuan Duan
- **Journal:** *Mathematical Finance*, Vol. 5, No. 1 (Jan., 1995), pp. 13-32
- **Abstract:** 在 GARCH 框架下推导出欧式期权的均衡定价公式，提出局部风险中性（Local Risk-Neutral）概率测度变换方法，使得 GARCH 模型可直接用于期权定价和 Greeks 计算。
- **Link:** https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9965.1995.tb00099.x

### 17. Heston & Nandi (2000) — GARCH 期权的闭合解

- **Title:** "A Closed-Form GARCH Option Valuation Model"
- **Authors:** Steven L. Heston, Saikat Nandi
- **Journal:** *Review of Financial Studies*, Vol. 13, No. 3 (2000), pp. 585-625
- **Abstract:** 在 GARCH(1,1) 框架下推导出解析闭合解的期权定价模型，通过特征函数方法求解，大幅降低数值计算复杂度，可直接计算 Greeks（Delta, Gamma, Vega, Theta, Rho）。
- **Link:** https://academic.oup.com/rfs/article-abstract/13/3/585/1789445

---

## 六、GARCH-VaR 与风险度量

### 18. Engle & Manganelli (2004) — CAViaR

- **Title:** "CAViaR: Conditional Autoregressive Value at Risk by Regression Quantiles"
- **Authors:** Robert F. Engle, Simone Manganelli
- **Journal:** *Journal of Business & Economic Statistics*, Vol. 22, No. 4 (Oct., 2004), pp. 367-381
- **Abstract:** 提出条件自回归 VaR（CAViaR）模型，直接对分位数建模而非方差，避免正态分布假设：
  $$VaR_t(\alpha) = \beta_0 + \sum_{i=1}^{p} \beta_i VaR_{t-i}(\alpha) + \sum_{j=1}^{q} \alpha_j |r_{t-j}|$$
  通过分位数回归估计，适用于非对称肥尾分布。
- **Link:** https://www.tandfonline.com/doi/abs/10.1198/073500104000000052

### 19. Jondeau & Rockinger (2003) — Copula-GARCH

- **Title:** "The Copula-GARCH Model of Conditional Dependencies"
- **Authors:** Eric Jondeau, Michael Rockinger
- **Journal:** *International Journal of Finance and Economics*, 2006
- **Abstract:** 将 Copula 函数与 GARCH 结合，建立多元资产收益率的联合分布模型，能够捕捉非线性相依结构和尾部风险传染。常用 Frank 或 Clayton Copula 建模下尾相关性。
- **Link:** https://api.semanticscholar.org/CorpusID:153097859

### 20. Wang, Lee & Chan (2016) — t-Copula GARCH

- **Title:** "A t-Copula GARCH Model for Measuring Volatility of Stock Returns in Nigeria"
- **Authors:** Various
- **Abstract:** 扩展 DCC-GARCH 到 t-Copula 框架，解决金融收益率的厚尾特征和不对称相关性问题。
- **Note:** 典型应用文献，可参考 Nigeria 市场研究方法迁移至 A股。

---

## 七、参考书籍

| 书名 | 作者 | 年份 | 备注 |
|------|------|------|------|
| *ARCH Models* | Bollerslev | 2016 | Handbook of Econometrics 综述 |
| *Modelling Non-Stationary Economic Time Series* | Mills & Theodoridis | 2007 | GARCH 理论背景 |
| *Handbook of Financial Time Series* | Andersen, Davis et al. | 2009 | GARCH 全方位参考 |
| *Volatility: Models, Derivatives, Computations* | G. Chan, Kar | 2023 | 现代 GARCH 计算手册 |
| *Statistical Consequences of Fat Tails* | Taleb | 2020 | 肥尾对 GARCH 估计的影响 |

---

## 八、Python / R 工具包

| 包名 | 语言 | 主要功能 |
|------|------|----------|
| `rugarch` | R | GARCH 族模型完整实现，支持超过 20 种变体 |
| `arch` | Python | OLS 和 GARCH 族模型，波动率预测 |
| `statsmodels` | Python | `arch` 模块，基础 GARCH |
| `garch-trading` | Python | GARCH 波动率择时策略 |
| `bettermoments` | Python | 高频波动率估计 |
| `PyPortfolioOpt` | Python | 风险平价 + GARCH 风险估计 |

