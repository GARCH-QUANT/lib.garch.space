---
title: volatility-trading
author: GARCH Quant Research
date: 2024-04-10
category: 期权策略
tags: [波动率交易, VIX, Greeks, Gamma Scalping, Variance Swap, 期权策略]
abstract: 系统梳理波动率交易的核心框架，涵盖VIX指数与波动率曲面、Black-Scholes与Greeks对冲、Gamma/Theta交换机制、Variance Swap定价及波动率ETF（VXX/UVXY）交易逻辑。
---

# volatility-trading

## 1. VIX 指数

### 计算方法
VIX（CBOE Volatility Index）通过一系列标普500期权加权计算隐含波动率：

$$VIX^2 = rac{2}{T} \sum_i rac{\Delta K_i}{K_i^2} e^{RT} Q(K_i) - rac{1}{T}\left(rac{F}{K_0} - 1
ight)^2$$

- $T$：到期时间（分钟）
- $K_i$：执行价
- $Q(K_i)$：期权报价
- $F$：远期指数水平

### VIX 的经济学含义

| VIX 区间 | 市场状态 | 典型策略 |
|----------|----------|----------|
| < 15 | 极度乐观/低风险 | 卖出期权，收取权利金 |
| 15-25 | 正常区间 | 方向性或中性策略 |
| 25-35 | 担忧升温 | 保护性Put/Call价差 |
| > 35 | 恐慌/危机 | 买入波动率（Long Gamma/Straddle） |

## 2. Black-Scholes 与 Greeks

### 定价公式
$$C(S,K,T,r,\sigma) = S N(d_1) - K e^{-rT} N(d_2)$$
$$d_1 = rac{\ln(S/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}$$

### 核心 Greeks

| Greek | 定义 | 经济含义 |
|--------|------|----------|
| Delta $\Delta$ | $\partial V/\partial S$ | 标的价格变动对期权价值的影响 |
| Gamma $\Gamma$ | $\partial^2 V/\partial S^2$ | Delta 对标的价格的敏感度 |
| Vega $\mathcal{V}$ | $\partial V/\partial \sigma$ | 隐含波动率变化对期权价值的影响 |
| Theta $\Theta$ | $\partial V/\partial T$ | 时间流逝对期权价值的影响（时间损耗） |

### Gamma 与 Theta 的交换

- **Long Gamma：** 付出 Theta 成本（时间损耗），在标的大幅波动时获益
- **Short Gamma：** 赚取 Theta 收入，承担标的大幅波动风险

$$P\&L_{	ext{Gamma}} pprox rac{1}{2} \Gamma \cdot (\Delta S)^2 - \Theta \cdot \Delta t$$

## 3. 波动率曲面（Volatility Surface）

### Skew 与 Smile

| 形态 | 含义 | 市场环境 |
|------|------|----------|
| 波动率微笑（Smile） | 低执行价 + 高执行价的IV > ATM IV | 市场存在尾部风险担忧 |
| 波动率偏斜（Skew） | 低执行价的IV > 高执行价的IV | 市场下跌风险溢价更高 |
| 波动率曲面平坦 | 所有执行价IV相近 | 正常市场（低担忧） |

### 期限结构（Term Structure）

| 形态 | 含义 |
|------|------|
| Contango（升水） | 远月IV > 近月IV（正常市场，持有成本为正） |
| Backwardation（贴水） | 近月IV > 远月IV（市场恐慌，短期内风险高度集中） |

## 4. 核心策略

### 4.1 Long Straddle（买入跨式）

- 买入 ATM Call + 买入 ATM Put
- 预期：大幅单边波动（方向中性）
- 最大损失：权利金总和（约 2-4% 标的价格）
- 盈利平衡点：执行价 +/- 权利金总和

### 4.2 Gamma Scalping（Gamma 撮合）

核心思想：持有 Long Gamma 头寸，通过动态对冲 Delta（高抛低吸）将时间损耗转化为收益。

```python
# 简化 Gamma Scalping 逻辑
# 当标的价格上涨：卖出标的（delta 上升）
# 当标的价格下跌：买入标的（delta 下降）
# 累计的买卖收益 > theta 损耗 → 盈利
```

### 4.3 Variance Swap（方差交换）

定义：期初锁定方差水平 $K_{var}$，期末按实际实现的方差与约定方差之差进行现金结算：

$$P\&L = N \cdot (N^{-1}(K_{var}) - \sigma_{real}^2)$$

实际方差：
$$\sigma_{real}^2 = rac{252}{n} \sum_{i=1}^{n} \left(\lnrac{S_i}{S_{i-1}}
ight)^2$$

## 5. 波动率ETF（VIX ETP）

| 产品 | 类型 | 描述 |
|------|------|------|
| VXX | Long | 追踪 VIX 短期期货的 ETN（时间损耗严重） |
| UVXY | 2x Long | VIX 短期期货 2倍杠杆 |
| SVIX | Short | -1x VIX 短期期货 |
| ZIV | Short | -1x VIX 中期期货（时间损耗更小） |

注：VIX ETN 存在严重的 Contango 损耗（Roll Cost），长期持有往往归零。

## 参考文献

- Gatheral (2006). The Volatility Surface: A Practitioners Guide. Wiley.
- Taleb (2019). Dynamic Hedging: Managing Vanilla and Exotic Options. Wiley.
- CBOE. "VIX Whitepaper: The CBOE Volatility Index." 2019.
- Strub (2019). "Greeks and Arbitrage." Columbia MSQF Thesis.
