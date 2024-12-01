import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, chakra, IconButton, Flex, Spacer, Center, Icon, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrg, fetchOrgs, selectOrg } from '../../features/organizations/organizationSlice';
import LoadingSpin from 'react-loading-spin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import OrgDialogDelete from './OrgDialogDelete';
import { Tooltip } from 'react-tooltip';
import {
  IoMdAdd,
  IoMdInfinite,
  IoMdRefresh,
} from 'react-icons/io'
import {
  IoInfiniteOutline
} from 'react-icons/io5'
import {
  TiTick
} from 'react-icons/ti'
import {
  RxCross2
} from 'react-icons/rx'
import NewOrgModal from './NewOrgModal';
import { MdDelete } from 'react-icons/md';
import { defaultTheme } from '../..';

function OrganizationsTable() {
  const IconFa = chakra(FontAwesomeIcon)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [orgNameState, setOrgNameState] = useState('')
  const onAlertClose = () => setIsAlertOpen(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const onModalClose = () => setIsModalOpen(false)

  const cancelRef = React.useRef()
  const [indexState, setIndexState] = useState(0)

  const status = useSelector((state) => state.org.status)
  const error = useSelector((state) => state.org.error)
  const statusCode = useSelector((state) => state.org.statusCode)
  const orgs = useSelector((state) => state.org.organizations)
  const selectedOrg = useSelector((state) => state.org.selectedOrg)
  const dispatch = useDispatch()
  
  //Callback for alertDialog 
  // TODO write deleteOrg action, reducer, etc.
  const doDeleteOrg = (orgName, index) => {
    let org = {
      id: index,
      name: orgName
    }
    dispatch(deleteOrg(org))
  }
  
  useEffect(() => {
      dispatch(fetchOrgs())
  }, [dispatch])

  const setSelectedOrg = (org) => {
    dispatch(selectOrg(org))
  }

  const openAlertDialog = (orgName, index) => {
    setOrgNameState(orgName)
    setIndexState(index)
    setIsAlertOpen(true)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Flex 
        w="100%" 
        h="100%"
        className='container'
        flexDir="column"
      >
            <Flex className='container-header'>
              <h2 className='container-header-text'>Organizations</h2>
              <Spacer />
              <IconButton 
                className='container-header-button'
                colorScheme='aau.buttonGreen'
                variant='ghost'
                icon={<Icon as={IoMdAdd}/>}
                data-tooltip-content="Add Organization"
                data-tooltip-place="left"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-add-org"
                onClick={openModal}
              />
              <Tooltip 
                id={"tooltip-add-org"}
                style={{
                    backgroundColor: defaultTheme.colors.aau.primary
                }}
              />
            </Flex>
              {status === 'fetching'
              ?
              <Center height="100%" width="100%" position="relative">
                <Spinner color="aau.primary" size="" height="100px" width="100px" thickness="5px"/>
              </Center>
                            
              : Object.keys(orgs).length === 0 
              ?
              <Center>
                <h2>No organizations registered</h2>
              </Center>
              :
                <>
                  <TableContainer  overflowY="unset" height="95%">
                    <Table variant='simple' size="sm">
                      <Thead position="sticky" top={0} zIndex="docked" backgroundColor="white">
                        <Tr>
                          <Th>Name</Th>
                          <Th>Owner</Th>
                          <Th>Owner Email</Th>
                          {/* <Th isNumeric>Lab Quota</Th>   */}
                          <Th textAlign="center">Delete</Th>                  
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.entries(orgs).map(([key, org]) => (
                          <Tr 
                            key={org.Name} 
                            _hover={{backgroundColor: "aau.hover", cursor: "pointer"}} 
                            onClick={() => setSelectedOrg(org)}
                            backgroundColor={!selectedOrg ? "" : selectedOrg.Name === org.Name ? "aau.hover" : ""  }
                          >
                            <Td>{org.Name}</Td>
                            <Td>{org.OwnerUser}</Td>
                            <Td>{org.OwnerEmail}</Td>
                            {/* <Td isNumeric>{org.LabQuota != null ? 
                              org.LabQuota 
                            : (
                            <Icon fontSize={"17px"} as={IoInfiniteOutline}/>
                            )}
                            </Td> */}
                            <Td textAlign="center">
                              <IconButton
                                aria-label='Delete organization'
                                colorScheme='aau.buttonRed'
                                variant='ghost'
                                fontSize="20px"
                                icon={<MdDelete />}
                                onClick={() => openAlertDialog(org.Name, key)}                  
                              />                         
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <OrgDialogDelete 
                    orgName={orgNameState}
                    index={indexState}
                    isOpen={isAlertOpen}
                    onClose={onAlertClose}
                    cancelRef={cancelRef}
                    deleteOrg={doDeleteOrg}
                  ></OrgDialogDelete>
                  
                </>      
              }
              <NewOrgModal isOpen={isModalOpen} onClose={onModalClose}/>
      </Flex>
    </>
    
  )
}

export default OrganizationsTable