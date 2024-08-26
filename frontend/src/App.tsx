import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, Box, Grid, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const App: React.FC = () => {
  const [dogecoinInfo, setDogecoinInfo] = useState<string>('');
  const [memes, setMemes] = useState<string[]>([]);
  const [articles, setArticles] = useState<[string, string, number | null][]>([]);
  const [priceHistory, setPriceHistory] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await backend.getDogecoinInfo();
        setDogecoinInfo(info);

        const randomMemes = await backend.getRandomMemes(5);
        setMemes(randomMemes);

        const fetchedArticles = await backend.getArticles();
        setArticles(fetchedArticles);

        const history = await backend.getDogecoinPriceHistory();
        setPriceHistory(history);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: priceHistory.map(([timestamp]) => new Date(Number(timestamp) / 1000000).toLocaleDateString()),
    datasets: [
      {
        label: 'Dogecoin Price (USD)',
        data: priceHistory.map(([, price]) => price),
        borderColor: '#BA9F33',
        backgroundColor: 'rgba(186, 159, 51, 0.5)',
      },
    ],
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Much Wow Dogecoin
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h5" gutterBottom>
                What is Dogecoin?
              </Typography>
              <Typography>{dogecoinInfo}</Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h5" gutterBottom>
                Dogecoin Price History
              </Typography>
              <Line data={chartData} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h5" gutterBottom>
                Much Meme, Very Gallery
              </Typography>
              <Grid container spacing={2}>
                {memes.map((meme, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <img src={meme} alt={`Doge meme ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Grid>
          {articles.map(([title, content, timestamp], index) => (
            <Grid item xs={12} key={index}>
              <StyledPaper>
                <Typography variant="h5" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {timestamp ? new Date(Number(timestamp) / 1000000).toLocaleDateString() : 'Date unknown'}
                </Typography>
                <Typography>{content}</Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
