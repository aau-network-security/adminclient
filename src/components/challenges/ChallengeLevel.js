
import React from 'react'
import { BsFillCircleFill } from "react-icons/bs";
import {
    Icon,
    HStack
  } from "@chakra-ui/react";


// Function for sorting difficulity levels for a challenge. It returns a set of html dots for rendering 
function ChallengeLevel(props) {

    let level = {
        veryEasy:false,
        easy:false,
        medium:false,
        hard:false,
        veryHard:false 
    }
    // Setting Difficulity level dict based on points from dev sheet: 
    function setLevel(points){
        if (points < 10){
            level.veryEasy = true
        } else if (points >= 10 && points < 25){
            level.easy = true
        } else if (points >= 25 && points < 40){
            level.medium = true
        } else if (points >= 40 && points < 60){
            level.hard = true
        } else if (points >= 60){
            level.veryHard = true
        }
    }
    
    try {
        if (props.exercise.instance.length >= 1){
            for (let i in props.exercise.instance){
            
                // check if children object exists
                if (props.exercise.instance[i].children !== undefined){
                    // check if more than 1 child exists
                    if (props.exercise.instance[i].children.length > 1){
                        // Take a look at points for each of the flags
                        for (let j in props.exercise.instance[i].children){
                            setLevel(props.exercise.instance[i].children[j].points)
                            
                        }
                    }else{
                        setLevel(props.exercise.instance[i].children[0].points)
                    }
            
                }
            }
        }
        
    } catch (error) {
        console.error();
        console.log("Problem occured with: ", props.exercise)
    }
  
    return (
        <>
        <HStack marginRight={5} spacing={2} >
         {level.veryEasy === true && 
        //    <Text color="green.200"> {sum}</Text> 
           <Icon
                color="green.400"
                as={BsFillCircleFill}
                fontSize="13px"
                // marginRight="4px"
                data-tooltip-html={
                    "Very easy challenge"
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         } 
         {level.easy === true && 
        //    <Text color="green"> {sum}</Text>  
           <Icon
                color="blue.400"
                as={BsFillCircleFill}
                fontSize="13px"
                // marginRight="3px"
                data-tooltip-html={
                    "Easy Challenge"
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         }
         {level.medium === true && 
        //    <Text color="aau.green"> {sum}</Text>  
           <Icon
                color="aau.yellow"
                as={BsFillCircleFill}
                fontSize="13px"
                // marginRight="3px"
                data-tooltip-html={
                    "Medium Challenge"
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         } 
         {level.hard === true && 
        //    <Text color="orange"> {sum}</Text>  
           <Icon
                color="orange.400"
                as={BsFillCircleFill}
                fontSize="13px"
                // marginRight="3px"
                data-tooltip-html={
                    "Hard Challenge "
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         } 
         {level.veryHard === true && 
        //    <Text color="aau.red"> {sum}</Text>  
           <Icon
                color="aau.red"
                as={BsFillCircleFill}
                fontSize="13px"
                // marginRight="3px"
                data-tooltip-html={
                    "Very Hard Challenge "
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         } 
         </HStack>
        </>
    )
}


export default ChallengeLevel



    