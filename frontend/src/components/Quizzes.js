import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import CreateQuiz from './CreateQuiz';
import useQuizzes from '../hooks/use-quizzes';

export default function Quizzes() {
  const { quizzes, loading, mutate } = useQuizzes()

  function deleteQuiz(id) {
    axios.delete(`/quizzes/${id}`)
    .then(() => mutate())
  }

  if (loading) { return null }

  return (
    <Container maxWidth={"sm"}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 5 }}>
        <Typography variant="h4">Quizzes</Typography>
        <CreateQuiz />
      </Grid>
      <Paper sx={{ p: 2, mt: 2 }}>
        {quizzes.map(quiz =>
          <div key={quiz.id}>
            <Grid container justifyContent="space-between">
              <div>
                <Link to={quiz.published ? `/published/${quiz.external_id}` : `/quizzes/edit/${quiz.id}`} component={RouterLink}>
                  <Typography variant="h6" component="span" sx={{mr: 2}}>{quiz.title}</Typography>
                </Link>
                <Typography variant="body">
                  {quiz.published ? <span>(published)</span> : <span>(draft)</span>}
                </Typography>
              </div>

              <Button color="error" onClick={() => deleteQuiz(quiz.id)}>Delete</Button>
            </Grid>
          </div>
        )}
      </Paper>
    </Container>
  )
}
