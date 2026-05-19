---
title: Fama-French三因子模型
author: GARCH Quant Research
date: 2024-02-10
category: 多因子
tags: [多因子, CAPM, Fama-French, 因子暴露, 风险溢价]
abstract: 介绍Fama-French三因子模型的构建逻辑、因子定义、回测方法及在A股市场的适用性改进。
---

# Fama-French三因子模型

## 1. 模型背景

Fama & French (1992) 发现 CAPM 的 $\beta$ 无法充分解释资产收益率差异，提出三个系统性风险因子：

$$R_{it} - R_{ft} = \alpha_i + \beta_i (R_{mt} - R_{ft}) + s_i \cdot SMB_t + h_i \cdot HML_t + \epsilon_{it}$$

## 2. 因子构建

| 因子 | 名称 | 构建方法 |
|------|------|----------|
| $R_m - R_f$ | 市场超额收益 | A股流通市值加权组合 |
| SMB | 规模因子 | 小市值 - 大市值 |
| HML | 价值因子 | 高账面市值比 - 低账面市值比 |

## 3. A股实证结果

A股三因子模型：

$$R_{it} = \alpha_i + 0.92 \beta_i MKT_t + 0.31 s_i SMB_t + 0.18 h_i HML_t + \epsilon_{it}$$

小市值溢价显著，但价值因子在2015年后逐步失效。

## 4. 因子正交化

为避免因子共线性，对新因子进行 Gram-Schmidt 正交化：

$$\tilde{f}_k = f_k - \sum_{j < k} \frac{\langle f_k, \tilde{f}_j \rangle}{\langle \tilde{f}_j, \tilde{f}_j \rangle} \tilde{f}_j$$

## 参考文献

- Fama, E.F. & French, K.R. (1992). The Cross-Section of Expected Stock Returns. *JF*, 47(2), 427-465.
- Liu, J. et al. (2019). A股的因子模型：Fama-French五因子在中国的适用性研究。
