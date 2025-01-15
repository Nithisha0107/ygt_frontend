// src/components/GenerateToken.js
import axios from 'axios';
import { useState, useRef } from 'react';
import { Form, Button, Alert, div, Row, Col } from 'react-bootstrap';
import Barcode from 'react-barcode';
import './Generate.css';
function GenerateToken() {
    const [barcode, setBarcode] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        age: '',
        phone_number: '',
        id_proof_type: '',
        id_proof_number: '',
        purpose_of_visit: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const barcodeRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateFields = () => {
        const {
            first_name, last_name, email, age, phone_number, address, city, state, pincode,
        } = formData;
        if (!first_name || !last_name) return 'First name and last name are required.';
        if (email && !/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email.';
        if (!['Male', 'Female', 'Other'].includes(formData.gender)) return 'Please select a valid gender.';
        if (!/^\d+$/.test(age) || age <= 0) return 'Please enter a valid age.';
        if (!/^\d{10,15}$/.test(phone_number)) return 'Phone number must be 10-15 digits.';
        if (!formData.purpose_of_visit) return 'Please select the purpose of your visit.';
        if (!address || !city || !state) return 'Please fill in the full address.';
        if (pincode && !/^\d{6}$/.test(pincode)) return 'Pincode must be exactly 6 digits.';
        return null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/generate-token/', formData);
            const { barcode: generatedBarcode,created_at:generatedCreated, expired_at: generatedExpiry ,first_name, last_name} = response.data;
            setBarcode(generatedBarcode);
            setCreatedDate(generatedCreated);
            setExpiryDate(generatedExpiry);
            setFullName(`${first_name} ${last_name}`);
            setError('');
        } catch (err) {
            if (err.response && err.response.data) {
                
                setError(err.response.data.detail || JSON.stringify(err.response.data));
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            
        }
    };

    const handleDownloadBarcode = () => {
        if (!barcodeRef.current) return;
        const svg = barcodeRef.current.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'barcode.svg';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container">
            <h2>Generate Token</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} style={{backgroundColor:"ffc107"}}>
                <Row>
                    <Col md={6} >
                        <Form.Group controlId="first_name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="last_name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={6}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={6}>
                        <Form.Group controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="phone_number">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={6}>
                        <Form.Group controlId="id_proof_type">
                            <Form.Label>ID Proof Type</Form.Label>
                            <Form.Select
                                name="id_proof_type"
                                value={formData.id_proof_type}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select ID Proof</option>
                                <option value="Aadhaar">Aadhaar</option>
                                <option value="PAN">PAN</option>
                                <option value="Passport">Passport</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="id_proof_number">
                            <Form.Label>ID Proof Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="id_proof_number"
                                value={formData.id_proof_number}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12}>
                        <Form.Group controlId="purpose_of_visit">
                            <Form.Label>Purpose of Visit</Form.Label>
                            <Form.Select
                                name="purpose_of_visit"
                                value={formData.purpose_of_visit}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Purpose</option>
                                <option value="Darshan">Darshan</option>
                                <option value="Donation">Donation</option>
                                <option value="Volunteering">Volunteering</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>


                <Row className="mt-3">
                    <Col md={12}>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={6}>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={6}>
                        <Form.Group controlId="pincode">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className='button-container'>
                     <Button type="submit" className="mt-3" style={{color:'black',backgroundColor:'#fc6031e7' }}>
                    Generate Token
                </Button>
                </div>
               
            </Form>

            {barcode && (
                <div className="mt-5 text-center">
                    <Alert variant="success">
                        <h5>Generated Barcode for <strong>{fullName}</strong></h5>
                        <div ref={barcodeRef}>
                            <Barcode value={barcode} width={1} />
                        </div>
                        <div className='mr-3'>
                        <span className="mt-3" style={{color:'black'}}>
                            <strong>Created At:</strong> {new Date(createdDate).toLocaleString()}
                        </span>
                        <br/>
                        <span className="mt-3 ml-3" style={{color:'black'}}>
                            <strong>Expires At:</strong> {new Date(expiryDate).toLocaleString()}
                        </span>
                        </div>
                        <div className='button-container'>
                            <button onClick={handleDownloadBarcode}  style={{color:'black'  }}>
                            Download Barcode
                        </button>
                        </div>
                        
                    </Alert>
                </div>
            )}
        </div>
    );
}

export default GenerateToken;
