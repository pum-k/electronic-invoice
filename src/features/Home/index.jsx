import React from 'react'
import './style.scss';
import {Button} from 'reactstrap'
const Home = () => {
    return (
        <>
            <div className="home">
                <div className="home__content">
                    <h1>Electronic Envoice</h1>
                    <Button color="primary" outline>Get started</Button>
                </div>
                
            </div>
            
        </>
    )
}

export default Home
