import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box } from '@mui/material';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';

const Wants = () => {
  const [income, setIncome] = useState(0);
  const [wants, setWants] = useState(0);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get('https://localhost:7069/api/Income/1');
        setIncome(response.data);
        setWants(response.data * 0.3); // 30% от дохода за "wants"
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    };

    fetchIncome();
  }, []);

  const handleIncomeChange = (event) => {
    const newIncome = event.target.value;
    setIncome(newIncome);
    setWants(newIncome * 0.3); // Пресмята "wants" на база новия доход
  };

  const handleWantsChange = (event) => {
    const newWants = event.target.value;
    setWants(newWants);
    setIncome(newWants / 0.3); // Пресмята доход на база новите "wants"
  };

  return (
    <MainCard title="Wants">
      <Typography variant="body2" gutterBottom>
        &quot;Wants&quot; encompass the non-essential luxuries or desires in our lives. This category includes expenses like dining out, entertainment, hobbies, and other discretionary spending. Allocating around 30% of your income to &quot;wants&quot; ensures a balanced lifestyle while maintaining financial responsibility. It&apos;s important to enjoy life&apos;s pleasures without compromising your financial stability. Balancing &quot;wants&quot; with savings and necessary expenses is key to a healthy financial plan.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Calculate Your Wants
        </Typography>
        <TextField
          label="Income"
          value={income}
          onChange={handleIncomeChange}
          margin="normal"
          type="number"
          sx={{ width: '90%', mb: 2 }}
        />
        <TextField
          label="Wants (up to 30%)"
          value={wants}
          onChange={handleWantsChange}
          margin="normal"
          type="number"
          helperText="This is 30% of your income"
          sx={{ width: '90%', mb: 2 }}
        />
      </Box>
    </MainCard>
  );
};

export default Wants;
