---
title: Neo
description: Neo 网络、双代币治理、共同创始人及基金会国库边界。
pageType: network
entityId: neo
---

Neo 是一条支持智能合约的开源区块链。项目于2014年以“小蚁”（Antshares）之名启动，由达鸿飞与 Erik Zhang（张铮文）共同创立；源代码于2015年7月公开，主网于2016年10月上线，2017年更名为 Neo。[Neo 官方历史](https://neo.org/about)

<figure class="network-figure">
  <img src="/crypto-founder-wiki/images/networks/neo.svg" alt="由绿色几何线条组成的 Neo 标识" width="512" height="610" loading="eager" fetchpriority="high" />
  <figcaption>Neo 标识，经 <a href="https://commons.wikimedia.org/wiki/File:NEO-logo.svg">Wikimedia Commons</a> 获取；因简单几何图形标记为公共领域，仍可能适用商标规则。</figcaption>
</figure>

## 创立与人物关系

- [达鸿飞](../../people/da-hongfei/)：共同创始人，长期负责战略、生态与对外叙事，也是企业区块链公司 Onchain 的创始人。
- [张铮文（Erik Zhang）](../../people/erik-zhang/)：共同创始人、核心开发者及 dBFT 共识机制作者。

把 Neo 描述成达鸿飞“一人创立”会抹去 Erik Zhang 的技术和共同创始角色。反过来，Onchain、Ontology、Neo Global Development（NGD）和 Neo Foundation 也不是同一个法律或治理主体。

## 技术与双代币模型

Neo N3 使用委托拜占庭容错（dBFT）共识。链上治理由21名委员会成员构成，得票最高的7名同时担任共识节点；协议文件称，当超过20%的 NEO 用于投票时，选举结果才生效。[Neo 治理文档](https://docs.neo.org/docs/n3/foundation/governance.html)、[dBFT 文档](https://docs.neo.org/docs/n3/foundation/consensus/dbft.html)

| 代币 | 主要用途 | 关键限制 |
| --- | --- | --- |
| NEO | 治理、投票及产生 GAS 的基础 | 最大供应1亿枚，不可分割 |
| GAS | 支付网络资源和交易费用 | N3 没有固定供应上限，系统费会销毁 |

N3 初始每区块生成5 GAS：10%分配给 NEO 持有人，10%给委员会及共识节点，80%用于激励投票者。该模型把经济收益与治理参与连接起来，但基金会储备币和低投票参与率可能放大集中治理影响。

## 基金会、NGD 与治理边界

Neo Foundation 负责长期战略与资助，NGD 承担较多开发、运营和生态工作；开源开发者、共识节点与社区组织也参与网络建设。基金会不是达鸿飞的私人公司，项目国库也不是他的个人钱包。

2026年4月，两位共同创始人公开提出不同重组方案。达鸿飞的方案称创始人分歧造成治理僵局，主张把创始人管理的资产和治理工具移交给更独立、透明的制度，并讨论将约4,950万枚储备 NEO 以“Giveback II”形式重新分配。Erik Zhang 则提出另一套“治理恢复”方案。两项内容都是公开提案，不等于已经实施，也不足以证明任何一方侵占资产。[达鸿飞提案](https://github.com/neo-project/neo/issues/4526)、[Erik Zhang 提案](https://github.com/neo-project/neo/issues/4531)

网络页面保存相对稳定的历史、技术与人物关系；会变化的市值、国库估值、节点名单和治理提案状态需按日期另行复核。
