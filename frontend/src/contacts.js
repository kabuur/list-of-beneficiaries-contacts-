import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactList from './ContactList.js';


function Contacts () {
    //Contacts useState
    const [Contacts, setContact] = useState([]);
    //Searching input useState
    const [searchQuery, setSearchQuery] = useState('');
    //checkbox field useState
    const [checkboxes, setCheckboxes] = useState([]);
    const [error ,setError] = useState('');
  
    useEffect (() => {
        // Fetch All Contacts from server   
      const FetchAllContacts = async () => {
        try{
            // Api url in the package.json -> "proxy": "http://localhost:9000" /contacts   
            const xog = await axios.get('/contacts');
            const result = xog.data;
            // set contents useState  data from Server
            setContact(result);
        } catch(err){
            setError (err.message)
        }
      };
  
      FetchAllContacts();
    }, []);


  // onChange checkbox set setCheckboxes useState
    function handaleChange (e) {
      const   selected_value = e.target.value
        if (e.target.checked){
            setCheckboxes ([...checkboxes, selected_value]);
        }else {
            setCheckboxes (
              checkboxes.filter((checkboxes) => checkboxes !== selected_value)
            );
          }
    }


    // onchange input field setSearchQuery useState , Searching full Name
    function handleKeyUp (e) {
        setSearchQuery(e.target.value);
       
      }

      
// filter  contcts Full Name and  checkbox 
    const filteredContacts = Contacts.filter (contact => {
         // Check if the contact's Full_Name includes the searchQuery
    const fullNameMatch = contact.Full_Name.toLowerCase().includes(searchQuery.toLowerCase());
    const selectetTarget_Group = checkboxes.includes(contact.Target_Group)
   
   if ((searchQuery === "") && (checkboxes.length === 0 || selectetTarget_Group)){
   
        return true;
   }
    // Check if the searchQuery matches the Full_Name or any checkbox is selected and matches the Target_Group
    if ((fullNameMatch && searchQuery) && (checkboxes.length === 0 || selectetTarget_Group ))  {
      
        return true
    }

    return false

      });

 

  return (

    <div className='Mian'>

        {
            error? <div><center><h1>{error}</h1></center></div>:
            
        <div className='container row mx-auto mt-3'>
            
        <center><h4>list of beneficiaries (contacts) </h4></center>

        {/* search */}
        <div className=' col-lg-3 p-4 h-25 card '>

            <h4>Filter BY</h4>
             {/* search input */}

             <hr/>
            <div className='row '>
                <strong>Full Name</strong>
                <input className='' type='text' value={searchQuery}  onChange={handleKeyUp} placeholder='Full Name' />
            </div>
          <hr/>


            {/* chechbox fields */}
            <div className='row mt-3'>
                <strong className='mb-2'>Target Group</strong>
                <label><input type='checkbox' value= "Teacher"  onChange={(e)=>handaleChange(e)}/> Teacher</label><br/>
                <label><input type='checkbox' value= "FHS" onChange={(e)=>handaleChange(e)}/> FHS</label><br/>
                <label><input type='checkbox' value= "Principal" onChange={(e)=>handaleChange(e)}/>Principal</label><br/>
                <label><input type='checkbox' value= "FHW" onChange={(e)=>handaleChange(e)}/>FHW</label><br/>
                <label><input type='checkbox' value= "Household" onChange={(e)=>handaleChange(e)}/>Household</label><br/>
            </div>
            
        </div>
        <div className='contacts mx-auto col-lg-8 overflow-scroll card vh-100'>
            
            {
                Contacts.length <= 0 ? <div><center><h1>Emty list of contacts</h1></center></div>:
                // filtered contacts
              filteredContacts.length >0 ?<ContactList filtered ={filteredContacts}/>
              
                
                // valied searching input
               :<center><p className="not found " >Not found </p></center> 
                    
                
                    
            }
        </div>
    </div>
        }


    </div>
  )
}

export default Contacts