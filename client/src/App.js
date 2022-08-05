import { useState,useEffect } from "react";
import NFTCard from "./Components/NFTCard";
import styled from "styled-components";
import NFTModal from "./Components/NFTModal";
import SuperMarioCollection from "./SuperMarioWorldCollection.json";
import { ethers } from "ethers";
import axios from "axios";

const nfts = [
  { name: "Mario", symbol: "SMWC", copies: 10, image: "" },
  { name: "Mario", symbol: "SMWC", copies: 1, image: "" },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState({});
  const [NFTs, setNFTs] = useState([]);
  const [account,setAccount]=useState("");

 
  const getMetadataFromIpfs=async(tokenUri)=>{
    let metadata = await axios.get(tokenUri)
    return metadata.data
  }

  const connectWallet=async()=>{
    const {ethereum}=window;
    if(!window.ethereum) return alert("Install metamask to continue...");
    const account = await ethereum.request({method:"eth_requestAccounts"})
    setAccount(account[0]);
  }

  useEffect(()=>{
    const getNFTs = async (address) => {
      const rpc =
        process.env.REACT_APP_RPC_URL || "https://rpc-mumbai-maticvigil.com";
      const ethersProvider = new ethers.providers.JsonRpcProvider(rpc);
      const nftCollection = new ethers.Contract(
        "0xc56e85468fec969ca689897e64b91fb6cfa33ff8",
        SuperMarioCollection.abi,
        ethersProvider
      );
  
      const numberOfNFTs = (await nftCollection.tokenCount()).toNumber();
      const collectionSymbol  = await nftCollection.symbol();
  
      let accounts = Array(numberOfNFTs).fill(address);
      let ids = Array.from({length: numberOfNFTs},(_,i)=>i+1)
      let copies = await nftCollection.balanceOfBatch(accounts,ids)
  
      const tempArr=[]
      let baseUrl=""
  
      for(let i=1;i<=numberOfNFTs;i++) {
          if(i===1){
            let tokenUri = await nftCollection.uri(i);
            baseUrl = tokenUri.replace(/\d+.json/,"")
            let metadata = await getMetadataFromIpfs(tokenUri);
            metadata = {...metadata,symbol:collectionSymbol,copies:copies[i-1]}
            tempArr.push(metadata)
          }else{
            let metadata = await getMetadataFromIpfs(`${baseUrl}/${i}.json`);
            metadata = {...metadata,symbol:collectionSymbol,copies:copies[i-1]}
            tempArr.push(metadata)
          }
      }
  
      setNFTs(tempArr)
    };
  
    connectWallet()
    if(account) getNFTs(account)
  },[account])
  return (
    <MainContainer>
      <Title>Super Mario World Collection</Title>
      <SubTitle>The rarest and best of super mario world</SubTitle>
      <Container className="App">
        {NFTs.map((nft) => (
          <NFTCard
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            setSelectedNFT={setSelectedNFT}
            key={nft.name}
            metadata={nft}
          />
        ))}
      </Container>
      {isModalOpen && (
        <NFTModal
          nft={selectedNFT}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </MainContainer>
  );
}

const Container = styled.div`
  width: 80%;
  padding: 1rem;
  display: grid;
  grid-row-gap: 30px;
  margin: auto;
  margin-top: 4rem;
  grid-template-columns: repeat(auto-fit, 250px);
`;

const MainContainer = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  margin: 0.5rem 0;
  text-align: center;
`;
const SubTitle = styled.h4`
  margin: 0.5rem 0;
  margin-bottom: 1rem;
  text-align: center;
  color: gray;
`;

export default App;
