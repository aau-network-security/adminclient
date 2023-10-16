
import React from 'react'
import { BsFillCircleFill } from "react-icons/bs";
import {
    Icon,
    HStack
  } from "@chakra-ui/react";


// Function for sorting difficulity levels for a challenge. It returns a set of html dots for rendering 
function ChallengeLevel(props) {

    // let sum = 0
    // let N = 0

    let level = {
        veryEasy:false,
        easy:false,
        medium:false,
        hard:false,
        veryHard:false 
    }
    // setting level dict based on points from dev sheet: 
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
    // console.log("exName: ", props.exercise.name)
    try {
        if (props.exercise.instance.length >= 1){
            for (let i in props.exercise.instance){
                // console.log("props.execercise.instance", props.exercise.instance); 
                // console.log("i: ", i)
                // console.log("props.exercise.instance[i].children", props.exercise.instance[i].children)
                
                // check if children object exists
                if (props.exercise.instance[i].children != undefined){
                    if (props.exercise.instance[i].children.length > 1){
                        // console.log("props.exercise.instance[i].children", props.exercise.instance[i].children)
                        for (let j in props.exercise.instance[i].children){
                            // console.log("J", j)
                            // sum += props.exercise.instance[i].children[j].points
                            setLevel(props.exercise.instance[i].children[j].points)
                            // N = N + 1
                        }
                    }else{
                        // sum += props.exercise.instance[i].children[0].points 
                        setLevel(props.exercise.instance[i].children[0].points)
                        // N = N + 1
                    }
            
                }
            }
                // let avgPoints = sum/N
            // console.log("sum=",sum)
            // console.log("avg=",avgPoints)
        }
        
    } catch (error) {
        console.error();
        console.log("Problem occured with: ", props.exercise)
    }
    // console.log("exercise.instance.length ",props.exercise.instance.length )
    
    // console.log("N: ", N)
    // console.log("exercise instance",props.exercise.instance)
    // console.log(level)
    return (
        <>
        <HStack marginRight={5} spacing={2} >
         {level.veryEasy == true && 
        //    <Text color="green.200"> {sum}</Text> 
           <Icon
                color="green.200"
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
         {level.easy == true && 
        //    <Text color="green"> {sum}</Text>  
           <Icon
                color="aau.green"
                as={BsFillCircleFill}
                fontSize="13px"
                // marginRight="3px"
                data-tooltip-html={
                    "Easy Challenge "
                }
                data-tooltip-place="top"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-exercise-difficulity"
                data-tooltip-offset={5}
            /> 
         }
         {level.medium == true && 
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
         {level.hard == true && 
        //    <Text color="orange"> {sum}</Text>  
           <Icon
                color="aau.orange"
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
         {level.veryHard == true && 
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



    