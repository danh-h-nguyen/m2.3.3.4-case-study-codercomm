import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Card, InputAdornment, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// ======
import useAuth from "../../hooks/useAuth";
import FTextField from "../../components/form/FTextField";
import { updateUserProfile } from "./userSlice";
import FormProvider from "../../components/form/FormProvider";
// ======

const SOCIAL_LINKS = [
  {
    value: "facebookLink",
    icon: <FacebookIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "instagramLink",
    icon: <InstagramIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "linkedinLink",
    icon: <LinkedInIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "twitterLink",
    icon: <TwitterIcon sx={{ fontSize: 30 }} />,
  },
];

function AccountSocialLinks() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.user.isLoading);
  const defaultValues = {
    facebookLink: user?.facebookLink || "",
    instagramLink: user?.instagramLink || "",
    linkedinLink: user?.linkedinLink || "",
    twitterLink: user?.twitterLink || "",
  };

  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <FTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default AccountSocialLinks;
