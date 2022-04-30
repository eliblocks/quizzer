import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('')

  function handleCreate() {
    axios.post('/quizzes', {
      title,
    })
    .then((response) => navigate(`/quizzes/edit/${response.data.id}`))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        + New Quiz
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create Quiz</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Quiz Title"
            fullWidth
            variant="standard"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
