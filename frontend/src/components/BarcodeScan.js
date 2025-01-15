// src/components/BarcodeScan.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';

function BarcodeScan() {
    const [barcode, setBarcode] = useState('');
    const [queueId, setQueueId] = useState('');
    const [queues, setQueues] = useState([]);
    const [error, setError] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchQueues = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/queues/');
                setQueues(response.data);
            } catch (err) {
                setError('Unable to load queues. Please try again.');
            }
        };
        fetchQueues();
    }, []);

    const handleScan = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/validate-token/', {
                barcode,
                queue_id: parseInt(queueId),
            });
            const { message,expires_at } = response.data;
            setExpiryDate(expires_at);
            setMessage(message);
            setError('');
        } catch (err) {
            if (err.response && err.response.data) {
               
                setError(err.response.data.detail || JSON.stringify(err.response.data));
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            setMessage('');
        }
    };

    return (
        <Container className="mt-5" style={{border:'1px solid black', width:'50%',padding:'10px',borderRadius:'20px',backgroundColor:'#FADCA8'}}>
            <h2>Manual Barcode Scan</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Row className="mt-3">
                <Col md={6}>
                    <Form.Group controlId="barcode">
                        <Form.Label style={{fontWeight:'bold'}}>Enter Barcode</Form.Label>
                        <Form.Control
                            type="text"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group controlId="queue">
                        <Form.Label style={{fontWeight:'bold'}}>Select Queue (Counter)</Form.Label>
                        <Form.Select
                            value={queueId}
                            onChange={(e) => setQueueId(e.target.value)}
                            required
                        >
                            <option value="">Select Queue</option>
                            {queues.map((queue) => (
                                <option key={queue.id} value={queue.id}>
                                    {queue.queue_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Button className="mt-3" onClick={handleScan} disabled={!barcode || !queueId}>
                Validate Token
            </Button>

            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
            {expiryDate && (
                <p className="mt-3">
                    <strong>Expires At:</strong> {new Date(expiryDate).toLocaleString()}
                </p>
            )}
        </Container>
    );
}

export default BarcodeScan;
