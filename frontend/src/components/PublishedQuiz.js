import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';

import usePublishedQuiz from '../hooks/use-published-quiz';

export default function PublishedQuiz() {
  const params = useParams();
  const navigate = useNavigate();
  const { quiz, loading } = usePublishedQuiz(params.id);
  const [selectedAnswers, setSelectedAnswers] = useState({})

  function handleSubmit(e) {
    e.preventDefault();
    let answers = []
    const data = new FormData(e.currentTarget);
    for (let value of data.values()) {
      answers.push(Number(value))
    }

    axios.post(`/published/${quiz.external_id}/score`, { answers: answers })
    .then(response => navigate(`/published/${quiz.id}/score?correct=${response.data.correct}&count=${quiz.questions.length}`))
  }

  useEffect(() => {
    if (loading) { return }
    let obj = {}
    quiz.questions.forEach(question => {
      question.answers.forEach(answer => {
        obj[answer.id] = false
      })
    })

    setSelectedAnswers(obj)
  }, [quiz, loading])


  if (Object.keys(selectedAnswers).length === 0) { return null }

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h2" align="center" sx={{mt: 2}}>
        {quiz.title}
      </Typography>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          p: 2,
        }}
      >
        {quiz.questions.map((question, index) =>
          <div key={question.id}>
            <Box sx={{p: 4}} key={question.id}>
              <Typography>{index + 1}.{"  "}{question.body}</Typography>
              <RadioGroup>
                {question.answers.map(answer =>
                  <Grid container sx={{ alignItems: "center", mt: 2, mb: 2 }} key={answer.id}>
                    {question.question_type === "choose_one" ? 
                      <Radio name={String(question.id)} value={String(answer.id)}/> 
                    :
                      <Checkbox name={String(answer.id)} value={String(answer.id)} />
                    }
                    <Typography>{answer.body}</Typography>
                  </Grid>
                )}
              </RadioGroup>
            </Box>
            <Divider />
          </div>
        )}
        <Button fullWidth type="submit" variant="contained" sx={{mt: 3, mb: 3}}>Submit</Button>
      </Paper>
    </Container>
  )
}
