import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';



import IpdAdmissionDetails from './IpdAdmissionDetails';
import RenderCmoFormSection from '../AdmissionComponents/RenderCmoFormSection';
import RenderComplaintsSection from '../AdmissionComponents/RenderComplaintsSection';
import RenderDiagnosisFormSection from '../AdmissionComponents/RenderDiagnosisFormSection';
import RenderHistorySection from '../AdmissionComponents/RenderHistorySection';
import RenderProcedureSection from '../AdmissionComponents/RenderProcedureSection';
import RenderPhysicalExamSection from '../AdmissionComponents/RenderPhysicalExamSection';
import RenderTPRSection from '../AdmissionComponents/RenderTPRSection';
import RenderExtream from '../AdmissionComponents/RenderExtream';
import '../Admission.css';
import Live from '../Config';

const AdmissionSheet = () => {
    const authToken = localStorage.getItem('authToken');
    const admissionId = 28;
    const [facility, setFacility] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [formData, setFormData] = useState([]);
    const authUrl = `${Live.Port}`;

    const [cmoFormData, setCmoFormData] = useState([
        {
            appointmentId: 28,
            speciality: "general_medicine",
            viewOrder: 1,
            sectionLabel: "complaints",
            facility: "ipd",
            description: {
                complaints: ""
            },
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        },
        {
            appointmentId: 28,
            speciality: "general_medicine",
            viewOrder: 2,
            sectionLabel: "diagnosis_form",
            facility: "ipd",
            description: {
                provisional: "",
                final: "",
                icd_10_code: ""
            },
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        },
        {
            appointmentId: 28,
            speciality: "general_medicine",
            viewOrder: 3,
            sectionLabel: "history",
            facility: "ipd",
            description: {
                medical_history: "",
                surgical_history: "",
                social_history: {
                    tobacco: false,
                    alcohol: false,
                    drugs: false,
                    smoking: false,
                },
                allergy_history: "",
                family_history: ""
            },
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        },
        {
            appointmentId: 28,
            speciality: "general_medicine",
            viewOrder: 4,
            sectionLabel: "procedure",
            facility: "ipd",
            description: {
                insurance_type: "",
                procedure: "",
                procedure_date: ""
            },
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        },
        {
            appointmentId: 28,
            speciality: "general_medicine",
            viewOrder: 5,
            sectionLabel: "tpr",
            facility: "ipd",
            description: {
                bp: "",
                resp: "",
                pulse: "",
                temp: ""
            },
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        },
        {
            appointmentId: 28,
            speciality: "general_medicine",
            viewOrder: 6,
            sectionLabel: "extream",
            facility: "ipd",
            description: {
                immediate_cause: "",
                antecedent_cause: ""
            },
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        },
        {
            appointmentId: 28,
            speciality: "general_medicine",
            viewOrder: 7,
            sectionLabel: "physical_exam",
            facility: "ipd",
            description: {
                cns: false,
                cvs: false,
                rs: false,
                pa: false
            },
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        },
        {
            appointmentId: 28,
            speciality: "general_medicine",
            viewOrder: 8,
            sectionLabel: "tretment_cmo",
            facility: "ipd",
            description: {
                cmo: {
                    findings: "",
                    investigation: "",
                    prescription: "",
                    notes: ""
                },
                revise: {
                    daily: {
                        investigation: "testing",
                        added_investigations: "",
                        medication: "",
                        days: "",
                        added_Items: "",
                        Notes: ""
                    },
                    discharge: {
                        investigation: "testing",
                        added_investigations: "",
                        medication: "",
                        days: "",
                        added_Items: "",
                        Notes: "",
                        followup_date: "",
                        type_of_discharge: "",
                        consultant: "",
                        referred_by: "",
                        other_consultant: ""
                    }
                }
            },
            createdAt: "",
            createdBy: "",
            updatedAt: "",
            updatedBy: ""
        }
    ]);

    //============= get_Api _using_useEffect ==========//
    useEffect(() => {
        const facility = 'ipd';
        const speciality = 'general_medicine';

        if (authToken) {
            axios.get(`${authUrl}/hms/Rx/masterList?facility=${facility}&speciality=${speciality}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching form data:', error);
                });
        }
    }, [authToken]);





    //===========To_handle_value_form_fields
    const handleChange = (e) => {
        const { name, value, dataset } = e.target;
        const sectionIndex = parseInt(dataset.sectionIndex, 10);
        const field = dataset.field;

        setCmoFormData(prevData =>
            prevData.map((item, index) =>
                index === sectionIndex
                    ? {
                        ...item,
                        description: {
                            ...item.description,
                            [field]: value
                        }
                    }
                    : item
            )
        );
    };
    //===========To_handle_value_form_fields_Cmo
    const handleChangeTreatment = (event) => {
        const { name, value, dataset } = event.target;
        const sectionIndex = dataset.sectionIndex;
        const field = dataset.field;

        const newCmoFormData = [...cmoFormData];

        newCmoFormData[sectionIndex].description.cmo[field] = value;

        setCmoFormData(newCmoFormData);
    };

    //================ use_History_exam
    const handleCheckboxChange = (e) => {
        const { name, checked, dataset } = e.target;
        const sectionIndex = parseInt(dataset.sectionIndex, 10);

        setCmoFormData(prevData =>
            prevData.map((item, index) =>
                index === sectionIndex
                    ? {
                        ...item,
                        description: {
                            ...item.description,
                            social_history: {
                                ...item.description.social_history,
                                [name]: checked
                            }
                        }
                    }
                    : item
            )
        );
    };
    //============= use_forPhysical_exam
    const handlePhysicalExamChange = (e) => {
        const { name, checked, dataset } = e.target;
        const sectionIndex = parseInt(dataset.sectionIndex, 10);

        console.log("Checkbox changed:", { name, checked, sectionIndex });

        setCmoFormData(prevData =>
            prevData.map((item, index) =>
                index === sectionIndex
                    ? {
                        ...item,
                        description: {
                            ...item.description,
                            [name]: checked
                        }
                    }
                    : item
            )
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(cmoFormData);
        try {
            const response = await fetch(`${Live.Port}/hms/rx-records/saveAll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(cmoFormData),
            });

            const contentType = response.headers.get('Content-Type');

            if (contentType) {
                let responseData;
                if (contentType.includes('application/json')) {
                    responseData = await response.json();
                    console.log('JSON Response:', responseData);
                } else if (contentType.includes('text/plain')) {
                    responseData = await response.text();
                    console.log('Text Response:', responseData);
                } else {
                    throw new Error('Unexpected response format');
                }

                Swal.fire({
                    title: 'Success!',
                    text: typeof responseData === 'string' ? responseData : 'Data saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                throw new Error('No Content-Type header found in response');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error saving the data. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error:', error);
        }
    };



    //============== renderForm_section =============//
    const renderFormSections = (sections) => {
        return sections.map((section) => {
            console.log(`Rendering section: ${JSON.stringify(section)}`); // Log section details
            switch (section.sectionLabel) {
                case 'complaints':
                case 'Complaints':
                    return <RenderComplaintsSection
                        section={section}
                        handleChange={handleChange}
                        cmoFormData={cmoFormData} />
                case 'diagnosis_form':
                case 'Diagnosis':
                    return <RenderDiagnosisFormSection
                        section={section}
                        handleChange={handleChange}
                        cmoFormData={cmoFormData} />
                case 'history':
                case 'History':
                    return <RenderHistorySection
                        section={section}
                        handleChange={handleChange}
                        handleCheckboxChange={handleCheckboxChange}
                        cmoFormData={cmoFormData}
                    />
                case 'procedure':
                case 'procedure':
                    return <RenderProcedureSection
                        section={section}
                        handleChange={handleChange}
                        cmoFormData={cmoFormData}
                    />
                case 'tpr':
                    return <RenderTPRSection
                        section={section}
                        handleChange={handleChange}
                        cmoFormData={cmoFormData}
                    />
                case 'extream':
                    return <RenderExtream
                        section={section}
                        handleChange={handleChange}
                        cmoFormData={cmoFormData}
                    />
                case 'tretment_cmo':
                case 'Treatment':
                    return <RenderCmoFormSection
                        section={section}
                        handleChange={handleChangeTreatment}
                        cmoFormData={cmoFormData} />;
                case 'physical_exam':
                case 'Physical ':
                    return <RenderPhysicalExamSection
                        section={section}
                        handlePhysicalExamChange={handlePhysicalExamChange}
                        cmoFormData={cmoFormData}
                    />;
                default:
                    return null;
            }
        });
    };

    const sortedFormData = formData.sort((a, b) => a.viewOrder - b.viewOrder);

    //============= main_return_function =============//
    return (
        <Container fluid className="custom-container ">
            <Card className="Admission_sheet_blk custom-card h-100">
                <CardBody>
                    <h2 className="text-center mb-5 header-text">Admission Sheet Form</h2>

                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12} className='mb-3'>
                                <IpdAdmissionDetails admissionId={admissionId} />
                            </Col>

                        </Row>
                    
                        <Row className="scroll-container">
                            {sortedFormData.map((section) => (
                                <Col xs={12} lg={section.sectionLabel === "tretment_cmo" ||
                                    section.sectionLabel === "Treatment" ? 12 : 4} key={section.rxRecordId}>
                                    {renderFormSections([section])}
                                </Col>
                            ))}
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </Container>

    );
};

export default AdmissionSheet;
