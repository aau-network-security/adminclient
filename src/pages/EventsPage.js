import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    GridItem,
    HStack,
    Icon,
    Spacer,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { FaRegCalendarPlus, FaRegQuestionCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { MdOutlinedFlag } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import CreateEventCard from "../components/events/CreateEventCard";
import AddChallengeCard from "../components/events/AddChallengeCard";
import EventsTable from "../components/events/EventsTable";
import EventTeamsTable from "../components/events/EventTeamsTable";
import GotoChallengesCard from "../components/events/GotoChallengesCard";

export default function EventsPage() {
    return (
        // <Box w="100%" overflow="auto" padding="16px" h="100%">
        //     <Box w="100%" h="10%">
        //         <Flex margin="auto" w="fit-content">
        //             <CreateEventCard />
        //             <Spacer marginLeft="100px" marginRight="100px" />
        //             <AddChallengeCard />
        //         </Flex>
        //     </Box>

        //     <Box
        //         marginTop="30px"
        //         backgroundColor="white"
        //         w="100%"
        //         h="541px"
        //         borderRadius="10px"
        //         p="0px 15px 15px 15px"
        //         marginBottom="10px"
        //         className="container"
        //     >
        //         <EventsTable />
        //     </Box>
        //     <Box
        //         backgroundColor="white"
        //         w="100%"
        //         h="541px"
        //         borderRadius="10px"
        //         p="0px 15px 15px 15px"
        //         marginTop="10px"
        //         className="container"
        //     >
        //         <EventTeamsTable />
        //     </Box>
        // </Box>
        <Grid
            height="100%"
            width="100%"
            templateRows="repeat(24, 1fr)"
            templateColumns="repeat(24), 1fr)"
            gap={4}
        >
            <GridItem rowSpan={2} colSpan={24}>
                <Flex w="fit-content" margin="auto">
                    <CreateEventCard />
                    <Spacer marginLeft="100px" marginRight="100px" />
                    <GotoChallengesCard />
                </Flex>
            </GridItem>
            <GridItem rowStart={5} rowSpan={10} colSpan={24}>
                <Flex direction="column" height="100%" className="container">
                    <EventsTable />
                </Flex>
            </GridItem>
            <GridItem rowSpan={10} colSpan={24}>
                <Flex direction="column" height="100%" className="container">
                    <EventTeamsTable />
                </Flex>
            </GridItem>
        </Grid>
    );
}
