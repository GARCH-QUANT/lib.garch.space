---
title: NVIDIA 产业链深度研究框架
author: GARCH Quant Research
date: 2024-02-20
category: AI算力投研
tags: [NVIDIA, GPU, HBM, 半导体, 数据中心, AI基础设施, 算力]
abstract: 构建NVIDIA产业链从上至下的研究框架，涵盖GPU制造工艺、CoWoS封装、HBM内存、服务器组装、数据中心运营与算力租赁的全产业链盈利模式、竞争格局与估值方法。
---

# NVIDIA 产业链深度研究框架

## 1. 产业链结构图

```
GPU芯片设计（NVIDIA）
    晶圆制造（TSMC 5nm/3nm）
    CoWoS/SolC 封装（台积电日月光）
    HBM 内存（SK海力士 >70%份额、三星、美光）
    服务器组装（超微、鸿海、广达）
    数据中心（Equinix、万国数据、世纪互联）
    云厂商（AWS/Azure/GCP/阿里云）
    AI应用层（LLM训练/推理）
```

## 2. 核心环节分析

### 2.1 GPU 芯片（NVIDIA）

| 型号 | 制程 | HBM容量 | NVLink带宽 | 主要客户 |
|------|------|---------|------------|----------|
| H100 SXM | 4N (TSMC) | 80GB | 900 GB/s | MSFT/Meta/Google |
| H200 | 4N | 141GB | 900 GB/s | AWS/OpenAI |
| B200 | 4NP | 192GB | 1.8 TB/s | 下代超算/主权AI |

关键跟踪指标：Blackwell 架构产能爬坡速度、CoWoS 封装产能、NVLink 生态独占性。

### 2.2 HBM 内存（SK海力士主导）

SK海力士占据 HBM3 市场约 70% 份额。HBM 与先进封装深度绑定，扩产周期长（良率提升慢），海力士 HBM 毛利率高于普通 DRAM 3倍以上。

### 2.3 先进封装（CoWoS / SolC）

台积电 CoWoS 封装是 GPU+HBM 集成的关键瓶颈：2023年底月产能约 2万片，2024年底目标 4万片。封装良率提升是 GPU 供应量的实际天花板。

### 2.4 数据中心运营

关键财务指标：PUE（电源使用效率，理想小于1.3）、项目 IRR（12-18%）、租赁率（75-90%）、平均租约期限（3-7年）。

## 3. 需求估算框架

### AI 算力需求模型
总算力（FP16 FLOPS）= 模型参数量 x 训练Token数 x 6 x GPU利用率

| 模型 | 参数量 | 训练Token | 所需H100数量 |
|------|--------|-----------|--------------|
| GPT-4 | ~1.8T | ~13T | ~8000张 |
| Llama 3 70B | 70B | ~15T | ~2048张 |
| Gemini Ultra | ~1.5T | ~30T | ~10000张+ |

## 4. 竞争格局

- 训练芯片：NVIDIA 独占（A100/H100/B200）
- 推理芯片：NVIDIA + AMD MI300X + Google TPU
- 云厂商自研：Google TPU v5 / AWS Trainium / Meta MTIA

## 参考文献

- Bernstein et al. (2024). "AI Infrastructure CapEx Cycle." Goldman Sachs Research.
- Cowen. "AI Datacenter Market Model." Annual Update.
- NVIDIA. "Data Center Scaling for Large Language Model Training." GTC Keynotes 2023-2024.
