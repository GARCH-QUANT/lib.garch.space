---
title: trend-following-system
author: GARCH Quant Research
date: 2024-04-20
category: 趋势跟踪
tags: [趋势跟踪, CTA, 均线系统, 动量策略, 海龟交易法则, 回撤控制]
abstract: 系统梳理趋势跟踪策略的设计框架，涵盖经典均线系统、均线交叉、ATR仓位管理、海龟交易法则，以及趋势策略在商品、债券、股票、外汇多资产中的应用。
---

# trend-following-system

## 1. 趋势跟踪理论基础

### 核心假设
市场并非完全有效，价格趋势由信息扩散速度差异、投资者行为偏差、央行政策传导时滞等因素驱动。

### 趋势的数学定义
$$T_t^{(n)} = 	ext{SMA}(P, n) - 	ext{SMA}(P, m), \quad n > m$$

$T_t > 0$ 为上升趋势，$T_t < 0$ 为下降趋势。

## 2. 经典均线系统

### 2.1 简单均线交叉（MA Crossover）

| 系统 | 描述 |
|------|------|
| 单均线 | 价格上穿N日均线做多，下穿做空 |
| 双均线 | 短均线上穿长均线买入，下穿卖出 |
| 三均线 | 过滤噪音，减少假信号 |

参数选择（常用）：5/20、10/40、20/60、50/200（黄金交叉/死亡交叉）

### 2.2 指数加权均线（EMA vs SMA）

EMA 对近期价格赋予更高权重，反应更灵敏：
$$EMA_t = lpha P_t + (1-lpha) EMA_{t-1}, \quad lpha = rac{2}{N+1}$$

## 3. ATR 仓位管理

### ATR（Average True Range）
$$TR_t = \max(H_t - L_t, |H_t - C_{t-1}|, |L_t - C_{t-1}|)$$
$$ATR_N = rac{1}{N} \sum_{i=1}^{N} TR_i$$

### 仓位计算
$$	ext{头寸规模} = rac{	ext{账户风险上限}}{	ext{ATR} 	imes 	ext{每手价值}}$$

通常：单笔交易风险控制在账户的 1-2%。

## 4. 海龟交易法则（完整的趋势跟踪系统）

### 入场规则
1. 价格突破 20 日（55日）最高点 → 入场做多
2. 使用 ATR 确认突破的有效性

### 止损规则
- 止损位：入场价 - 2 ATR
- 任意合约最大损失不超过账户的 2%

### 加仓规则
- 每盈利 0.5 ATR 追加一个仓位
- 最多加仓 4 次

### 出场规则
- 价格跌破 10 日（20日）最低点 → 全平

## 5. 多资产配置

| 资产类别 | 权重设定 | 趋势信号 |
|----------|----------|----------|
| 商品期货 | 20-30% | 20日/55日均线 |
| 全球债券 | 20-30% | 60日均线 |
| 外汇 | 15-20% | 20日均线 |
| 股票指数 | 20-30% | 200日均线 |

相关性管理：同向信号时超配，反向信号时对冲。

## 6. 策略评估

| 指标 | 计算方法 | 评估标准 |
|------|----------|----------|
| 年化收益 | $R_a = (1+R)^{252/n} - 1$ | IR > 1 为优秀 |
| 夏普比率 | $SR = R_a / \sigma_a$ | SR > 1 为合格，> 2 为优秀 |
| 最大回撤 | $\max_{i>j} (净值_i - 净值_j) / 净值_j$ | MDD < 15% |
| Calmar比率 | $R_a / MDD$ | > 2 为优秀 |

## 参考文献

- Kaufman (2013). Trading Systems and Methods. Wiley.
- Snow (2014). "Momentum and Trend Following." Systematic Invest.
- Turtelbaum (2020). "CTA Handbook: Systematic Futures Strategies." AngE Partners.
- Winton Capital. "Momentum in Futures Markets." Research Series.
