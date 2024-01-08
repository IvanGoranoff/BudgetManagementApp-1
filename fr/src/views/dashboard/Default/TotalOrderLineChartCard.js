import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

import ChartDataMonth from './chart-data/total-order-month-line-chart';
import ChartDataYear from './chart-data/total-order-year-line-chart';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
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
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
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

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
    const theme = useTheme();
    const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
    const [expenseData, setExpenseData] = useState({
        amount: '',
    });
    const [apiData, setApiData] = useState(null);

    const [timeValue, setTimeValue] = useState(false);
    const handleExpenseIconClick = () => {
        setExpenseModalOpen(true);
    };

    const handleCloseExpenseModal = () => {
        setExpenseModalOpen(false);
    };

    const handleAddExpense = async () => {
        try {
            await axios.put(`https://localhost:7069/api/Expenses/1/${expenseData.amount}`);
            const updatedExpensesResponse = await axios.get('https://localhost:7069/api/Expenses/1');
            setApiData(updatedExpensesResponse.data);
            setExpenseData({ amount: '' });
            toast.success("Expense updated successfully");
        } catch (error) {
            console.error('Error updating expenses:', error);
            toast.error("Error updating expenses");
        } finally {
            handleCloseExpenseModal();
        }
    };



    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const response = await axios.get('https://localhost:7069/api/Expenses/1');
                setApiData(response?.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching API data:', error);
                // Handle error appropriately
            }
        };

        fetchApiData();
    }, []);
    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
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
                                                backgroundColor: theme.palette.primary[800],
                                                color: '#fff',
                                                mt: 1,
                                                cursor: 'pointer'
                                            }}
                                            onClick={handleExpenseIconClick}
                                        >
                                            <LocalMallOutlinedIcon fontSize="inherit" />
                                        </Avatar>
                                    </Grid>

                                    <Grid item>
                                        <Button
                                            disableElevation
                                            variant={timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, true)}
                                        >
                                            Month
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant={!timeValue ? 'contained' : 'text'}
                                            size="small"
                                            sx={{ color: 'inherit' }}
                                            onClick={(e) => handleChangeTime(e, false)}
                                        >
                                            Year
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                {timeValue ? (
                                                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>$108</Typography>
                                                ) : (
                                                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{`$${apiData?.toString()}`}</Typography>
                                                )}
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        ...theme.typography.smallAvatar,
                                                        cursor: 'pointer',
                                                        backgroundColor: theme.palette.primary[200],
                                                        color: theme.palette.primary.dark
                                                    }}
                                                >
                                                    <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: theme.palette.primary[200]
                                                    }}
                                                >
                                                    Expenses
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        {timeValue ? <Chart {...ChartDataMonth} /> : <Chart {...ChartDataYear} />}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Dialog open={isExpenseModalOpen} onClose={handleCloseExpenseModal} maxWidth="sm" fullWidth>
                        <DialogTitle>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleCloseExpenseModal}
                                sx={{ position: 'absolute', top: theme.spacing(1), right: theme.spacing(1) }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Add Expense
                            </Typography>

                            {/* Инпут поле за сума */}
                            <TextField
                                fullWidth
                                label="Amount"
                                type="number"
                                name="amount"
                                value={expenseData.amount}
                                onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                                sx={{ mb: 2 }}
                            />

                            {/* Бутони за добавяне и затваряне */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddExpense}
                                sx={{ mr: 2 }}
                            >
                                Add
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleCloseExpenseModal}>
                                Close
                            </Button>
                        </DialogContent>
                    </Dialog>

                </CardWrapper>
            )}
        </>
    );
};

TotalOrderLineChartCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
