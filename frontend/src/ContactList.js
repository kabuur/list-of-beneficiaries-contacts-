import React from 'react'

function ContactList({filtered}) {
  return (
    <div >{
        filtered.map((e,k)=>(
        <div key={k} className='row m-4 p-3   shadow-sm   bg-light rounded'>
            {/* Avator image */}
            <div className='col-md-2 '>
                <img className = 'rounded-circle' width = '100' src='./images/Avator.png'  alt='Profile '/>
            </div>

            <div className='col-md-8'>
                {/* contact name */}
                <div className='row'>
                    <h5>{e.Full_Name}</h5>
                </div>
                {/* contact Mobile */}
                <div className='row'>
                    <h6>{e.Mobile}</h6>
                </div>
                {/* contact Target_Group */}
                <div className='row'>
                    <h6>{e.Target_Group}</h6>
                </div>
            </div>
            
        </div>

    ))}
    </div>
  )
}

export default ContactList