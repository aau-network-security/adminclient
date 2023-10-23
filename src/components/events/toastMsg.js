import React from 'react'

function toastMsg(reqData) {
        console.log(reqData.exerciseTags.length)
        var result = {
            msg: "",
            toastData:{}
        }
        if (reqData.exerciseTags.length === 0) {
            result.toastData= {
                title: "No challenges selected",
                description: "Select some challenges to create an event",
                status: "error",
                duration: 5000,
                isClosable: true,
            }
            
            return result 
         
      }
      if (reqData.name === ""){
        result.toastData= {
              title: "Event name empty",
              description: "Event name cannot be empty",
              status: "error",
              duration: 5000,
              isClosable: true,
          }
          return result 
      }
      if (reqData.tag === ""){
        result.toastData= {
              title: "Event tag empty",
              description: "Event tag cannot be empty",
              status: "error",
              duration: 5000,
              isClosable: true,
          }
          return result
      }
    
      // regex for checking for special characters etc. in eventTag
      const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
      if (regex.test(reqData.tag)) {
        result.toastData= {
              title: "Event tag",
              description: "Event tag must not contain special charactors or numbers",
              status: "error",
              duration: 5000,
              isClosable: true,
          }
        return result
         
      }
    
      if (reqData.expectedFinishDate === "") {
        result.toastData= {
              title: "Expected finish date has not been set",
              description: "Set expected finish date",
              status: "error",
              duration: 5000,
              isClosable: true,
          }
          return result
      }
    
      // console.log("expected finish date", reqDataState.expectedFinishDate)    
      // console.log("time now", now)
      // console.log("time expectedFinishDate", expectedFinishDate)
      // console("typeof expectedFinishDate", typeof reqDataState.expectedFinishDate )
      // console.log("time compared", now > expectedFinishDate )
    
    
      // Check if expected finish date is in the past: 
      const now = Date()
      const expectedFinishDate = reqData.expectedFinishDate.toString()
    
      if ( expectedFinishDate < now) {
          
        result.toastData= {
              title: "Expected finish date is in the past",
              description: "Select an expected finish date in the future",
              status: "error",
              duration: 5000,
              isClosable: true,
          }
          return result
      }

    result.msg= "noProblemoLetsGoo"
    return result
    }


export default toastMsg