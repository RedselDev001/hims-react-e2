import React,{useEffect,useState} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Live from '../Config';

// Custom styles using inline style or classes
const styles = {
  headerContainer: {
    backgroundColor: 'white', // Matches the header background color
    padding: '0px 10px',
    borderRadius: '8px',
    
    position: 'relative',
    color: 'black'
  },
  patientInfo: {

    fontSize: '16px',
  },
  barcode: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  barcodeImage: {
    marginLeft: '10px',
    height: '40px'
  }
};



const PatientHeader = () => {
    const [patientData, setPatientData] = useState(null); // State to store fetched patient data

    useEffect(() => {
        const fetchPatientDetails = async () => {
        
          try {
            const token = localStorage.getItem('authToken'); // Get the token from localStorage
            const inputString = localStorage.getItem('admissionId'); // Assuming you now store the patientId
            const id = inputString.match(/\d+/)[0]; 
           
            

            const response = await fetch(
              `${Live.Port}/hms/opd/appointment/${id}`, // Updated URL
              {
                headers: { 'Authorization': `Bearer ${token}` } // Pass the token in headers
              }
            );
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setPatientData(data); // Set the fetched data in state
          
            localStorage.setItem("id", JSON.stringify({
              id: data.patientId,
              uhid: data.uhid
          }));
          } catch (error) {
            console.error('Error fetching patient details:', error);
          }
        };
    
        fetchPatientDetails();
      }, []);
  return (
    <Container fluid style={styles.headerContainer}>
      <Row className="align-items-center">
        {/* Patient Information */}
        <Col xs="8">
          <div style={styles.patientInfo}>
            <strong>Name:</strong> {patientData?.patientName || ""} 
          </div>
          <div style={styles.patientInfo}>
            <strong>Age:</strong> {patientData?.dob || ""}| <strong>OPD Number:</strong> OPD/9973
          </div>
          <div style={styles.patientInfo}>
            <strong>Gender:</strong> {patientData?.gender || ""} | <strong>Mobile #:</strong> {patientData?.phone }
          </div>
          <div style={styles?.patientInfo || ""}>
            <strong>Referring Dr.:</strong> (if applicable)
          </div>
        </Col>

        {/* Barcode and UHID */}
        <Col xs="4" className="text-end d-flex justify-content-end align-items-center">
          <div>
            <strong>UHID:</strong> {patientData?.uhid || ""}
          </div>
          <img
            src={`${process.env.PUBLIC_URL}/barcode.png`} 
            alt="barcode"
            style={styles.barcodeImage}
          />
        </Col>
      </Row>

      {/* Close Button */}
      {/* <Button style={styles.closeButton} onClick={() => alert('Close clicked')}>
        Close X
      </Button> */}
    </Container>
  );
};

export default PatientHeader;
