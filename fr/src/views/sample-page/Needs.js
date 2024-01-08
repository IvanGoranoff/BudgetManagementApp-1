import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box } from '@mui/material';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';

const Needs = () => {
    const [income, setIncome] = useState(0);
    const [needs, setNeeds] = useState(0);

    useEffect(() => {
        const fetchIncome = async () => {
            try {
                const response = await axios.get('https://localhost:7069/api/Income/1');
                setIncome(response.data);
                setNeeds(response.data * 0.5); // 50% от дохода за needs
            } catch (error) {
                console.error('Error fetching income:', error);
            }
        };

        fetchIncome();
    }, []);

    const handleIncomeChange = (event) => {
        const newIncome = event.target.value;
        setIncome(newIncome);
        setNeeds(newIncome * 0.5); // Пресмята needs на база новия доход
    };

    const handleNeedsChange = (event) => {
        const newNeeds = event.target.value;
        setNeeds(newNeeds);
        setIncome(newNeeds / 0.5); // Пресмята доход на база новите needs
    };

    return (
        <MainCard title="Needs">
            <Typography variant="body2" gutterBottom>
                At the core of every stable budget lie the &apos;needs&apos; - the fundamental expenses that are non-negotiable. They form the essence of our daily existence, encompassing housing, food, and healthcare, and must be addressed first. It&apos;s advisable to allocate around 50% of your net income to cover these imperative needs, with the percentage adjustable according to your individual requirements and standard of living. By measuring these expenditures accurately and mindfully, you can ensure a solid foundation for your financial stability and future.

            </Typography>
            <Box sx={{ maxWidth: 500, textAlign: 'center', mb: 4 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Typography variant="h6" gutterBottom>
                    Calculate Your Needs
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
                    label="Needs (up to 50%)"
                    value={needs}
                    onChange={handleNeedsChange}
                    margin="normal"
                    type="number"
                    helperText="This is 50% of your income"
                    sx={{ width: '90%', mb: 2 }}
                />
            </Box>
        </MainCard>
    );
};

export default Needs;
