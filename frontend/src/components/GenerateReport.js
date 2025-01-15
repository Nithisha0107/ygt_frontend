import { useState } from 'react';
import { Button, Container, Form, Row, Col, Table, Alert,div } from 'react-bootstrap';
import axios from 'axios';

function GenerateReportForm() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [summary, setSummary] = useState({
        total_issued: 0,
        total_used: 0,
        total_expired: 0,
        counter_stats: {},
    });
    const [error, setError] = useState('');

    const fetchSummary = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/summary-report/', {
                params: { start_date: startDate, end_date: endDate },
            });
            setSummary(response.data);
        } catch (err) {
            setError('Failed to load summary report. Please try again.');
        }
    };

    const handleDownload = async (sheetType) => {
        try {
            const response = await axios.get('http://localhost:8000/api/generate-report/', {
                params: { sheet_type: sheetType, start_date: startDate, end_date: endDate },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${sheetType}_report_${new Date().toISOString()}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError('Failed to download the report. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Devotee Counter Report Summary</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form className="mt-3">
                <Row>
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

                <Button className="mt-3" onClick={fetchSummary}>
                    Load Summary
                </Button>
            </Form>
            <div className = "mt-3" style={{border:'1px solid black',padding:'10px',borderRadius:'20px',width:'50%'}}>
            <Table bordered className="mt-3" >
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Tokens Issued</td>
                        <td>{summary.total_issued}</td>
                        <td>
                            <Button onClick={() => handleDownload('issued')}>
                                Download Issued Tokens
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Total Tokens Used</td>
                        <td>{summary.total_used}</td>
                        <td>
                            <Button onClick={() => handleDownload('used')}>
                                Download Used Tokens
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Total Tokens Expired</td>
                        <td>{summary.total_expired}</td>
                        <td>
                            <Button onClick={() => handleDownload('expired')}>
                                Download Expired Tokens
                            </Button>
                        </td>
                    </tr>
                    {Object.entries(summary.counter_stats).map(([counter, count]) => (
                        <tr key={counter}>
                            <td>{counter}</td>
                            <td>{count}</td>
                            <td>
                                <Button onClick={() => handleDownload(`counter_${counter}`)}>
                                    Download {counter} Sheet
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </Container>
    );
}

export default GenerateReportForm;
