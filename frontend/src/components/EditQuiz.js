import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


import useQuiz from '../hooks/use-quiz';

export default function EditQuiz() {
  let params = useParams();
  const { quiz, loading, mutate } = useQuiz(params.id);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useImmer([]);
  const navigate = useNavigate();

  function handleSnackbarClose() {
    setSnackbarOpen(false)
  }

  function addQuestion() {
    setQuestions(draft => {
      draft.push({
        body: '',
        question_type: 'choose_one',
        answers: []
      })
    })
  }

  function handleAddAnswer(index) {
    setQuestions(draft => {
      draft[index].answers.push({
        body: '',
        correct: false,
      })
    })
  }

  function handleQuestionChange(e) {
    setQuestions(draft => {
      draft[Number(e.target.id)].body = e.target.value
    })
  }

  function handleAnswerChange(e, questionIndex, answerIndex) {
    setQuestions(draft => {
      draft[questionIndex].answers[answerIndex].body = e.target.value
    })
  }

  function handleCheckRadioAnswer(e, questionIndex, answerIndex) {
    setQuestions(draft => {
      let answers = draft[questionIndex].answers
      answers.forEach(answer => answer.correct = false)
      answers[answerIndex].correct = true
    })
  }

  function handleCheckboxAnswer(e, questionIndex, answerIndex) {
    setQuestions(draft => {
      draft[questionIndex].answers[answerIndex].correct = e.target.checked
    })
  }

  function handleQuestionTypeChange(e, index) {
    setQuestions(draft => {
      draft[index].question_type = e.target.value
    })
  }

  function deleteQuestion(index) {
    setQuestions(draft => {
      draft.splice(index, 1)
    })
  }

  function handleDeleteAnswer(e, index, answerIndex) {
    setQuestions(draft => {
      draft[index].answers.splice(answerIndex, 1)
    })
  }

  function handleUpdate(e) {
    e.preventDefault();
    axios.patch(`/quizzes/${params.id}`, {
      title,
      questions
    })
    .then(() => {
      setSnackbarOpen(true)
      mutate()
    })
  }

  function handlePublish() {
    axios.patch(`/quizzes/${params.id}/publish`)
    .then(() => navigate('/quizzes'))
  }

  useEffect(() => {
    setTitle(quiz?.title || '')
    setQuestions(quiz?.questions || [])
  }, [quiz?.title, quiz?.questions, setQuestions]);

  console.log(questions)

  if (loading) { return null }

  return (
    <Container component="main" maxWidth="md">
      <Grid container justifyContent="space-between" sx={{mt: 3}}>
        <Typography component="h1" variant="h4">
          Edit Quiz
        </Typography>
        <Button variant="contained" color="success" onClick={handlePublish}>Publish</Button>
      </Grid>
      <Paper
        sx={{
          mt: 2,
          p: 2,
        }}
      > 
        <form onSubmit={handleUpdate}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Quiz Title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          {questions.map((question, index) =>
            <div key={index}>
              <Box sx={{p: 4}}>
                <Grid container sx={{ alignItems: 'center' }}>
                  <Typography sx={{mr: 2}} variant="h5">Question #{index + 1}</Typography>
                  <TextField
                    fullWidth
                    id={String(index)}
                    name="question"
                    value={question.body}
                    onChange={handleQuestionChange}
                  />
                </Grid>

                <FormControl sx={{mt: 1}}>
                  <FormLabel id="question-typle-label">Question Type</FormLabel>
                  <RadioGroup
                    aria-labelledby="question-type-label"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel 
                      value="choose_one" 
                      control={
                        <Radio 
                          checked={question.question_type === "choose_one"}
                          value="choose_one"
                          onChange={e => handleQuestionTypeChange(e, index)} 
                        />
                      } 
                      label="Choose one" 
                    />
                    <FormControlLabel 
                      value="select_all"
                      control={
                        <Radio checked={question.question_type === "select_all"}
                        value="select_all"
                        onChange={e => handleQuestionTypeChange(e, index)} />
                      } 
                      label="Select all" 
                    />
                  </RadioGroup>
                </FormControl>
                {question.answers.map((answer, answerIndex) =>
                  <Grid container sx={{ alignItems: "center", mt: 2, mb: 2 }} key={answerIndex}>
                    {question.question_type === "choose_one" ? 
                      <Radio checked={answer.correct} onChange={e => handleCheckRadioAnswer(e, index, answerIndex)} /> 
                    : 
                      <Checkbox checked={answer.correct} onChange={e => handleCheckboxAnswer(e, index, answerIndex)} />
                    }
                    <TextField
                      sx={{ flexGrow: 1 }}
                      id={String(answerIndex)}
                      name="answer"
                      value={answer.body}
                      onChange={e => handleAnswerChange(e, index, answerIndex)}
                    />
                    <IconButton onClick={e => handleDeleteAnswer(e, index, answerIndex)}>
                      <DeleteOutlinedIcon color="error" fontSize="large"/>
                    </IconButton>
                  </Grid>
                )}
                <Grid container justifyContent="space-between" sx={{ mt : 1}}>
                  <Button variant="contained" onClick={() => handleAddAnswer(index)}>Add Answer</Button>
                  <Button color="error" variant="contained" onClick={() => deleteQuestion(index)}>Delete Question</Button>
                </Grid>
              </Box>
              <Divider />
            </div>
          )}
          { questions.length < 10 &&
            <Button variant="contained" onClick={addQuestion} sx={{ mt: 3, mb: 3}}>
              + Add Question
            </Button>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            Save and Continue
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} variant="filled" severity="success" sx={{ width: '100%' }}>
          Quiz saved
        </Alert>
      </Snackbar>
    </Container>
  )
}
