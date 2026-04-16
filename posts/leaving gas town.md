---
title: Leaving Gas Town — What Happens When the AI Bubble Bursts?
date: 2026-04-12
---

Let's get this out of the way first: yes, we are in a bubble. Like any good bubble, the AI race is being driven by FOMO. Investors are afraid of missing out on a massively profitable, winner-takes-all endgame. Companies are afraid of losing to the competition if they are last to adopt AI. The United States is afraid of losing to China. 

But please, dear reader, don’t mistake me for an AI naysayer. I’ve seen what this technology can *already* do. If all new development froze today, AI would still be one of the largest technology advances ever. It would take years, and more likely decades, for society to fully metabolize the impact.

So: AI is currently driven by FOMO, and *also* AI is a genuine leap in technology. This combination—real innovation wrapped in speculative excess—is precisely what makes it a bubble rather than pure fraud. The technology works. The economics might not.

The interesting question isn’t whether we are in a bubble: it’s what happens when it pops.

### We've Seen This Show Before

Uber offers an instructive parallel. The product was compelling: tap a button, get a ride. Growth was explosive, and no one wanted to miss out on the next Facebook. The pitch to investors rested on two long-term promises: ride-hailing would be winner-takes-all, and autonomous vehicles would eventually replace human drivers, unlocking massive profitability. As capital flooded in, Uber used this money to subsidize predatory pricing that undercut taxis and bought market share.

Reality proved messier. Ride-hailing has limited network effects, and once the cheap rides were over users became intensely price-sensitive. And as for the promise of autonomous vehicles… Uber never got there. Only today, over a decade later, are we finally starting to see self-driving technology that's good enough – and it's an entirely different technology stack built by a different set of companies.[^1]

This AI bubble rhymes. Armed with compelling technology and eye-popping user growth, AI companies are raising unheard-of amounts of money. They are making the same two long-term promises: a winner-takes-all market with near infinite profitability unlocked by the imminent arrival of AGI that can replace humans for nearly any task. And they're using this money to get people and companies hooked on using AI at heavily subsidized prices. 

### When the bubble bursts, the AI race will shift from capability to cost

Today, model providers compete on capability. Who can score highest on benchmarks? Which coding assistant can tackle the hardest problems? And as long as investors are buying the bubble narrative, money will keep pouring in and I expect capability will continue to improve. Today’s models are very capable at some tasks, but they are not good enough to completely replace humans. Adoption is patchy – some professionals use it a lot, others not at all.

The capability-race is largely driven by the bubble money. AI companies compete on capability through the creation of larger data sets and datacenters. They also compete by creating token-hungry tools like Claude Code, and then pairing those tools with *heavily* subsidized monthly plans. This practice masks the true cost of inference, and the true demand for current AI at its actual cost. It also creates artificial customer loyalty. If you pay for a monthly plan, you are incentivized to use that plan as much as possible. In addition, most providers force you to use their tools with their monthly plans.

However, this loyalty is not likely to persist when the bubble bursts. When capital becomes scarce, companies will be forced to raise prices to cover their losses. The cost per token will go up dramatically, and cheap monthly plans will disappear. Suddenly, developers and startups who have built products on the assumption of cheap tokens will find themselves in trouble. They may be willing to pay more overall, but because their workflows are so token intensive, they will be highly motivated to find options that are more token efficient and cheaper on a per-token basis – even if that means learning a new model or accepting slightly worse capabilities or tooling.

The result will be intense demand for cost-efficiency –  the cheapest ($/token) models, and most token-efficient tooling. Any model that is capable enough to meet *current* workflows will be good enough. Without price subsidies, model providers won't be able to force you to use their tools, and users will use whichever tool does what they need and burns the fewest tokens. Thus, the market will shift from a small number of frontier model providers racing toward AGI, to commodity model and tool providers racing on cost.

### A price race is also a performance race

In a price race, performance will suddenly become a key driver of competition. Faster inference unlocks more tokens per minute on the same hardware, thereby lowering costs. More efficient GPUs mean more tokens per minute – and more tokens per watt. New architectural optimizations that drive speed up will drive real costs down. The economic pressure to optimize will be relentless, and this will create increasingly faster models.

To highlight how this shift will happen, consider this thought experiment. Imagine you are a developer that relies on Claude for your daily work. You were paying $200 a month, but suddenly those costs go up to $1k or more. In this world, would you take a Claude that is 20% dumber but 5x cheaper? 

Maybe you would take that trade. However, I bet you probably wouldn't have a year ago. Claude just wasn’t good enough to accept a 20% capability hit. And by the same token (sorry), let’s say you *wouldn’t* take the trade. I bet you might in a year or so, as Claude continues to improve. The point is, at some point in the recent past or near future, Claude will have become “good enough” for you. At that point, in a market where true costs are borne by customers, you will care more about cost than capability. 

Now let’s continue the thought experiment, imagining that 5x cheaper Claude is *also* 3x faster! I bet for many of today’s Claude power users, that’s starting to sound like a pretty good trade. Not only are you paying less, but you are waiting a lot less on Claude as well, and your time is still worth a lot more than Claude’s.

Finally, let’s imagine that clever product people start taking advantage of this new speed, building tools that deliver tighter human-AI collaboration that is optimized for speed and efficiency, rather than spawning legions of autonomous agents that gobble up mountains of tokens. At this point, not only has the market shifted to competing on cost, but ever faster performance has *also* started to unlock innovation in the product space. Suddenly there is a flywheel effect: as model providers race to deliver more efficient inference, product innovators race to deliver even more efficient token use and take advantage of even more responsive models.

### Leaving Gas Town

Today the bleeding edge is agentic coding. Users burn through massive token budgets via parallelization across as many GPUs as possible. This is epitomized by [Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04), a wild (and aptly named) framework that spawns hundreds of agents acting in prescribed roles ranging from [“polecat” to “mayor”.](https://www.alilleybrinker.com/mini/gas-town-decoded/) After all, when tokens are cheap, why not throw more compute at the problem?

When the cheap gas goes away, everyone will leave Gas Town. Tomorrow's bleeding edge might be efficiency hacks that make inference 10x cheaper – and 10x faster. This will not only enable more efficiency, it will enable entirely different paradigms. 

If you think Gas Town is unsustainable, it’s worth thinking about what your product or company can do *now* to be better positioned for its end. What can you do to increase the efficiency of your product? What can you do to foster a culture of efficiency in your company? What innovations in your product could you develop that will take advantage of ever-faster models? When the bubble bursts, the companies with the best answers to these questions will be the ones winning the new race that focuses on cost – and the companies whose fitness depends on burning money and tokens will quickly fail.

[^1]: Ironically, the thing that ended up saving Uber's bacon was the same thing that enabled the Taxi industry it replaced: regulatory capture. As they amassed their war chest to deliver on self-driving cars, they quietly built an army of lobbyists that successfully engineered favorable regulations in state and local governments across the country. As a result, Uber (and Lyft) have been able to raise their prices far higher, to the point where they are finally profitable. Users might not like it, but in most places they are the only game in town! This will no doubt play out very differently in the AI market, we already know OpenAI (and Anthropic) are pushing hard for favorable regulation. When the bubble bursts, I would be very surprised if they did not turn to regulatory capture to build a moat around their business.