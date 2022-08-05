const {ethers,network}=require("hardhat")

const deploy=async()=>{
  const ARGS = ["SuperMarioWorldCollection","SMWC","https://ipfs.io/ipfs/QmR7YxBTrVQCwW6B4wJVgP3KaRrjjZARquL7eJnDkkZM85/"]
  const contractFactory = await ethers.getContractFactory("SuperMarioWorldCollection");
  const contract = await contractFactory.deploy(...ARGS);
  await contract.deployed()

  console.log("Contract deployed successfully to" , contract.address);

  await contract.mint(2);
  await contract.mint(2);
  await contract.mint(2); 
  await contract.mint(2);
  await contract.mint(1);
  await contract.mint(1);
  await contract.mint(1);
  await contract.mint(1);
}


deploy();