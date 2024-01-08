import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid } from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton, TextField, Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading }) => {
  const theme = useTheme();
  const [isModalOpen, setModalOpen] = useState(false);
  const [incomeData, setIncomeData] = useState({
    amount: '',
  });
  const [ApiIncomeData, setApiIncomeData] = useState(null);

  const handleEarningIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {

    setModalOpen(false);

  };

  useEffect(() => {
    const fetchApiIncomeData = async () => {
      try {
        const response = await axios.get('https://localhost:7069/api/Income/1');
        setApiIncomeData(response?.data);
        console.log('Response data:', response.data); // Logging the data
      } catch (error) {
        console.error('Error fetching ApiIncome data:', error);
        // Handle error appropriately
      }
    };

    fetchApiIncomeData();
  }, []);



  const handleInputChange = (e) => {
    setIncomeData({
      ...incomeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddIncome = async () => {
    try {
      await axios.put(`https://localhost:7069/api/Income/1/${incomeData.amount}`);
      const updatedIncomeResponse = await axios.get('https://localhost:7069/api/Income/1');
      setApiIncomeData(updatedIncomeResponse.data);
      setIncomeData({ amount: '' });
      toast.success("Income updated successfully");
    } catch (error) {
      console.error('Error updating income:', error);
      toast.error("Error updating income");
    }
    handleCloseModal();
  };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.secondary[800],
                        mt: 1,
                        cursor: 'pointer'
                      }}
                      onClick={handleEarningIconClick}
                    >
                      <img src={EarningIcon} alt="Notification" />
                    </Avatar>
                  </Grid>

                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{`$${ApiIncomeData?.toString()}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: 'pointer',
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[200],
                        color: theme.palette.secondary.dark
                      }}
                    >
                      <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: theme.palette.secondary[200]
                  }}
                >
                  Income
                </Typography>
              </Grid>
            </Grid>
          </Box>


          <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
            <DialogTitle>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseModal}
                sx={{ position: 'absolute', top: theme.spacing(1), right: theme.spacing(1) }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Add Income
              </Typography>
              {/* Инпут поле за сума */}
              <TextField
                fullWidth
                label="Amount"
                type="number"
                name="amount"
                value={incomeData.amount}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              {/* Бутони за добавяне и затваряне */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddIncome}
                sx={{ mr: 2 }}
              >
                Add
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </DialogContent>
          </Dialog>

        </CardWrapper>
      )}
    </>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};

export default EarningCard;
