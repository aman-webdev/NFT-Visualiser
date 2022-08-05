const { NFTStorage, File } = require('nft.storage')
const mime = require('mime')
const path = require('path')
const fs = require('fs')
require("dotenv").config()

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

function fileFromPath(filePath) {
  const content = fs.readdirSync(filePath);
  
  const type = mime.getType(filePath);

  const result = new File([content], path.basename(filePath), { type });
console.log(result);
  return result;
}

const storeNFT = async (items,basePath) => {
    const tokenUris=[];
    
      

        const image = fileFromPath(`${basePath}/images`);
        const json = fileFromPath(`${basePath}/json`);
        const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY });
        
        const result = await nftStorage.store({
          json,
          image,
        });
      
        console.log(result)
    

    // console.log(tokenUris);
  
};
console.log(process.argv[2])
// storeNFT(8,"./metadata");