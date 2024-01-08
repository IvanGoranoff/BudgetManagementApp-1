// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <MainCard title="How to manage budget?">
    <Typography variant="body2" paragraph>
      Good life comes by making good choices. Here you can find some tips that will help you stay motivated to keep track of your expenses.
    </Typography>
    <Typography variant="body2" paragraph>
      For better planning, you can categorize expenses into three categories: 50% for needs (such as rent, fees, food, etc.), 30% for wants
      (everything that doesn&apos;t fit in the first category), and 20% for savings (the amount you have left to invest in something greater).
    </Typography>
    <Typography variant="body2" paragraph>
      To decide which category an expense belongs to, ask yourself these questions:
      <ul>
        <li>What are my financial goals for the short-term, mid-term, and long-term?</li>
        <li>What are my current sources of income, and are they consistent or variable?</li>
        <li>What are my fixed and variable expenses?</li>
        <li>How much am I currently saving each month?</li>
        <li>What unnecessary expenses can I reduce or eliminate?</li>
        <li>Have I accounted for irregular expenses like car maintenance or home repairs?</li>
        <li>Have I reviewed my budget periodically to assess overspending?</li>
      </ul>
    </Typography>
    <Typography variant="body2" paragraph>
      Additional tips:
      <ul>
        <li>Look for coupons, discounts, and special deals.</li>
        <li>Cook at home to save money and control portions.</li>
        <li>Research prices before making big purchases.</li>
        <li>Reduce utility bills with energy-efficient practices.</li>
        <li>Give yourself time before making non-essential purchases.</li>
      </ul>
    </Typography>
  </MainCard>
);

export default SamplePage;
