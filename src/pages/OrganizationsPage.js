import { Box, Center, Flex, Grid, GridItem, HStack, Spacer } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import OrganizationsTable from '../components/organizations/OrganizationsTable'
import OrgEventsTable from '../components/organizations/OrgEventsTable'
import UsersTable from '../components/users/UsersTable'
export default function OrganizationsPage() {
  const perms = useSelector((state) => state.user.loggedInUser.perms)
  // Redirect if user accesses page directly via url and does not have permissions 
  // (This is mainly for usability, authorization is of course handled by the api)
  if (typeof perms !== 'undefined' ) {
    if ( typeof perms.organizations === 'undefined' ) {
      return <Navigate to="/" replace />
    }
  }
  return (
      // <Box w="100%" overflow='auto'>
      //   <Flex 
      //     p="0px 15px 0px 15px" 
      //     marginTop="1vh"
      //   >
      //     <OrganizationsTable />
      //   </Flex>
        
      //   <Flex
      //     p="0px 15px 0px 15px" 
      //     marginTop="1vh"
      //     overflowX="auto"
      //   >
      //     <UsersTable />
      //   </Flex>
      //   {/* <Flex
      //     p="0px 15px 0px 15px" 
      //     marginTop="1vh"
      //   >
      //     <AgentUpdater />
      //   </Flex> */}
      // </Box>
      <Center
        height="100%"
        width="100%"
        gap={10}

      >
        <Grid
            h="75%"
            w="100%"
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(24, 1fr)"
            gap={5}
        >
          <GridItem
            height="100%"
            display="flex"
            colSpan={9}
          >
            <OrganizationsTable />
          </GridItem>
          <GridItem
            height="100%"
            display="flex"
            colSpan={15}
          >
            <UsersTable />
          </GridItem>
        </Grid>
      </Center>
  )
}


