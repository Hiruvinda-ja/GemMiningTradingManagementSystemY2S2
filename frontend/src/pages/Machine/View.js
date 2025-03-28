/*import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


function View() {
    const {id} =useParams()
    const[machine,setMachine]=useState([])

    useEffect(()=>{

    const fetchMachines=async()=>{
        try {
            const response=await axios.get(
                'http://localhost:2000/api/v1/machineDetails/${id}',
            );


            if(response.data.success){
                setMachine(response.data.machine);
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    };

    fetchMachines();


    },[] );


  return (
    <div>
        <div>
            <img src={`http://localhost:3000/${machine.userId.machineImages}`} alt=""/>
        </div>
        <div>
            <div>
                <p>machine name</p>
                <p>{machine.userId.machineName}</p>
            </div>

        </div>
    </div>
  )
}

export default View*/