---
title: Fama-French 多因子体系与本土化实践
author: GARCH Quant Research
date: 2024-04-01
category: 多因子
tags: [多因子, Fama-French, Barra, 因子暴露, 风险溢价, A股]
abstract: 系统梳理Fama-French三因子、五因子模型的构建逻辑与A股本土化改进，Barra风险因子框架，以及实践中因子择时与组合构建的核心问题。
---

# Fama-French 多因子体系与本土化实践

## 1. 三因子模型（1992）

$$R_{it} - R_{ft} = \alpha_i + \beta_i^{MKT}(R_{mt} - R_{ft}) + \beta_i^{SMB} SMB_t + \beta_i^{HML} HML_t + \epsilon_{it}$$

| 因子 | 构建方法 |
|------|----------|
| MKT | 市场超额收益：所有流通市值加权组合 |
| SMB | 小市值减大市值：做多小市值，做空大市值 |
| HML | 高账面市值比减低账面市值比：做多价值股，做空成长股 |

## 2. 五因子模型（2015）

$$R_{it} - R_{ft} = \alpha_i + \sum_{k} \beta_k f_k + \epsilon_{it}$$

新增三个因子：

| 因子 | 含义 | 构建逻辑 |
|------|------|----------|
| RMW | 盈利因子 | 做多高盈利公司，做空低盈利 |
| CMA | 投资因子 | 做多低投资公司，做空高投资（保守扩张） |
| SMB | 沿用 | 规模因子 |

## 3. Barra 多因子风险模型

### 结构

$$\mathbf{r}_i = \mathbf{B}_i \mathbf{f}_t + \mathbf{S}_i \mathbf{u}_t + \epsilon_{it}$$

- $\mathbf{B}_i$：系统性因子暴露（$K$ 个公共因子）
- $\mathbf{f}_t$：因子收益（$K \times 1$）
- $\mathbf{S}_i$：特异性因子暴露
- $\mathbf{u}_t$：特异性因子收益

### Barra GEM3 因子体系（全球版）

| 因子类别 | 因子名称 |
|----------|----------|
| 风格因子 | 规模、非线性规模、价值、盈利、质量、动能、短期反转、长期反转 |
| 行业因子 | 30+ GICS 行业哑变量 |
| 地区因子 | 国家/区域哑变量 |

## 4. A股本土化改进

### 主要问题

1. **壳资源污染：** 上市难度高导致小市值溢价异常显著
2. **涨跌停制度：** 收益率截断导致分布偏态
3. **政策市特征：** 政府干预导致部分因子失效

### 本土化因子

| 因子 | 研究结论 |
|------|----------|
| 规模因子（SMB） | A股小市值溢价显著，但2015年后大幅收窄 |
| 价值因子（HML/EP） | EP 比 BP 更稳定，PE 容易受盈利波动干扰 |
| 质量因子（ROE） | A股高 ROE 选股有效，但需排除周期行业 |
| 动量因子（Momentum） | 月度反转强于趋势，动量效应弱于成熟市场 |
| 换手率因子（Turnover） | 低换手率（机构持股比例高）股票长期跑赢 |

### Feng et al. (2020) A股因子研究

- 论文使用随机森林和梯度提升树在中国A股验证了70+个因子
- 发现非线性因子交互作用显著（机器学习相比线性模型IR提升约15-25%）
- 最显著因子：市值、动量、换手率、价值、盈利

## 参考文献

- Fama & French (1992). "Common Risk Factors in the Returns on Stocks and Bonds." JF.
- Fama & French (2015). "A Five-Factor Asset Pricing Model." JFE.
- Novy-Marx (2013). "The Other Side of Value." RFS.
- Feng, Polson & Xu (2020). "A Next-Generation Quant Model: ML for Factor Returns in China." Chicago Booth IGM Panel.
- Barra. "Barra Unified Multi-Factor Risk Model." MSCI.
