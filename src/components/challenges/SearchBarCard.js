import { Icon, Input, InputGroup, InputLeftElement, InputRightAddon } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineSavedSearch, MdOutlinedFlag, MdSearch } from 'react-icons/md'

function SearchBarCard() {
  return (
    <>
    
    <InputGroup borderRadius={5} 
                borderColor="white"
                size="md" 
                padding="0px"
                backgroundColor="white" 
                boxShadow='md'
                dropShadow="#161616"
                >
    <InputLeftElement
          pointerEvents="none"
          children={<Icon
            as={MdSearch}
            fontSize="30px"
            
            color="#211a52"
        />}
        />
    
    <Input placeholder='Search' color='black' size='md' />
    </InputGroup>
    
    
    </>
    
  )
}

export default SearchBarCard