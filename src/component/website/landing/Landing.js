import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Landing() {
    

    return (
        <>
            <div className="d-flex align-items-center justify-content-between flex-wrap hand">
            <Container>
                <div className="col-lg-5 col-md-8 col-12 text-md-start text-center">
                    <h1 className="display fw-bold">Shampo nice</h1>
                    <h5>another nice thing which is used by someone i don't know (just rondome text )</h5>
                    <Link to="/shop" className="btn btn-primary mt-3 px-4 fw-bold text-light">shop now</Link>
                </div>
            </Container>
       </div>
        </>
    )
}
