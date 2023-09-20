import {
  Center,
  Flex,
  IconButton,
  Link,
  Select,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaStop, FaPlay } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import LoadingSpin from "react-loading-spin";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { fetchEvents, selectEvent, stopEvent } from "../../features/events/eventSlice";
import moment from "moment";
import { defaultTheme } from "../..";

function EventsTable() {
  const eventState = useSelector((state) => state.event);
  const selectedEvent = useSelector((state) => state.event.selectedEvent);
  const eventsStopping = useSelector((state) => state.event.eventsStopping);
  const [eventStatusSelector, setEventStatusSelector] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    console.log(event.target.value);
    setEventStatusSelector(event.target.value);
  };

  const setSelectedEvent = (event) => {
    console.log("setting selected event", event);
    dispatch(selectEvent(event));
  };

  const toast = useToast()
  const toastIdRef = React.useRef()

  const eventStop = async (eventTag) => {
    console.log("stopping event: ", eventTag)
    let request = {
      tag: eventTag,
    }
    try {
      const response = await dispatch(stopEvent(request)).unwrap()
      toastIdRef.current = toast({
        title: 'Event successfully stopped',
        description: "The event stop request was successfully processed",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      dispatch(fetchEvents({ status: eventStatusSelector }))
    } catch (err) {
      console.log("got error starting exercise", err)
      toastIdRef.current = toast({
        title: 'Error stopping event',
        description: err.apiError.status,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (eventStatusSelector !== "all") {
      dispatch(fetchEvents({ status: eventStatusSelector }));
    } else {
      dispatch(fetchEvents());
    }
  }, [eventStatusSelector]);
  return (
    <>
      <Flex className="container-header" height="60px">
        <h2 style={{ margin: "auto" }} className="container-header-text">
          Events
        </h2>
        <Spacer />
        <Text margin="auto" marginRight="15px">
          Show by status:
        </Text>
        <Select
          margin="auto"
          width="200px"
          defaultValue={0}
          onChange={(event) => handleChange(event)}
        >
          <option value={"all"}>All</option>
          <option value={0}>Running</option>
          <option value={2}>Finished</option>
        </Select>
      </Flex>
      {eventState.status === "fetchingEvents" ? (
        <Center position="relative" transform="translateY(100%)">
          <LoadingSpin primaryColor={defaultTheme.colors.aau.primary} size="100px" />
        </Center>
      ) : (
        <TableContainer overflowY="unset" h="100%">
          <Table variant="simple" size={"sm"}>
            <Thead
              position="sticky"
              top={0}
              zIndex="100"
              backgroundColor="white"
            >
              <Tr>
                <Th textAlign="center">Action</Th>
                <Th >Name</Th>
                <Th >Type</Th>
                <Th >Goto</Th>
                <Th >Secret key</Th>
                <Th >Status</Th>
                <Th isNumeric>Teams</Th>
                <Th isNumeric>Exercises</Th>
                <Th isNumeric>Labs running</Th>
                <Th isNumeric>Max labs</Th>
                <Th >Created by</Th>
                <Th >Organization</Th>
                <Th >Created at</Th>
                <Th >Finishes/Finished at</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(eventState.events).map(([key, event]) => (
                <Tr
                  key={key}
                  _hover={{
                    backgroundColor: "aau.hover",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedEvent(event)}
                  backgroundColor={
                    !selectedEvent
                      ? ""
                      : selectedEvent.tag === event.tag
                      ? "aau.hover"
                      : ""
                  }
                >
                  <Td textAlign={"center"} position="relative" zIndex="10">
                    {event.status === "running" ? (
                      <IconButton
                        colorScheme="aau.buttonRed"
                        variant="ghost"
                        icon={<FaStop />}
                        data-tooltip-content="Stop event"
                        data-tooltip-place="right"
                        data-tooltip-effect="solid"
                        data-tooltip-id="tooltip-stop-event"
                        onClick={() => eventStop(event.tag)}
                        isLoading={typeof eventsStopping[event.tag] !== "undefined" ? true : false}
                      />
                    ) : (
                      <>
                        <IconButton
                          colorScheme="aau.buttonRed"
                          variant="ghost"
                          marginRight={"10px"}
                          fontSize="20px"
                          icon={<MdDelete />}
                          data-tooltip-content="Delete event"
                          data-tooltip-place="right"
                          data-tooltip-effect="solid"
                          data-tooltip-id="tooltip-delete-event"
                        />
                        <IconButton
                          colorScheme="aau.buttonGreen"
                          variant="ghost"
                          icon={<FaPlay />}
                          data-tooltip-html="Restart event <br> Requires that another event is not running on the same URL"
                          data-tooltip-place="right"
                          data-tooltip-effect="solid"
                          data-tooltip-id="tooltip-restart-event"
                        />
                      </>
                    )}
                  </Td>
                  <Td >{event.name}</Td>
                  <Td >{event.type}</Td>
                  <Td >
                    <Link href={event.url} target="_blank" color="#54616e">
                      Goto event
                    </Link>
                  </Td>
                  <Td >{event.secretKey}</Td>
                  <Td >
                    <Text color={event.status === "running" ? "aau.green" : "aau.red"}>
                      {event.status}
                    </Text>
                  </Td>
                  <Td isNumeric>{event.teams}</Td>
                  <Td isNumeric>{event.exercises}</Td>
                  <Td isNumeric>{event.labsRunning}</Td>
                  <Td isNumeric>{event.maxLabs}</Td>
                  <Td >{event.createdBy}</Td>
                  <Td >{event.organization}</Td>
                  <Td >{moment(event.createdAt).format("DD/MM/YYYY HH:mm")}</Td>
                  <Td >
                    {event.status === "running"
                      ? moment(event.finishesAt).format("DD/MM/YYYY HH:mm")
                      : moment(event.finishedAt).format("DD/MM/YYYY HH:mm")}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Tooltip id={"tooltip-stop-event"} style={{ zIndex: "9999" }} />
      <Tooltip id={"tooltip-restart-event"} style={{ zIndex: "9999" }} />
      <Tooltip id={"tooltip-delete-event"} style={{ zIndex: "9999" }} />
    </>
  );
}

export default EventsTable;
