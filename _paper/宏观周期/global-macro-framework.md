---
title: global-macro-framework
author: GARCH Quant Research
date: 2024-03-01
category: 宏观周期
tags: [宏观周期, 利率, 信用利差, 美林时钟, 全球资产配置, 美联储]
abstract: 构建全球宏观周期的研究框架，涵盖美林投资时钟、货币信用周期、信用利差与国债利差分析、美元周期与新兴市场联动，以及宏观因子在跨资产配置中的应用。
---

# global-macro-framework

## 1. 美林投资时钟

美林时钟将经济周期分为四个阶段：衰退（经济下行、通胀下行）、复苏（经济上行、通胀下行）、过热（经济上行、通胀上行）、滞胀（经济下行、通胀上行）。判断方法：GDP产出缺口（OECD） + CPI同比变化率。

## 2. 货币-信用周期（M-C Framework）

| 组合 | 含义 | 资产表现 |
|------|------|----------|
| 宽货币+窄信用 | 宽松初期 | 股票上涨，债券上涨 |
| 宽货币+宽信用 | 宽松末期 | 股票大涨，商品涨，债券跌 |
| 紧货币+宽信用 | 紧缩初期 | 股票跌，商品坚挺 |
| 紧货币+紧信用 | 衰退 | 现金上涨，债券涨，股票大跌 |

## 3. 美债收益率曲线分析

### 经典衰退信号
- 10Y-2Y 利差倒挂：通常领先衰退 6-18 个月
- 10Y-3M 利差倒挂：更强衰退信号

CME FedWatch Tool 的 Fed Funds Futures 反映市场对年末利率的预期。

## 4. 信用利差分析

| 利差类型 | 含义 | 衰退阈值 |
|----------|------|----------|
| IG Spread | 投资级公司债 vs 国债 | >150bps 预警 |
| HY Spread | 高收益债 vs 国债 | >500bps 预警 |

$$CS_t = Y_{	ext{corp},t} - Y_{	ext{gov},t} = f(	ext{违约率}, 	ext{LGD}, 	ext{流动性溢价})$$

信用利差收窄通常领先股市上涨约 3-6 个月。

## 5. 美元周期与新兴市场

$$\Delta DXY pprox f(\Delta R_{US} - R_{	ext{ROW}}, 	ext{全球风险情绪}, 	ext{贸易差额})$$

| 美元环境 | 新兴市场（EM） | 大宗商品 |
|----------|---------------|----------|
| 美元走弱 | EM股市涨 | 商品涨 |
| 美元走强 | EM股市跌（资金外流） | 商品跌（计价效应） |

## 参考文献

- Fed. "Beige Book." Federal Reserve System.
- OECD. "Composite Leading Indicators." Monthly.
- BIS. "Annual Report: Global Financial Stability."
- Ilmanen (2011). Expected Returns: An Investors Guide to Harvesting Market Rewards. Wiley.
