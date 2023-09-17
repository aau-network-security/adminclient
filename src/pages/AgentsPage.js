import { Center, Grid, GridItem} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AgentMetrics from "../components/agents/AgentMetrics";
import AgentsTable from "../components/agents/AgentsTable";

export default function AgentsPage() {
    const perms = useSelector((state) => state.user.loggedInUser.perms);
    // Redirect if user accesses page directly via url and does not have permissions
    // (This is mainly for usability, authorization is of course handled by the api)
    if (typeof perms !== "undefined") {
        if (typeof perms.agents === "undefined") {
            return <Navigate to="/" replace />;
        }
    }
    return (
        <Center w="100%">
            <Grid
                h="100%"
                w="75%"
                templateRows="repeat(12, 1fr)"
                templateColumns="repeat(1, 1fr)"
                gap={10}
            >
                <GridItem rowSpan={5} className="container">
                    <AgentMetrics />
                </GridItem>
                <GridItem rowSpan={7} className="container">
                    <AgentsTable />
                </GridItem>
            </Grid>
        </Center>
    );
}
