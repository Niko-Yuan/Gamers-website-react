import React from 'react';
import styled from 'styled-components';

const StoreDetailsPage = () => {
    return (
        <StoreDetailsPageWrapper>
        </StoreDetailsPageWrapper>
    )
}

export default StoreDetailsPage;

const StoreDetailsPageWrapper = styled.div`
    background: var(--clr-violet-dark-active);
    
    .sc-details{
        min-height: 100vh;
        padding-top: 65px;
        padding-bottom: 65px;
    }
`;
