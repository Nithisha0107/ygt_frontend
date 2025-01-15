// src/components/Report.js
import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Table } from 'react-bootstrap';

function Report() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');

    const fetchReport = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/report/`, {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                },
            });

            setReport(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch report. Please try again.');
            setReport(null);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Generate Token Report</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mt-3">
                <Col md={6}>
                    <Form.Group controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="endDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Button 
                className="mt-3" 
                onClick={fetchReport} 
                disabled={!startDate || !endDate}
            >
                Get Report
            </Button>

            {report && (
                <div className="mt-5">
                    <h4>Report Summary</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total Tokens Issued</td>
                                <td>{report.total_issued}</td>
                            </tr>
                            <tr>
                                <td>Total Tokens Used</td>
                                <td>{report.total_used}</td>
                            </tr>
                            <tr>
                                <td>Total Tokens Expired</td>
                                <td>{report.total_expired}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
}

export default Report;
