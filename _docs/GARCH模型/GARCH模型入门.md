---
title: GARCH模型入门
author: GARCH Quant Research
date: 2024-01-20
category: GARCH模型
tags: [GARCH, 波动率模型, 条件异方差, Bollerslev]
abstract: 介绍 GARCH(p,q) 模型的基本结构、参数估计方法及在金融时间序列中的应用，包含条件方差方程与均值方程的联合建模框架。
---

# GARCH模型入门

## 1. 模型背景

传统时间序列模型（如 ARMA）假设方差恒定，而金融数据普遍存在**波动率聚集**（volatility clustering）现象——大幅波动后往往跟随大幅波动。

Bollerslev (1982) 提出的 GARCH 模型对此进行了建模。

## 2. GARCH(p,q) 模型结构

### 条件均值方程：

$$r_t = \mu_t + \epsilon_t, \quad \epsilon_t = \sigma_t z_t, \quad z_t \sim \mathcal{N}(0,1)$$

### 条件方差方程：

$$\sigma_t^2 = \omega + \sum_{i=1}^{q} \alpha_i \epsilon_{t-i}^2 + \sum_{j=1}^{p} \beta_j \sigma_{t-j}^2$$

其中 $\omega > 0$, $\alpha_i \geq 0$, $\beta_j \geq 0$, $\sum \alpha_i + \sum \beta_j < 1$（保证平稳性）。

## 3. GARCH(1,1) 的解读

$$\sigma_t^2 = \omega + \alpha \epsilon_{t-1}^2 + \beta \sigma_{t-1}^2$$

- $\alpha$：**ARCH 效应系数**——昨日冲击对今日波动率的影响
- $\beta$：**波动率持续性系数**——历史波动率对当前波动率的传导
- $\alpha + \beta \approx 1$：高持续性，波动率衰减缓慢

## 4. 参数估计

使用**最大似然估计（MLE）**：

$$\ell(\theta) = -\frac{T}{2}\log(2\pi) - \frac{1}{2}\sum_{t=1}^{T}(\log\sigma_t^2 + \frac{\epsilon_t^2}{\sigma_t^2})$$

## 5. 模型诊断

- ** Ljung-Box 检验**：检验标准化残差 $\hat{z}_t = \epsilon_t / \sigma_t$ 的自相关性
- **ARCH-LM 检验**：检验残差序列中是否仍存在条件异方差
- **AIC / BIC**：模型选择准则

## 参考文献

- Bollerslev, T. (1986). Generalized autoregressive conditional heteroskedasticity. *J. of Econometrics*, 31(3), 307-327.
- Engle, R.F. (1982). Autoregressive conditional heteroscedasticity with estimates of the variance of United Kingdom inflation. *Econometrica*, 50(4), 987-1007.
