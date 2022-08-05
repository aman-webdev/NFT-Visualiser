import React from 'react'
import styled from "styled-components"
const NFTCard = ({metadata,setIsModalOpen,isModalOpen,setSelectedNFT }) => {

    
  return (
    <Card onClick={()=>{
        setIsModalOpen(!isModalOpen)
        setSelectedNFT(metadata)
        }}>
        <NFTPhoto style={{backgroundImage:`url(${metadata && metadata.image})`}}/>
        <Container>
            <NFTText>
                { metadata && metadata.symbol}

            </NFTText>
            <Flex>
            <NFTName>{metadata && metadata.name}</NFTName>
            <NFTName>{`x${metadata && metadata.copies}`}</NFTName>
            </Flex>
        </Container>
    </Card>
  )

  
}

const Card = styled.div`
width:200px;
height:250px;
margin:auto;
border-radius: 10px;
padding:0px;
cursor: pointer;
box-shadow: 8px 8px 16px #d9d9d9,
-8px -8px 16px  #ffffff; 
`

const NFTPhoto=styled.div`
width:200px;
height:200px;
background-position: center center;
background-size: cover;
border-radius: 10px;
margin: auto;
`

const NFTText = styled.div`
font-size:12px;
color: gray;
`

const NFTName = styled.div`
font-size: 12px;
font-weight: bold;

`

const Flex = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
const Container=styled.div`
margin:5px;
`
export default NFTCard