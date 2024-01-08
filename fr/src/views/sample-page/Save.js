import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box } from '@mui/material';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';

const Save = () => {
  const [income, setIncome] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get('https://localhost:7069/api/Income/1');
        setIncome(response.data);
        setSavings(response.data * 0.2); // 20% от дохода за спестявания
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    };

    fetchIncome();
  }, []);

  const handleIncomeChange = (event) => {
    const newIncome = event.target.value;
    setIncome(newIncome);
    setSavings(newIncome * 0.2); // Пресмята спестяванията на база новия доход
  };

  const handleSavingsChange = (event) => {
    const newSavings = event.target.value;
    setSavings(newSavings);
    setIncome(newSavings / 0.2); // Пресмята доход на база новите спестявания
  };

  return (
    <MainCard title="Save">
      <Typography variant="body2" gutterBottom>
        Saving is a crucial aspect of sound financial management. It&apos;s recommended to set aside at least 20% of your income for savings. This practice not only prepares you for unforeseen circumstances but also helps in building a future financial cushion. Whether it&apos;s for retirement, a major purchase, or an emergency fund, saving consistently ensures you&apos;re financially prepared for the future.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Calculate Your Savings
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
          label="Savings (up to 20%)"
          value={savings}
          onChange={handleSavingsChange}
          margin="normal"
          type="number"
          helperText="This is 20% of your income"
          sx={{ width: '90%', mb: 2 }}
        />
      </Box>
    </MainCard>
  );
};

export default Save;
