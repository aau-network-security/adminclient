import { Icon, Input, InputGroup, InputLeftElement, InputRightAddon } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { MdOutlineSavedSearch, MdOutlinedFlag, MdSearch } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchParam } from '../../features/challenges/challengeSlice';

function SearchBarCard() {
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    dispatch(setSearchParam(lowerCase))
  }
  
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
    
    <Input placeholder='Search' color='black' size='md' 
    onChange={changeHandler}
    />
    </InputGroup>
    
    
    </>
    
  )
}

export default SearchBarCard