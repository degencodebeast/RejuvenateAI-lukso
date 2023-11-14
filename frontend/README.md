# RejuvenateAI x Web3 ATL hack 

Live Demo - [Loom video](https://www.loom.com/share/5a032880b54a422db23ef9edde0b9fdb) <br />
Live Link - [RejuvenateAI dapp](https://rejuvenate-ai-czgn.vercel.app/) <br />

## ✨ Description

[RejuvenateAI](https://rejuvenate-ai-czgn.vercel.app/) is the first community blockchain based project powered by community built for community to promote healthy living and achieve  healthy locations where people live up to a 100 years all around the world. We are trying to make sure people live healthy by incorporating healthy habits into their lifestyle and trying to make sure they get the most out of the human experience by discovering their purpose if they haven't already and enjoying this life, all while doing it together as a community being accountable to each other.

## Inspiration

People are becoming obsessed with living longer, but they don't know how, they are spending so much money on drugs and supplements, but are they really doing it correctly? We don't think so, so that's why we at RejuvenateAI have come up with this idea to focus on nutrition and fitness. What if we can create communities that are focused on living up to 100 years. 

## What we built

Our features empower personal healthy living habits by:

- Allowing users to setup meetings with nutritionists who would offer professional consultation to them.
- Providing educative articles that can inspire users to live healthier lives. 
- Providing educative meal and fitness plans that paid subscribers have access to.

## 💻 How we built RejuvenateAI

Here's a breakdown of how it was built:


1. Users can sign up with the ```joinCommunity``` function, which they will pay the subscription fee and then get onboarded into our platform to enjoy our services

2. Nutritionists can sign up with the ```applyForNutritionistRole``` function, which they will pass their credentials into and have their application status set to pending.

3. We will then see their applicaiton status, and after verifying their credentials and see that it's legitimate we can now approve their status by calling the ```approveNutritionistRole``` function, which will approve the nutritionists and set their application status as accepted, and they can now be onboarded into our platform.

4. Now these nutritionists can now create meal plans by calling ``createMealPlans`` which will create meal plans for users to access.


## Where we deployed to/contract details

We created and deployed our smart contracts on the Arbitrum Goerli testnet chain. 

### Arbitrum Goerli Testnet

1. Community contract 0x3a65168B746766066288B83417329a7F901b5569 - [View source code](https://github.com/WEB3ATL/smart-contracts/blob/main/contracts/Community.sol) | [View on ArbitrumGoerli](https://goerli.arbiscan.io/address/0x3a65168B746766066288B83417329a7F901b5569)

2. Treasury contract 0x9E1eF5A92C9Bf97460Cd00C0105979153EA45b27 - [View source code](https://github.com/WEB3ATL/smart-contracts/blob/main/contracts/Treasury.sol) | [View on ArbitrumGoerli](https://goerli.arbiscan.io/address/0x9E1eF5A92C9Bf97460Cd00C0105979153EA45b27)

3. User NFT contract 0x6D919b8dC30BEf41b56Aa8b18b2052c9459F8E9A - [View source code](https://github.com/WEB3ATL/smart-contracts/blob/main/contracts/UserNFT.sol) | [View on ArbitrumGoerli](https://goerli.arbiscan.io/address/0x6D919b8dC30BEf41b56Aa8b18b2052c9459F8E9A)

4. Nutritionist NFT contract 0xA39d26482B5c226Fd02A5f3e159C72ee03d63Fc0 - [View source code](https://github.com/WEB3ATL/smart-contracts/blob/main/contracts/NutritionistNFT.sol) | [View on ArbitrumGoerli](https://goerli.arbiscan.io/address/0xA39d26482B5c226Fd02A5f3e159C72ee03d63Fc0)


