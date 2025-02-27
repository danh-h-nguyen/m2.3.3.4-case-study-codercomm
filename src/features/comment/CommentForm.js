import React, { useState } from "react";
import { Avatar, IconButton, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
// ======
import useAuth from "../../hooks/useAuth";
import { createComment } from "./commentSlice";
// ======

function CommentForm({ postId }) {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ postId, content }));
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarUrl} alt={user.name} />

        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder="Write a comment..."
          onChange={(event) => setContent(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
          }}
        />

        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
  );
}

export default CommentForm;
