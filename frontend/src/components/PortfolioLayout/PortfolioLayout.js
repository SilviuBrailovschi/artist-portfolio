import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Container, Row, Col } from 'reactstrap';
import PortfolioGrid from "../PortfolioGrid/PortfolioGrid";
import './PortfolioLayout.css'; // Import the CSS file

const PortfolioLayout = () => (
    <Container>
        <Card>
            <CardHeader >
            </CardHeader>
            <CardBody >
                <PortfolioGrid />
            </CardBody>
            <CardFooter >
                <Row>
                    <Col slot="author"><h5>© 2024 Silviu Brailovschi</h5></Col>
                    <Col slot="media"></Col>
                </Row>
            </CardFooter>
        </Card>
    </Container>
);

export default PortfolioLayout;
