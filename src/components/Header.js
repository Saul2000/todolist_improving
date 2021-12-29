import React from 'react';
import styled from 'styled-components'

const Header = () => {
    return (
        <Title>
            <h1>Todo List Improving</h1>
        </Title>
    )
}

export default Header

const Title = styled.div`
  color: #fff;
  text-align: center;
  margin: 30px 0;
  font-weight: 500;
`