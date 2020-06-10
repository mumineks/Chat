import React, {useState} from 'react';
import { css} from '@emotion/core';
import styled from '@emotion/styled'

const Button = styled.button`
  background-color: turquoise;
  padding: 10px;
  border-radius: 25px
`

const Form = styled.form`
text-align:center

`

const Div = styled.div`
height: 100%;
`



function Home(props){
    

const [userName, setValueName] = useState(props.name);

  const handleSetName = (evt) => {
         setValueName(evt.target.value)
        }
    const handleSubmit = (evt) =>{
        evt.preventDefault()
        props.setName(userName)
        props.history.push('/chat')
    }
        return(

            <Div>
                <Form onSubmit = {handleSubmit}>
                    <label htmlFor ='userName'>Name:</label>
                    <input name = 'userName' type='text' value = {userName} onChange = {handleSetName} />
                    <Button> Send</Button>
                </Form>
            </Div>
         
        )
    }

export default Home
