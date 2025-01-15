
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Form, Button, Alert, Container, Row, Col, Table } from 'react-bootstrap';

function QueueManagement() {
    const [queues, setQueues] = useState([]);
    const [queueName, setQueueName] = useState('');
    const [order, setOrder] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchQueues();
    }, []);

    const fetchQueues = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/queues/');
            setQueues(response.data);
        } catch (err) {
            setError('Failed to fetch queues.');
        }
    };

    const handleCreateQueue = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/queues/', {
                queue_name: queueName,
                order: parseInt(order),
            });

            setMessage(`Queue "${response.data.queue_name}" created successfully!`);
            setError('');
            setQueueName('');
            setOrder('');
            fetchQueues(); 
        } catch (err) {
            setError('Failed to create queue. Ensure unique name and order.');
            setMessage('');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Queue Management</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Form onSubmit={handleCreateQueue}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="queueName">
                            <Form.Label>Queue Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={queueName}
                                onChange={(e) => setQueueName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="order">
                            <Form.Label>Order</Form.Label>
                            <Form.Control
                                type="number"
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
                    <Button type="submit" className="mt-3" style={{backgroundColor:'#f73131'}}>
                    Create Queue
                </Button>
                </div>
                
            </Form>

            <div className="mt-5" style={{border:'1px solid black',padding:'10px',borderRadius:'20px',width:'50%'}}>
                <h4>Existing Queues</h4>
                <Table striped bordered hover style={{padding:'10px'}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Queue Name</th>
                            <th>Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queues.map((queue, index) => (
                            <tr key={queue.id}>
                                <td>{index + 1}</td>
                                <td>{queue.queue_name}</td>
                                <td>{queue.order}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default QueueManagement;
