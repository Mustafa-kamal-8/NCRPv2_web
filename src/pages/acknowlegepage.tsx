import { useLocation } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Styled component for the print section
const PrintSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  width: '100%',
  maxWidth: '600px',
  margin: 'auto',
  '@media print': {
    'body *': { visibility: 'hidden' },
    '&.print-only, &.print-only *': {
      visibility: 'visible',
    },
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

// Styled component for the buttons
const ButtonsBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4), // Space between table and buttons
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  width: '100%',
  maxWidth: '600px',
  '@media print': {
    display: 'none', // Hide buttons during printf
  },
}));

const Acknowledgepage = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <Typography align="center">No data available</Typography>;
  }

  const { fullname, ref, courseData , regDate} = data;

  const handlePrint = () => {
    const input = document.getElementById('printable-section');
    html2canvas(input, { scale: 3 }).then((canvas) => { // Increased scale for higher resolution
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pdfWidth * 0.7; // Making image width 90% of PDF width for margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const marginX = (pdfWidth - imgWidth) / 2; // Center the image horizontally

      pdf.addImage(imgData, 'PNG', marginX, 20, imgWidth, imgHeight); // 20pt margin at the top
      pdf.save('acknowledgement.pdf');
    });
  }

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleBackToLogin = () => {
    window.location.href = '/auth/candidate-login';
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: { xs: 2, sm: 3, md: 4 } }}>
      <PrintSection className="print-only" id="printable-section">
        <Typography variant="h4" component="h1" gutterBottom>
          Acknowledgement
        </Typography>
        <Typography variant="body1" paragraph>
          Congratulations, <span style={{ color: 'blue' }}>{fullname}</span>! You have successfully registered for the skill training .
        </Typography>
        <Typography variant="body1" paragraph>
          You have received an SMS with To your Registered Mobile Number.
        </Typography>

        <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto', my: 2 }}>
        <Typography variant="body1" paragraph>
          Course Details :.
        </Typography>

          <Table>

            <TableHead>

              <TableRow>
                <TableCell>Preference</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Course</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseData.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{course.priority}</TableCell>
                  <TableCell>{course.districtName1}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="body1" paragraph>
          Your Ref ID is <span style={{ color: 'blue' }}>{ref}</span>. Training center will contact you soon for skill training.
          Visit{' '}
          <a href="https://skillmissionassam.org" target="_blank" rel="noopener noreferrer">
            www.skillmissionassam.org
          </a>{' '}
          for nearest center.<br></br>
          Registration Date: <span style={{ fontWeight: 'bold' }}>{regDate}</span>
        </Typography>
     

      {/* Buttons outside of PrintSection */}
      <ButtonsBox>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print
        </Button>
        <Button variant="contained" color="primary" onClick={handleBackToHome}>
          Back To Home
        </Button>
        <Button variant="contained" color="primary" onClick={handleBackToLogin}>
          Back To Login
        </Button>
      </ButtonsBox>
      </PrintSection>
    </Box>
    
  );
};

export default Acknowledgepage;
