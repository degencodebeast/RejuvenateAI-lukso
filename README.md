# RejuvenateAI x Lukso hack 

Live Demo - [Youtube video](https://youtu.be/G7vAsMd6zR0) <br />
Live Link - [RejuvenateAI dapp](https://rejuvenate-ai-lukso-two.vercel.app/) <br />

## ✨ Description

[RejuvenateAI](https://rejuvenate-ai-czgn.vercel.app/) is the first community blockchain based project powered by community built for community to promote healthy living and achieve  healthy locations where people live up to a 100 years all around the world. We are trying to make sure people live healthy by incorporating healthy habits into their lifestyle and trying to make sure they get the most out of the human experience by discovering their purpose if they haven't already and enjoying this life, all while doing it together as a community being accountable to each other.

## Inspiration

People are becoming obsessed with living longer, but they don't know how, they are spending so much money on drugs and supplements, but are they really doing it correctly? We don't think so, so that's why we at RejuvenateAI have come up with this idea to focus on nutrition and fitness. What if we can create communities that are focused on living up to 100 years. 

## What we built

Our features empower personal healthy living habits by:

- Allowing users to setup meetings with nutritionists who would offer professional consultation to them.
- Providing educative articles that can inspire users to live healthier lives. 
- Providing educative meal and fitness plans that paid subscribers have access to.
- Users can interact with each other in our communities and work on health goals/challenges together.
- Users can set up in real life events in communities and meet up and do healthy activities together like long walks, marathons etc.

## 💻 How we built RejuvenateAI

Here's a breakdown of how it was built:


1. Users can sign up with the ```register``` function, which they will pay the subscription fee and then get onboarded into our platform to enjoy our services

2. Nutritionists can sign up with the ```applyForNutritionistRole``` function, which they will pass their credentials into and have their application status set to pending.

3. We will then see their applicaiton status, and after verifying their credentials and see that it's legitimate we can now approve their status by calling the ```approveNutritionistRole``` function, which will approve the nutritionists and set their application status as accepted, and they can now be onboarded into our platform.

4. Now these nutritionists can now create meal plans by calling ``createMealPlans`` which will create meal plans for users to access.


## Where we deployed to/contract details

We created and deployed our smart contracts on the Lukso testnet chain. 

### Lukso Testnet

1. CommunityNetwork contract 0xb5c93ACAc8d4499293e81Fb07298c29d1DA4a455 - [View source code](https://github.com/degencodebeast/RejuvenateAI-lukso/blob/main/smart-contracts/contracts/CommunityNetwork.sol) | [View on lukso](https://explorer.execution.testnet.lukso.network/address/0xb5c93ACAc8d4499293e81Fb07298c29d1DA4a455)

2. Treasury contract 0x192F0e1D589bEB01b5FFEF701a0a5B7049FFFa34 - [View source code](https://github.com/degencodebeast/RejuvenateAI-lukso/blob/main/smart-contracts/contracts/Treasury.sol) | [View on lukso](https://explorer.execution.testnet.lukso.network/address/0x192F0e1D589bEB01b5FFEF701a0a5B7049FFFa34)

3. User NFT contract 0x88cF82a3EfE628B35e5eca8817681f94F5ed15Df - [View source code](https://github.com/degencodebeast/RejuvenateAI-lukso/blob/main/smart-contracts/contracts/UserNFT.sol) | [View on lukso](https://explorer.execution.testnet.lukso.network/address/0x88cF82a3EfE628B35e5eca8817681f94F5ed15Df)

4. Nutritionist NFT contract 0x628ff8D815a6e3Eb6Fe84BfeC3c47692729ba3F3 - [View source code](https://github.com/degencodebeast/RejuvenateAI-lukso/blob/main/smart-contracts/contracts/NutritionistNFT.sol) | [View on lukso](https://explorer.execution.testnet.lukso.network/address/0x628ff8D815a6e3Eb6Fe84BfeC3c47692729ba3F3)


