---
title: ai-compute-chain
author: GARCH Quant Research
date: 2024-02-01
category: AI算力投研
tags: [AI, 算力, 半导体, 数据中心, GPU]
abstract: 构建AI算力产业链从上至下的研究框架，涵盖GPU制造、服务器组装、数据中心运营、算力租赁等环节的盈利模式、竞争格局与估值方法。
---

# ai-compute-chain

## 1. 产业链结构

```
GPU制造（NVIDIA/AMD）
    ↓
服务器组装（超微/戴尔/联想）
    ↓
数据中心（Equinix/万国数据）
    ↓
云厂商（AWS/Azure/Google Cloud）
    ↓
算力租赁平台
    ↓
AI应用层
```

## 2. 核心环节分析

### 2.1 GPU制造

- NVIDIA H100/H200 系列占据主导
- 算力密度提升速度是核心跟踪指标
- 订单可见性强（台积电 CoWoS 封装产能）

### 2.2 数据中心

关键指标：
- **PUE**（电源使用效率）：理想值 < 1.3
- **机架上架率**：反映产能利用率
- **电力合同**：锁定长期低价电力是关键竞争力

## 3. 估值框架

采用**EV/EBITDA** 为主，辅以 **P/AI-Training-Capacity**：

$$V_{DC} = \sum_{t=1}^{N} \frac{EBITDA_t}{(1+WACC)^t}$$

## 参考文献

- Bernstein, J. et al. (2024). *AI Infrastructure CapEx Cycle*. Goldman Sachs Research.
- Proprietary modeling framework for AI compute demand forecasting.
