import React, {useState, useContext} from 'react';
import { css} from '@emotion/core';
import styled from '@emotion/styled';
import {ChatContext} from './ChatContext';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';





function Home(props){
    
    const {name, changeName, clearField} = useContext(ChatContext);
    const handleSubmit = (evt) =>{
        evt.preventDefault()
        props.history.push('/chat')
        clearField()
    }
        return(

            <Div>
                <Form onSubmit = {handleSubmit}>
                    <label htmlFor ='userName'>Name:</label>
                    <input name = 'userName' type='text' value = {name} onChange = {changeName} />
                    <Button> Send</Button>
                </Form>
            </Div>
         
        )
    }

export default Home


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