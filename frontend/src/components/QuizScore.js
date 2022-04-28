import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function QuizScore() {
  const params = new URLSearchParams(window.location.search);

  return (
    <Container maxWidth="md">
      <Paper sx={{mt: 4, p: 3}}>
        <Typography variant="h4" sx={{mb: 4}}>Score: {params.get('correct')} / {params.get('count')}</Typography>
        <Typography>Thanks for Taking our Quiz!</Typography>
      </Paper>
    </Container>
  )
}
