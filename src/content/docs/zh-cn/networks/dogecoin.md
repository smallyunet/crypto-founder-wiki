---
title: Dogecoin（狗狗币）
description: Dogecoin 的真实创始人、2013年启动、货币机制、与 Litecoin 合并挖矿、治理，以及 Elon Musk 角色的准确边界。
pageType: network
entityId: dogecoin
---

Dogecoin 是软件开发者 **Billy Markus（比利·马库斯）**与 **Jackson Palmer（杰克逊·帕尔默）**于2013年12月创建的开源点对点加密货币。它原本是以 Doge 表情包讽刺加密投机的实验，后来形成了持续运转的支付、小费、募捐和挖矿社区。

<figure class="network-figure">
  <img src="/crypto-founder-wiki/images/networks/dogecoin.svg" alt="金色 Dogecoin 标识，包含字母D和柴犬剪影" width="512" height="512" loading="eager" fetchpriority="high" />
  <figcaption>Dogecoin Foundation 在 <a href="https://github.com/dogecoinfoundation/dogecoin.com/blob/main/static/logo_silentshibe_dogecoin.svg">官网仓库</a>发布的标识，遵循仓库的 <a href="https://github.com/dogecoinfoundation/dogecoin.com/blob/main/LICENSE">MIT 许可</a>；仍可能适用商标规则。</figcaption>
</figure>

## 起源与真实创始人

