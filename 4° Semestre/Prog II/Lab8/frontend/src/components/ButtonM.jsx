import React from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function ButtonM() {
  const [followText, setFollowText] = React.useState('Follow');
  const [buttonColor, setButtonColor] = React.useState();

  const FollowStatus = (isFollowing) => {
    const message = isFollowing ? 'Recebi um follow' : 'Recebi unfollow';
    console.log(message); 
  };

  const FollowClick = () => {
    if (followText === 'Follow') {
      setFollowText('Following');
      setButtonColor('rgba(0, 0, 0, 0.38)');
      FollowStatus(true);
    } else {
      setFollowText('Follow');
      setButtonColor();
      FollowStatus(false); 
    }
  };

  return (
    <Grid container justifyContent="center">
      <Button
        variant="contained"
        onClick={FollowClick}
        sx={{ backgroundColor: buttonColor,
              marginBottom: '20px', }} 
        style={{ height: '50px',
                 fontSize: "20px"
                }}
      >
        {followText}
      </Button>
    </Grid>
  );
}

export default ButtonM;
