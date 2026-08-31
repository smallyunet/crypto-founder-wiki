---
title: Dogecoin
description: Dogecoin's founders, 2013 launch, monetary design, Litecoin merged mining, governance, and the precise limits of Elon Musk's role.
pageType: network
entityId: dogecoin
---

Dogecoin is an open-source peer-to-peer cryptocurrency created by software developers **Billy Markus** and **Jackson Palmer** in December 2013. It began as a satire of crypto speculation built around the Doge meme, but developed a durable payment, tipping, fundraising, and mining community.

<figure class="network-figure">
  <img src="/crypto-founder-wiki/images/networks/dogecoin.svg" alt="Gold Dogecoin mark with the letter D and a Shiba Inu silhouette" width="512" height="512" loading="eager" fetchpriority="high" />
  <figcaption>Dogecoin mark from the Dogecoin Foundation's <a href="https://github.com/dogecoinfoundation/dogecoin.com/blob/main/static/logo_silentshibe_dogecoin.svg">official website repository</a>, distributed under the repository's <a href="https://github.com/dogecoinfoundation/dogecoin.com/blob/main/LICENSE">MIT license</a>. Trademark rights may also apply.</figcaption>
</figure>

## Origin and founders

Palmer, then working at Adobe in Sydney, posted a joke combining cryptocurrency enthusiasm with the Doge meme and registered Dogecoin.com. Markus, then an IBM software engineer in Portland, contacted him and implemented the currency. The original Bitcointalk announcement appeared on December 8, 2013, after the network had started on December 6. [Original announcement](https://bitcointalk.org/index.php?topic=361813.0) [Dogecoin developer history](https://dogecoin.com/dogepedia/articles/dogecoin-developers/)

The project was not launched by Elon Musk. Musk's first prominent public Dogecoin comments came years later. He did not write the initial client, set the genesis parameters, mine on behalf of the founders, or create the Dogecoin Foundation.

Both creators later stepped away. Markus wrote in 2021 that he left the project around 2015 and sold or gave away most of his cryptocurrency after losing his job, for approximately the price of a used Honda Civic. That statement is useful evidence against a simple “founders kept a giant treasury” story, but it is not a wallet audit. [Markus's open letter](https://www.reddit.com/r/dogecoin/comments/lfl5iz/true_value_an_open_letter_from_billy_markus/)

## Technical and monetary design

Dogecoin was adapted from Litecoin and other Bitcoin-derived code rather than built as a new ledger architecture. Its main characteristics include:

- Scrypt proof of work and approximately one-minute target block time;
- early variable block rewards, followed by scheduled reductions;
- a permanent subsidy of **10,000 DOGE per block** after the sixth reward interval;
- no maximum supply, producing about **5.256 billion new DOGE per 365-day year** if one-minute blocks occur on schedule;
- a fixed nominal issuance whose percentage dilution declines as total supply grows;
- auxiliary proof of work, allowing Litecoin miners to merge-mine Dogecoin.

The permanent subsidy is explicit in Dogecoin Core's reward function; the one-minute target and AuxPoW parameters are in the reference implementation. [Reward code](https://github.com/dogecoin/dogecoin/blob/master/src/dogecoin.cpp#L123-L146) [Consensus parameters](https://github.com/dogecoin/dogecoin/blob/master/src/chainparams.cpp)

Dogecoin enabled AuxPoW in 2014; it activated on mainnet at block 371,337. This linked Dogecoin's security economics to Litecoin's Scrypt mining industry without merging the two ledgers or supplies. A Litecoin miner can submit work valid for both chains, but LTC and DOGE remain separate assets with separate nodes and transaction histories. [Dogecoin Core AuxPoW history](https://github.com/dogecoin/dogecoin/discussions/3404)

## Distribution and the limits of “fair launch”

Dogecoin had no ICO, venture round, or foundation token sale. The public launch and rapidly available mining client contrast with later token projects that assigned large contractual stakes to issuers and investors. Public records reviewed here do not establish a large founder reserve.

That does not make early distribution perfectly equal. Early variable rewards, low initial hash rate, information timing, mining uptime, pools, exchange access, lost keys, and later market purchases all affected concentration. Current rich-list addresses also cannot be assigned to Musk, founders, exchanges, or individuals without attribution evidence.

## Community and governance

Dogecoin has no company, chief executive, or owner. Code contributors propose changes; miners, node operators, wallets, exchanges, merchants, and users decide whether to run and economically recognize them. The open repository describes development as public and community-driven. [Dogecoin Core repository](https://github.com/dogecoin/dogecoin)

The Dogecoin Foundation was first established in 2014 and reinvigorated in 2021 to support development, advocacy, trademark stewardship, and community projects. It is a nonprofit support organization, not the legal owner of the blockchain or all DOGE. Jared Birchall joined its advisory structure as a representative of Musk; that relationship is evidence of communication, not evidence that Musk controls the Foundation or protocol. [Foundation history](https://foundation.dogecoin.com/about/) [2021 Foundation announcement](https://dogecoin.org/announcements/2020-08-15-foundation-announcement/)

The Foundation's “Trailmap” explicitly describes itself as a contribution to community discussion rather than a binding corporate roadmap. [Trailmap prologue](https://dogecoin.org/trailmap/prologue/)

## Elon Musk, Tesla, and SpaceX

Musk's relationship is commercially and culturally important but structurally limited:

- he has publicly said he personally bought some DOGE, without disclosing quantity or addresses;
- Tesla accepts DOGE for specifically marked merchandise, not generally for vehicles;
- in 2022 he said SpaceX would also accept DOGE for merchandise, but no complete audited revenue or treasury balance has been published;
- Geometric Energy Corporation announced the DOGE-1 CubeSat launch contract with SpaceX as paid in DOGE, but repeated schedule changes mean an announcement or regulator description should not be confused with a completed launch;
- Musk's posts and appearances have coincided with large price moves, but correlation does not identify his trades, profit, or control of supply.

[Tesla Dogecoin support](https://www.tesla.com/support/dogecoin) [Qatar Economic Forum transcript](https://www.rev.com/transcripts/tesla-ceo-elon-musk-at-qatar-economic-forum-6-21-22-transcript) [SEC description of network and commercial uses](https://www.sec.gov/Archives/edgar/data/2055510/000119312526143897/pos_am_doge_s-1_a3.htm)

The U.S. Department of Government Efficiency was also abbreviated “DOGE.” The name deliberately echoed the meme, but the former government initiative was not the Dogecoin network, Foundation, token issuer, wallet, or development team.

## Covered people

- [Billy Markus](../../people/billy-markus/): co-creator and original implementation author.
- [Jackson Palmer](../../people/jackson-palmer/): co-creator who originated the concept, name, and public launch with Markus.
- [Elon Musk](../../people/elon-musk/): disclosed holder, promoter, and corporate adoption decision-maker—not a founder.

## Unresolved questions

- The current concentration of beneficial ownership cannot be inferred from address rankings alone.
- Musk's DOGE quantity, acquisition cost, sale history, wallet addresses, and realized gains or losses are undisclosed.
- Tesla and SpaceX have not published a DOGE-only treasury reconciliation.
- DOGE-1's final launch date and completed mission status should be updated only from SpaceX, launch-provider, or regulator records.
- No single public document captures every consensus rule; code, release history, and independently operated nodes remain the authoritative operational record.

_Last reviewed August 30, 2026._