Palmer 当时在悉尼的 Adobe 工作，他把加密货币热潮与 Doge 表情包拼成玩笑，并注册 Dogecoin.com。波特兰的 IBM 软件工程师 Markus 联系了他并完成货币实现。网络于2013年12月6日启动，原始 Bitcointalk 公告在12月8日发布。[原始公告](https://bitcointalk.org/index.php?topic=361813.0) [Dogecoin 开发者历史](https://dogecoin.com/dogepedia/articles/dogecoin-developers/)

**Dogecoin 不是 Elon Musk 创建的。** Musk 受到广泛关注的 Dogecoin 言论晚了多年；他没有编写初始客户端、设置创世参数、代表创始人挖矿或创建 Dogecoin Foundation。

两位创始人后来都退出日常工作。Markus 在2021年写道，他约在2015年离开项目，失业后卖出或送出了大部分加密货币，所得约相当于一辆二手 Honda Civic。该自述不支持“创始人一直持有巨额项目国库”的简单故事，但它不是钱包审计。[Markus 公开信](https://www.reddit.com/r/dogecoin/comments/lfl5iz/true_value_an_open_letter_from_billy_markus/)

## 技术与发行机制

Dogecoin 从 Litecoin 等 Bitcoin 派生代码改造而来，并非全新发明的账本架构。核心特征包括：

- Scrypt 工作量证明，目标出块时间约一分钟；
- 早期随机区块奖励，随后按区间递减；
- 第六个奖励区间以后永久保持**每区块10,000 DOGE**；
- 没有总量上限；按365天且准时一分钟出块计算，每年约新增 **52.56亿 DOGE**；
- 名义年发行量固定，因此随着总供应增长，百分比稀释率逐年下降；
- 辅助工作量证明（AuxPoW），让 Litecoin 矿工可以合并挖矿。

永久区块补贴直接写在 Dogecoin Core 的奖励函数里；一分钟目标和 AuxPoW 参数也能在参考实现中核验。[奖励代码](https://github.com/dogecoin/dogecoin/blob/master/src/dogecoin.cpp#L123-L146) [共识参数](https://github.com/dogecoin/dogecoin/blob/master/src/chainparams.cpp)

Dogecoin 在2014年引入 AuxPoW，并于主网区块371,337激活。这把其安全经济与 Litecoin 的 Scrypt 算力产业连接起来，但没有合并两条账本或两种供应。矿工可以让同一份工作同时服务两条链，LTC 与 DOGE 仍是拥有独立节点和交易历史的资产。[Dogecoin Core AuxPoW 历史](https://github.com/dogecoin/dogecoin/discussions/3404)

## 分配与“公平启动”的边界

Dogecoin 没有 ICO、风投轮或基金会售币。公开启动和迅速可用的挖矿客户端，与后来预留大额发行人和投资人份额的代币不同。本次复核没有发现巨额创始人预留。

但这不意味着早期分配绝对平等。随机奖励、早期低算力、消息时差、矿机在线率、矿池、交易所接入、密钥丢失和二级市场购买都会形成集中度。没有地址归属证据时，也不能把富豪榜地址直接认定为 Musk、创始人、交易所或某个个人。

## 社区与治理

Dogecoin 没有公司、CEO 或网络所有人。代码贡献者提出改动，矿工、节点、钱包、交易所、商户和用户决定是否运行并在经济上承认它们。开源仓库把开发明确描述为公开、社区驱动。[Dogecoin Core 仓库](https://github.com/dogecoin/dogecoin)

Dogecoin Foundation 最早在2014年成立，2021年重新活跃，支持开发、倡议、商标管理和社区项目。它是非营利支持组织，不是区块链或全部 DOGE 的法律所有者。Jared Birchall 曾以 Musk 代表身份进入顾问架构，这证明双方存在沟通关系，却不能证明 Musk 控制基金会或协议。[基金会历史](https://foundation.dogecoin.com/about/) [2021年基金会公告](https://dogecoin.org/announcements/2020-08-15-foundation-announcement/)

基金会的 Trailmap 也明确把自己定位为提供给社区讨论的贡献，而非公司式强制路线图。[Trailmap 序言](https://dogecoin.org/trailmap/prologue/)

## Elon Musk、Tesla 与 SpaceX

Musk 与 Dogecoin 的商业和文化关系很重要，但结构边界清晰：

- 他公开表示自己买过一些 DOGE，但没有公开数量和地址；
- Tesla 接受指定商品使用 DOGE 支付，不等于车辆普遍支持 DOGE；
- 他在2022年称 SpaceX 也会接受 DOGE 购买商品，但公司没有发布完整的 DOGE 收入或国库审计；
- Geometric Energy Corporation 宣布以 DOGE 支付 SpaceX 的 DOGE-1 立方星发射合同，但多次延期意味着合同、付款、排期和完成发射是不同事实；
- Musk 的帖子和露面与多次剧烈价格变动时间接近，但相关性不能证明其交易、利润或供应控制。

[Tesla Dogecoin 支持页](https://www.tesla.com/support/dogecoin) [卡塔尔经济论坛文字记录](https://www.rev.com/transcripts/tesla-ceo-elon-musk-at-qatar-economic-forum-6-21-22-transcript) [SEC 对网络与商业用途的说明](https://www.sec.gov/Archives/edgar/data/2055510/000119312526143897/pos_am_doge_s-1_a3.htm)

美国政府后来也曾使用缩写“DOGE”指代 Department of Government Efficiency。名称借用了表情包文化，但该政府项目不是 Dogecoin 网络、基金会、代币发行人、钱包或开发团队。

## 已收录人物

- [埃隆·马斯克](../../people/elon-musk/)：公开持有人、推广者和企业采用决策者，**不是创始人**。

真实创建者 Billy Markus 与 Jackson Palmer 已在本页明确，即使本站暂未建立其完整人物档案。

## 尚未解决的问题

- 仅靠地址排行榜无法确认当前最终受益所有权集中度。
- Musk 的 DOGE 数量、成本、买卖历史、钱包地址和已实现盈亏均未披露。
- Tesla 与 SpaceX 没有发布 DOGE 专项国库对账。
- DOGE-1 的最终发射日和完成状态应只依据 SpaceX、发射服务商或监管记录更新。
- 没有一份公开文档涵盖全部共识规则；代码、版本历史和独立节点仍是运行事实的权威记录。

_最后复核：2026年8月30日。_
