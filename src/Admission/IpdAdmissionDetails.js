import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import Live from "../Config";

const IpdAdmissionDetails = ({ admissionId }) => {
    const [ipdDetails, setIpdDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    };
    useEffect(() => {
        
        const fetchIpdDetails = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const storedAdmissionId = localStorage.getItem('admissionId');
                const encodedAdmissionId = atob(storedAdmissionId);
                console.log("encodedAdmissionId=================>",encodedAdmissionId)
                if (!encodedAdmissionId) {
                    throw new Error('Admission ID is not available in local storage.');
                }

                const response = await axios.get(`${Live.Port}/hms/ipdadmissions/getIpdDetails`, {
                    params: { admissionId: encodedAdmissionId },
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setIpdDetails(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIpdDetails();
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            {ipdDetails ? (
                <Card className='Admission_sheet_Details_blk'>
                    <CardBody>
                        <Row>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Date of Admission:</strong> {capitalizeFirstLetter(ipdDetails.dateOfAdmission)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Time of Admission:</strong> {capitalizeFirstLetter(ipdDetails.timeOfAdmission)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Patient Name:</strong> {capitalizeFirstLetter(ipdDetails.patientName)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Gender:</strong> {capitalizeFirstLetter(ipdDetails.gender)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Age:</strong> {ipdDetails.age}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Payer:</strong> {capitalizeFirstLetter(ipdDetails.payer)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>IPD Number:</strong> {capitalizeFirstLetter(ipdDetails.ipdNumber)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Ward:</strong> {capitalizeFirstLetter(ipdDetails.ward)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Bed:</strong> {capitalizeFirstLetter(ipdDetails.bed)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Department:</strong> {capitalizeFirstLetter(ipdDetails.department)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Consultant Doctor:</strong> {capitalizeFirstLetter(ipdDetails.consultantDoctor)}</p>
                            </Col>
                            <Col xs={12} sm={4}>
                                <p><strong className='details_label'>Discharge Status:</strong> {ipdDetails.dischargeStatus === 0 ? 'Not Discharged' : 'Discharged'}</p>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            ) : (
                <p>No details available for this ID.</p>
            )}
        </Container>
    );
};

export default IpdAdmissionDetails;
