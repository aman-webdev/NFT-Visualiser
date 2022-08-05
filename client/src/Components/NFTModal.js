import React from 'react'
import styled from 'styled-components'

const NFTModal = ({nft,isModalOpen,setIsModalOpen}) => {
  return (
    <Modal onClick={()=>setIsModalOpen(!isModalOpen)}>
        <ModalContent onClick={(e)=>e.stopPropagation()}>
            <ModalGrid>
                <NFTPhoto style={{backgroundImage:`url(${nft && nft.image})`}}/>
                <div>
                    <ModalTitle>{nft && nft.name}</ModalTitle>
                    <Paragraph>{`You own ${nft.copies} copies`}</Paragraph>
                    <SectionText>Description</SectionText>
                    <Paragraph style={{width:"400px"}}>{nft.description}</Paragraph>
                    <SectionText>Attributes</SectionText>
                    {nft.attributes && 
                        nft.attributes.map((attr,i)=>(
                          <div key={i}>
                            <AttributeContainer style={{margin:"10px 0px 5px 0px"}}>
                                <AttributeText>{attr.trait_type}</AttributeText>
                                <AttributeText>{attr.value}</AttributeText>
                            </AttributeContainer>
                          </div>
                        ))
                    }
                    </div>
            </ModalGrid>
        </ModalContent>
    </Modal>
  )
}

const Modal = styled.div`
position:fixed;
display: flex;
align-items: center;
z-index: 1000;
inset: 0;
background: rgba(0,0,0,.5);
`
const ModalContent = styled.div`

width:900px;
margin:auto;
background:white;
border-radius: 20px;
padding: 20px;
`
const ModalTitle=styled.h1`
margin:0;
`
const Paragraph = styled.p`
margin:0 0 15px 0;
`

const SectionText = styled.h3`
margin:5px 0 5px 0;
`

const ModalGrid = styled.div`
display:grid;
grid-template-columns: 1fr 1fr;
grid-gap:40px;

`
const NFTPhoto=styled.div`
width:400px;
height:400px;
background-position: center center;
background-size: cover;
border-radius: 10px;
margin: auto;
`

const AttributeText = styled.h4`
color:gray;
margin:0;
`

const AttributeContainer=styled.div`
display: flex;
align-items: center;
justify-content:space-between;
`
export default NFTModal