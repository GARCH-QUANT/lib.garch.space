---
permalink: /data/ashare-daily-data/
title: ashare-daily-data
author: GARCH Quant Research
date: 2024-03-01
category: A股数据
tags: [A股, 日频数据, Tushare, Baostock, 行情数据]
abstract: 介绍A股日频行情数据集的字段结构、数据源、更新频率及获取方式。
---

# ashare-daily-data

## 1. 数据源

| 数据源 | 优势 | 局限 |
|--------|------|------|
| Tushare Pro | 财务数据全面 | 需要积分 |
| Baostock | 免费易用 | 财务数据较少 |
| AKShare | 覆盖广 | 稳定性一般 |

## 2. 字段结构

```sql
CREATE TABLE ashare_daily (
    trade_date   DATE        COMMENT '交易日期',
    ts_code      VARCHAR(9)  COMMENT '股票代码',
    open         DECIMAL(10,3) COMMENT '开盘价',
    high         DECIMAL(10,3) COMMENT '最高价',
    low          DECIMAL(10,3) COMMENT '最低价',
    close        DECIMAL(10,3) COMMENT '收盘价',
    pre_close    DECIMAL(10,3) COMMENT '前收价',
    volume       BIGINT      COMMENT '成交量（手）',
    amount       DECIMAL(20,3) COMMENT '成交额（元）',
    pct_chg      DECIMAL(10,4) COMMENT '涨跌幅(%)',
    is_st        TINYINT     COMMENT '是否ST'
);
```

## 3. 数据范围

- 时间跨度：2010年至今
- 覆盖股票：全A股（约5000只）
- 更新频率：每日收盘后 16:00 UTC+8

## 4. 获取示例

```python
import tushare as ts
pro = ts.pro_api('YOUR_TOKEN')
df = pro.daily(trade_date='20240115')
```
