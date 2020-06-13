import React, {useState, useContext} from 'react';
import { css} from '@emotion/core';
import styled from '@emotion/styled';
import {ACTION_TYPES, reducer, defaultState, useActions, ReduxContext, ReduxProvider} from './reducer';






function Home(props){
    
    const {state, dispatch} = useContext(ReduxContext);
    const handleSubmit = (evt) =>{
        evt.preventDefault()
        props.history.push('/chat')
    }
    const handleOnChange = (evt) => {
        console.log(state.name)
        dispatch({type: ACTION_TYPES.USERNAMECHANGE, payload: evt.target.value})
    }
        return(

            <Div>
                <Form onSubmit = {handleSubmit}>
                    <label htmlFor ='userName'>Name:</label>
                    <input name = 'userName' type='text' value = {state.name} onChange = {handleOnChange} />
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