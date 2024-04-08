
import React from 'react'
import { BsFillCircleFill } from "react-icons/bs";
import {
    Icon,
    HStack
  } from "@chakra-ui/react";


// Function for sorting difficulity levels for a challenge. It returns a set of html dots for rendering 
function ChallengeLevel(props) {

    let level = {
        beginner: false,
        veryEasy: false,
        easy: false,
        medium: false,
        hard: false,
        veryHard: false,
        insane: false
    }

    // Setting Difficulity level dict based on points from dev sheet: 
    function setLevel(points){
        if (points <= 10){
            level.beginner = true
        } else if (points >= 11 && points <= 30){
            level.veryEasy = true
        } else if (points >= 31 && points <= 50){
            level.easy = true
        } else if (points >= 51 && points <= 70){
            level.medium = true
        } else if (points >= 71 && points <= 85){
            level.hard = true
        } else if (points >= 86 && points <= 100){
            level.veryHard = true
        } else if (points > 100){
            level.insane = true
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
    }
  
    return (
        <>
        <HStack marginRight={5} spacing={2} >
         {level.beginner === true &&
           <Icon
                color="difficulty.beginner"
                as={BsFillCircleFill}
                fontSize="13px"
                data-tooltip-html={
                    "Beginner challenge"
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            />
         }
         {level.veryEasy === true &&
           <Icon
                color="difficulty.veryEasy"
                as={BsFillCircleFill}
                fontSize="13px"
                data-tooltip-html={
                    "Very Easy challenge"
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         } 
         {level.easy === true &&
           <Icon
                color="difficulty.easy"
                as={BsFillCircleFill}
                fontSize="13px"
                data-tooltip-html={
                    "Easy challenge"
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         }
         {level.medium === true &&
           <Icon
                color="difficulty.medium"
                as={BsFillCircleFill}
                fontSize="13px"
                data-tooltip-html={
                    "Medium challenge"
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         } 
         {level.hard === true &&
           <Icon
                color="difficulty.hard"
                as={BsFillCircleFill}
                fontSize="13px"
                data-tooltip-html={
                    "Hard challenge "
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         } 
         {level.veryHard === true && 
           <Icon
                color="difficulty.veryHard"
                as={BsFillCircleFill}
                fontSize="13px"
                data-tooltip-html={
                    "Very Hard challenge "
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         } 
         {level.insane === true &&
           <Icon
                color="difficulty.insanse"
                as={BsFillCircleFill}
                fontSize="13px"
                data-tooltip-html={
                    "INSANSE challenge "
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
