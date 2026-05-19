---
title: ml-quant-overview
author: GARCH Quant Research
date: 2024-02-01
category: 量化机器学习
tags: [机器学习, 因子挖掘, LightGBM, 深度学习, 量化策略]
abstract: 综述机器学习在量化投资中的应用，涵盖因子挖掘与选择、模型训练与过拟合防控、回测机制与样本外检验，以及前沿深度学习时序方法（Transformer、LSTM、图神经网络）。
---

# ml-quant-overview

## 1. 机器学习量化应用的完整流程

```
原始数据 → 特征工程 → 因子构造 → 标签定义 → 数据集划分
    ↓
模型训练 → 超参调优 → 样本外检验 → 策略构建 → 交易执行
```

## 2. 特征工程与因子构造

### 经典技术面因子
- **动量类：** N日收益率、收益率变化率、均线偏离度
- **波动率类：** 历史波动率（RV）、收益率偏度、峰度
- **流动性类：** Amihud比率、换手率、冲击成本
- **价值类：** PB、PE、PS、EV/EBITDA
- **质量类：** ROE、ROA、资产负债率、经营现金流/总资产

### 时间序列特征
```python
import pandas as pd
import numpy as np

def compute_rolling_features(df, windows=[5, 20, 60]):
    for w in windows:
        df[f'ret_{w}d'] = df['close'].pct_change(w)
        df[f'vol_{w}d'] = df['returns'].rolling(w).std()
        df[f'skew_{w}d'] = df['returns'].rolling(w).skew()
        df[f'kurt_{w}d'] = df['returns'].rolling(w).apply(lambda x: x.kurt(), raw=True)
    return df
```

## 3. 标签定义

### Point-in-time 标签（避免未来信息泄露）
$$y_{t,T} = \frac{P_{t+T} - P_t}{P_t} - r_f$$
必须使用**截断收益（truncated return）** 防止极端值主导模型。

### 序列标注（用于 LSTM/Transformer）
$$y_t \in \{\text{涨}, \text{持平}, \text{跌}\} \text{ 基于未来 } T \text{ 日收益方向}$$

## 4. 防止过拟合

### 数据集划分（绝对不可随机打乱）
```
训练集: 2010-01-01 ~ 2016-12-31
验证集: 2017-01-01 ~ 2019-12-31
测试集: 2020-01-01 ~ 2024-12-31
```

### 交叉验证
时序数据禁止使用 K-Fold，必须使用**Walk-Forward** 验证：
```
Fold 1: train [1..T1] val [T1..T2]
Fold 2: train [1..T2] val [T2..T3]
...
```

### 常用正则化
- L1/L2 正则化（限制权重范数）
- Early Stopping（验证集 loss 不降即停）
- Dropout（神经网络，比例 0.2~0.5）
- 树模型剪枝（`max_depth`, `min_child_weight`, `colsample_bytree`）

## 5. LightGBM 在量化选股中的应用

```python
import lightgbm as lgb
from sklearn.model_selection import TimeSeriesSplit

params = {
    'objective': 'regression',
    'metric': 'rmse',
    'boosting_type': 'gbdt',
    'learning_rate': 0.05,
    'num_leaves': 31,
    'max_depth': 6,
    'min_child_samples': 50,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'reg_alpha': 0.1,
    'reg_lambda': 0.1,
    'verbose': -1
}

model = lgb.train(
    params,
    train_data,
    valid_sets=[train_data, val_data],
    callbacks=[lgb.early_stopping(100), lgb.log_evaluation(50)]
)
```

### 特征重要性分析
- **Split Count：** 特征被用于分裂的次数
- **Gain：** 特征对目标增益的平均值
- 定期剔除低重要性特征，降低噪音

## 6. 深度学习时序方法

### LSTM for Return Prediction
```python
# Keras-style LSTM model
model = Sequential([
    LSTM(64, return_sequences=True, input_shape=(seq_len, n_features)),
    Dropout(0.3),
    LSTM(32),
    Dense(16, activation='relu'),
    Dense(1)
])
model.compile(optimizer=Adam(0.001), loss='mse')
```

### Transformer for Multivariate Time Series
- **Temporal Fusion Transformer (TFT)：** 谷歌开源，同时建模时序趋势和特征交互
- **Informer：** 针对超长序列的高效Transformer
- **Autoformer：** 引入序列分解（趋势+周期）机制

### 图神经网络（GNN）— 市场结构建模
将股票间的行业关系、产业链上下游、供应链等结构建模为图：
$$\mathbf{H}^{(l+1)} = \sigma\left(\tilde{\mathbf{D}}^{-1/2} \tilde{\mathbf{A}} \tilde{\mathbf{D}}^{-1/2} \mathbf{H}^{(l)} \mathbf{W}^{(l)}\right)$$

## 7. 样本外检验与策略评估

### 关键指标
| 指标 | 公式 | 含义 |
|------|------|------|
| IR（信息比率） | $\frac{\bar{R}_p - \bar{R}_b}{\sigma(R_p - R_b)}$ | 主动收益/跟踪误差 |
| Calmar比率 | $\frac{\bar{R}_p}{\text{MDD}}$ | 年化收益/最大回撤 |
| Sortino比率 | $\frac{\bar{R}_p - r_f}{\text{DownsideDev}}$ | 下行风险调整收益 |
| 胜率 | $win\ rate = \frac{N_{profit}}{N_{total}}$ | 交易层面胜率 |

### 回撤约束（硬约束）
$$\text{max\ drawdown} \leq \text{MDD\ threshold（通常 15-20%）}$$

## 参考文献

- Gu, Kelly & Xiu (2020). "Empirical Asset Pricing via Machine Learning." *Review of Financial Studies*, 33(5), 2223-2273.
- Chin (2020). "A Practical Method for Constructing Factors via Gradient Boosting Trees."
- Fischer & Krauss (2018). "Deep Learning with Long Short-Term Memory Networks for Financial Market Predictions." *European Journal of Operational Research*.
- Zeng (2022). "Temporal Fusion Transformers for Interpretable Multi-Horizon Time Series Forecasting."
