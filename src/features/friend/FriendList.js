import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Container,
  Grid2,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
// ======
import { getFriends } from "./friendSlice";
import SearchInput from "../../components/SearchInput";
import UserCard from "./UserCard";
// ======

function FriendList() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = React.useState(1);

  const { currentPageUsers, usersById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );
  const users = currentPageUsers.map((userId) => usersById[userId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends({ filterName, page }));
  }, [filterName, page, dispatch]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
      </Typography>

      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Box sx={{ flexGrow: 1 }} />

            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 0 ? `${totalUsers} user(s) found` : "No user found"}
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>

        <Grid2 container spacing={3} my={1}>
          {users.map((user) => (
            <Grid2 key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid2>
          ))}
        </Grid2>
      </Card>
    </Container>
  );
}

export default FriendList;
