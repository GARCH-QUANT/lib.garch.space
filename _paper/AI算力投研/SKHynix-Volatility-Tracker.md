---
title: SK海力士波动率研究手册
author: GARCH Quant Research
date: 2024-03-10
category: AI算力投研
tags: [SK海力士, HBM, 波动率, GARCH, 韩国半导体, 存储器]
abstract: 针对SK海力士（000660.KS）波动率特征的专项研究，涵盖HBM需求对估值的影响、韩国半导体周期、全球存储器供需框架，以及GARCH族模型在韩国科技股波动率预测中的应用。
---

# SK海力士波动率研究手册

## 1. 公司基本情况

- **交易所：** Korea Exchange（KRX）
- **代码：** 000660.KS
- **主营业务：** DRAM、NAND Flash、HBM（High Bandwidth Memory）
- **收入结构（2024E）：** DRAM ~55%, NAND ~25%, HBM ~15%, 其他 ~5%

## 2. HBM 驱动的估值重估

### HBM 对 SK 海力士的估值影响

| HBM 营收占比 | 市场定价方式 | P/B 估值 |
|-------------|-------------|----------|
| < 10%（传统DRAM时期） | 周期股：1-2x P/B | 1.5x |
| 20%+（HBM贡献） | 成长股：3-5x P/B | 3.5x |
| 40%+（AI占比） | AI基建：6-10x P/B | 6x |

### HBM 供需缺口估算
$$\text{供给} = \text{产能} \times \text{良率} \times (1 + \text{新产能爬坡})$$
$$\text{需求} = \text{GPU出货量} \times \text{HBM含量/GPU} \times (1 + \text{库存调整})$$

- 2023-2024：需求增速 >> 供给增速，供需紧张
- 2025+：SK海力士/三星新产能逐步释放，紧张格局缓解

## 3. 韩国半导体周期

韩国半导体出口是全球科技需求的核心晴雨表：

- **领先指标：** 韩国半导体出口同比（Korea Customs Service，月度数据）
- **同步指标：** 台湾出口、韩国 GDP 科技制造板块
- **滞后指标：** SK海力士营收、毛利率

| 周期阶段 | 特征 | 股价表现 |
|----------|------|----------|
| 去库存 | 需求降，库存降，价格降 | 股价筑底 |
| 补库存 | 需求升，价格反弹 | 股价升 |
| 扩产 | 资本开支升，产能扩张 | 股价升升 |
| 供给过剩 | 价格降，库存升 | 股价降降 |

## 4. 波动率建模

### GJR-GARCH(1,1) 对 SK Hynix 建模

$$\sigma_t^2 = \omega + \alpha \epsilon_{t-1}^2 + \gamma \epsilon_{t-1}^2 I_{t-1}^{-} + \beta \sigma_{t-1}^2$$

- $\alpha$：ARCH效应
- $\gamma$：非对称效应
- $\beta$：GARCH持续性

### 已实现波动率（RV）
$$RV_t = \sum_{j=1}^{M} r_{t,j}^2$$

### Python 实现

```python
import numpy as np
from arch import arch_model

def fit_gjr_garch(returns):
    model = arch_model(
        returns * 100,
        vol='Garch',
        p=1, o=1, q=1,
        dist='t'
    )
    result = model.fit(disp='off')
    return result

returns = sk_hynix_df['log_return'].dropna()
gjr_result = fit_gjr_garch(returns)
print(gjr_result.summary())
```

## 5. 风险指标

### 历史波动率（20日）
$$HV_{20} = \sqrt{\frac{252}{20} \sum_{i=1}^{20} r_i^2}$$

### GEX（Gamma Exposure Index）
$$GEX = \sum_{\text{期权}} \Gamma_{\text{short}} \cdot \frac{\partial S}{\partial \sigma}$$

GEX < 0 表示市场净空头 Gamma，流动性冲击时波动率急剧放大。

## 参考文献

- SK Hynix. "HBM3 and HBM3E Mass Production Timeline." Earnings Call Q4 2023.
- Korea Customs Service. "Monthly Semiconductor Export Statistics."
- BIS Working Paper. "Semiconductor Supply Chains and Macro-financial Linkages."
- GARCH-Quant Research. "SK Hynix Volatility Tracker." Internal Model.
