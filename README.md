# Basic Sample Hardhat Project

Vote example with Remix example (Ballot3.sol) and simple web front end using ViteJS and Tailwind

```shell
git clone -b frontend https://github.com/wwarodom/ballot.git 
```

### Start deploy Ballot3 contract
```shell
cd ballot
npm i
npx hardhat run script scripts/deploy-ballot3.ts --network localhost 
npx hardhat node
```

### Start ViteJS frontend
```shell
cd frontend
npm i
npm run dev
```
