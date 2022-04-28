import { Link as RouterLink } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Welcome() {
  return (
    <Container component="main" maxWidth="md" align="center">
      <Typography variant="h3" sx={{mt: 4, mb: 4}}>Create and Share Quizzes</Typography>
      <Button component={RouterLink} to="/signup" variant="contained" size="large">Get Started</Button>
    </Container>
  )
}
