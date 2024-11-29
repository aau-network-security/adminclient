import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, chakra, IconButton, Flex, Spacer, Center, Icon, Spinner, MenuButton, Menu, MenuItem, MenuList } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrg, fetchOrgs, selectOrg } from '../../features/organizations/organizationSlice';
import LoadingSpin from 'react-loading-spin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import UserDialogDelete from './UserDialogDelete';
import { Tooltip } from 'react-tooltip';
import {
  IoMdAdd,
  IoMdRefresh,
} from 'react-icons/io'
import {
  TiTick
} from 'react-icons/ti'
import {
  RxCross2
} from 'react-icons/rx'
import { RiEditLine } from 'react-icons/ri'
import NewUserModal from './NewUserModal';
import { deleteUser, fetchUsers } from '../../features/users/userSlice';
import { MdDelete, MdMenu } from 'react-icons/md';
import { BsThreeDotsVertical } from "react-icons/bs";
import { defaultTheme } from '../..';
import { IoInfiniteOutline } from 'react-icons/io5';
import UpdateUserModal from "./UpdateUserModal.js"

function UsersTable({ byRole }) {
  const IconFa = chakra(FontAwesomeIcon)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [usernameState, setUsernameState] = useState('')
  const onAlertClose = () => setIsAlertOpen(false)

  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false)
  const onNewUserModalClose = () => setIsNewUserModalOpen(false)

  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false)
  const onUpdateUserModalClose = () => setIsUpdateUserModalOpen(false)

  const cancelRef = React.useRef()
  const [indexState, setIndexState] = useState(0)

  const status = useSelector((state) => state.user.status)
  const selectedOrg = useSelector((state) => state.org.selectedOrg)
  const error = useSelector((state) => state.user.error)
  const statusCode = useSelector((state) => state.user.statusCode)
  const users = useSelector((state) => state.user.users)
  const loggedInUser = useSelector((state) => state.user.loggedInUser)

  const dispatch = useDispatch()
  
  
  //Callback for alertDialog 
  // TODO write deleteOrg action, reducer, etc.
  const doDeleteUser = (username, index) => {
    let user = {
      id: index,
      name: username
    }
    dispatch(deleteUser(user))
  }
  
  useEffect(() => {
    if (selectedOrg != null) {
      dispatch(fetchUsers(selectedOrg.Name))
    } else {
      dispatch(fetchUsers(""))
    }
  }, [dispatch, selectedOrg])

  const openAlertDialog = (username, index) => {
    setUsernameState(username)
    setIndexState(index)
    setIsAlertOpen(true)
  }

  const openUpdateModal = (username) => {
    setUsernameState(username)
    setIsUpdateUserModalOpen(true)
  }

  const openModal = () => {
    setIsNewUserModalOpen(true)
  }

  return (
      <Flex 
        w="100%" 
        h="100%"
        className='container'
        flexDir="column"
      >
            <Flex className='container-header'>
              <h2 className='container-header-text'>Users</h2>
              <Spacer />
              <IconButton 
                className='container-header-button'
                colorScheme='aau.buttonGreen'
                variant='ghost'
                icon={<Icon as={IoMdAdd}/>}
                data-tooltip-content="Add User"
                data-tooltip-place="left"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-add-user"
                onClick={openModal}
              />
              <Tooltip 
                id={"tooltip-add-user"}
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
                            
              : Object.keys(users).length === 0 
              ?
              <Center>
                <h2>No users registered</h2>
              </Center>
              :
                <>
                  <TableContainer  overflowY="unset" height="95%">
                    <Table variant='simple' size="sm">
                      <Thead position="sticky" top={0} zIndex="docked" backgroundColor="white">
                        <Tr>
                          <Th>Username</Th>
                          <Th>Name</Th>
                          <Th>Email</Th>
                          <Th>Organization</Th>
                          <Th>Role</Th>
                          {/* <Th isNumeric>Lab quota</Th> */}
                          <Th textAlign="center">Action</Th>           
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.entries(users).map(([key, user]) => (
                          <Tr 
                            key={user.user.Username}
                            height="57px"
                          >
                            <Td>{user.user.Username}</Td>
                            <Td>{user.user.FullName}</Td>
                            <Td>{user.user.Email}</Td>
                            <Td>{user.user.Organization}</Td>
                            <Td>{user.user.Role.split('role::')[1]}</Td>
                            {/* <Td isNumeric>{user.user.LabQuota != null ? 
                              user.user.LabQuota 
                            : (
                            <Icon fontSize={"17px"} as={IoInfiniteOutline}/>
                            )}
                            </Td> */}
                            <Td textAlign="center">
                              {(loggedInUser.user.Role === "role::administrator" || loggedInUser.user.Role === "role::superadmin" || user.user.Username === loggedInUser.user.Username) && (
                                <>
                                   {/* can be used in future for editing a user
                                   <IconButton
                                //     aria-label='Edit user'
                                //     colorScheme='gray'
                                //     variant='ghost'
                                //     icon={<RiEditLine />}      
                                //     marginRight={"10px"}          
                                //     onClick={openUpdateModal}
                                //   />        */}
                                  {user.user.Username !== loggedInUser.user.Username && (loggedInUser.user.Role === 'role::superadmin' || loggedInUser.user.Role === 'role::administrator') && (
                                    <Menu>
                                      <MenuButton
                                        as={IconButton}
                                        aria-label='Options'
                                        icon={<BsThreeDotsVertical/>}
                                        variant='ghost'
                                        colorScheme='gray'
                                      />
                                      <MenuList>
                                        <MenuItem onClick={() => openUpdateModal(user.user.Username)}>Update password</MenuItem>
                                        <MenuItem>Update role</MenuItem>
                                        {loggedInUser.user.Role === 'role::superadmin' && <MenuItem>Update organization</MenuItem>}
                                        <MenuItem color='aau.buttonRed' onClick={() => openAlertDialog(user.user.Username, key)}>Delete</MenuItem>
                                      </MenuList>
                                    </Menu>
                                    // <IconButton
                                    //   aria-label='Delete organization'
                                    //   colorScheme='aau.buttonRed'
                                    //   variant='ghost'
                                    //   fontSize="20px"
                                    //   icon={<MdDelete />}
                                    //   onClick={() => openAlertDialog(user.user.Username, key)}                  
                                    // />  
                                  )}
                                </>
                              )}
                              
                                                
                            </Td>
                            
                            <Td textAlign="center">
                                                     
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  <UserDialogDelete 
                    username={usernameState}
                    index={indexState}
                    isOpen={isAlertOpen}
                    onClose={onAlertClose}
                    cancelRef={cancelRef}
                    deleteUser={doDeleteUser}
                  ></UserDialogDelete>
                </>      
              }
              <NewUserModal isOpen={isNewUserModalOpen} onClose={onNewUserModalClose}/>
              <UpdateUserModal isOpen={isUpdateUserModalOpen} onClose={onUpdateUserModalClose} username={usernameState}/>
              {/* can be used when update user is implemented again */}
              {/* <UpdateUserModal isOpen={isUpdateUserModalOpen} onClose={onUpdateUserModalClose}/> */}
      </Flex>
  )
}

export default UsersTable