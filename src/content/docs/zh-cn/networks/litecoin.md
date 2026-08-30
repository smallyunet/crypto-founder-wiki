---
title: Litecoin（莱特币）
description: Litecoin 网络、2011年公开启动、技术设计、治理及其与创建者李启威的关系。
pageType: network
entityId: litecoin
---

Litecoin 是 **李启威（Charlie Lee）** 基于 Bitcoin 开源代码创建的点对点加密货币。李启威于2011年10月9日发布公告，在启动前公开源码与可执行文件，并于10月13日释放创世参数供公众开始挖矿。

<figure class="network-figure">
  <img src="/crypto-founder-wiki/images/networks/litecoin.svg" alt="银色圆形中的白色 Litecoin L 符号" width="2500" height="2500" loading="eager" fetchpriority="high" />
  <figcaption>Litecoin 标识，Albert dro、Charlie Lee 与 Bushido，来自 <a href="https://commons.wikimedia.org/wiki/File:Litecoin.svg">Wikimedia Commons</a>，采用 <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>；标识可能另受商标规则约束。</figcaption>
</figure>

## 设计与启动

最初公告把 Litecoin 描述为“Bitcoin 是金、Litecoin 是银”。它保留 Bitcoin 的供应上限和工作量证明货币模型，同时改变了若干参数：Scrypt 工作量证明、约2.5分钟出块、每840,000个区块减半，以及约8,400万枚 LTC 的最终上限。公告披露150枚预挖，对应创世区块和两个确认区块；源码与可执行文件提前三天发布，论坛参与者可以投票选择启动时间。这支持“透明公开启动”的描述，但不表示所有参与者拥有完全相同的信息、硬件或挖矿能力。[最初启动公告](https://bitcointalk.org/index.php?topic=47417.0)

Litecoin 是 Bitcoin 的代码派生项目，不是独立发明全新账本架构。它的历史价值在于通过有意调整 Bitcoin 代码形成了长期运行的独立网络，而不是发明工作量证明或区块链。

## 开发里程碑

- Litecoin 于2017年先于 Bitcoin 激活隔离见证（SegWit），为升级提供了具有真实经济价值的运行网络；
- Dogecoin 采用与 Litecoin 的辅助工作量证明，矿工可以通过合并挖矿同时保护两条网络；
- Mimblewimble Extension Blocks（MWEB）于2022年5月激活，以可选扩展区块提供隐藏交易金额和改善可替代性的能力；David Burkett 主导实现，社区和基金会提供资金。[MWEB 激活说明](https://litecoin.com/news/mweb-has-officially-activated)

这些变化不是李启威一人完成的。Litecoin Core 贡献者、矿工、节点运营者、交易平台、钱包开发者和用户共同决定代码是否编写、发出信号、部署并获得经济采用。

## 已收录人物

- [李启威（Charlie Lee）](../../people/charlie-lee/)：Litecoin 初始实现与公开启动的创建者，后来长期担任公共倡导者和 Litecoin Foundation 董事。

## 治理边界

Litecoin 没有 CEO 或公司所有者。Litecoin Foundation 是支持开发、教育、合作和采用的非营利组织，但不拥有网络。李启威因身份公开、创建者地位和长期发声而具有显著影响；矿工和独立节点仍可以自行选择运行哪套共识规则。

准确的边界是：李启威创建并启动了 Litecoin，也能影响其发展方向，但不能单方面拥有用户余额、撤销有效交易或强迫去中心化网络接受软件。
