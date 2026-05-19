---
title: VaR 风险度量体系
author: GARCH Quant Research
date: 2024-02-15
category: 交易风控
tags: [VaR, CVaR, 压力测试, 风险度量, 回撤控制]
abstract: 系统梳理VaR、CVaR、ES等主流风险度量指标的理论基础与计算方法，涵盖参数法、历史模拟法、蒙特卡洛模拟法，并讨论GARCH-VaR和压力测试框架。
---

# VaR 风险度量体系

## 1. VaR 的定义

$$\text{VaR}_{\alpha}(X) = -\inf\{x: F_X(x) \geq \alpha\} = F_X^{-1}(\alpha)$$

在置信水平 $\alpha=95\%$ 下，VaR 表示最大可能损失：
> "明天有 95% 的把握，组合损失不会超过 VaR 值"

## 2. VaR 的三种计算方法

### 2.1 参数法（方差-协方差法）

假设收益率服从正态分布：
$$\text{VaR}_{\alpha}^{\text{normal}} = -(\mu + z_\alpha \sigma) W_0$$

若考虑偏度和峰度修正（Cornish-Fisher展开）：
$$z_{CF} = z + \frac{(z^2-1)S}{6} + \frac{(z^3-3z)K}{24} - \frac{(2z^3-5z)S^2}{36}$$
其中 $S$ 为偏度，$K$ 为超额峰度。

### 2.2 历史模拟法

直接使用历史收益率分布的分位数：
$$\text{VaR}_{\alpha} = -W_0 \cdot \text{Quantile}(\{r_{t-T+1},\ldots,r_t\}, \alpha)$$

优点：无分布假设；缺点：历史依赖强，无法预测结构变化。

### 2.3 蒙特卡洛模拟法

利用 GARCH 等模型模拟未来收益率分布，再计算 VaR：
```python
import numpy as np

def garch_var(params, returns, W0, alpha=0.05, n_sim=10000):
    omega, alpha1, beta = params
    sigma2_last = returns[-1]**2
    sim_returns = []
    for _ in range(n_sim):
        sigma2 = omega + alpha1 * returns[-1]**2 + beta * sigma2_last
        r = np.random.normal(0, np.sqrt(sigma2))
        sim_returns.append(r)
    return -W0 * np.percentile(sim_returns, alpha * 100)
```

## 3. CVaR（条件VaR / Expected Shortfall）

$$\text{CVaR}_{\alpha} = \mathbb{E}[-X \mid -X > \text{VaR}_{\alpha}] = -\frac{1}{\alpha} \int_0^{\alpha} F_X^{-1}(u) du$$

相比 VaR，CVaR 是**尾部敏感**的（sub-additive），更符合风险度量公理（Artzner et al., 1999）。

## 4. GARCH-VaR 模型

使用 GARCH(1,1) 估计时变波动率：
```python
from arch import arch_model

am = arch_model(returns, vol='Garch', p=1, q=1, dist='t')
res = am.fit(disp='off')
forecasts = res.forecast(horizon=1, reindex=False)
sigma_next = np.sqrt(forecasts.variance.values[-1, 0])

# t分布分位数
from scipy import stats
z_alpha = stats.t.ppf(0.05, df=res.params.get('nu', 10))
var_garch = W0 * z_alpha * sigma_next
```

## 5. 压力测试（Stress Testing）

### 历史情景分析
选取历史极端事件（2008金融危机、2020新冠、2022加息）：
| 情景 | 股票冲击 | 波动率冲击 | 相关性冲击 |
|------|----------|------------|------------|
| 2008雷曼 | -40% | +300% | 股债负相关 |
| 2020新冠 | -34% | +400% | 跨资产普跌 |
| 2022加息 | -25% | +150% | 成长股领跌 |

### 假设压力测试
- 波动率极端情景：VIX 飙升至 80
- 流动性冲击：买卖价差扩大 5 倍
- 关联资产大幅下跌：组合集中持仓品种同时跌停

## 参考文献

- Artzner, P. et al. (1999). "Coherent Measures of Risk." *Mathematical Finance*, 9(3), 203-228.
- McNeil, Frey & Embrechts (2015). *Quantitative Risk Management*, 2nd Ed. Princeton.
- Jorion (2007). *Value at Risk: The New Benchmark for Managing Financial Risk*, 3rd Ed. McGraw-Hill.
