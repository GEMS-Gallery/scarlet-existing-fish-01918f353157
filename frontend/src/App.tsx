import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, Box, Grid, Paper, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/system';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Routes, Route, Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const HomePage = () => {
  const [dogecoinInfo, setDogecoinInfo] = useState<string>('');
  const [memes, setMemes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await backend.getDogecoinInfo();
        setDogecoinInfo(info);

        const randomMemes = await backend.getRandomMemes(5);
        setMemes(randomMemes);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        </Grid>
      </Box>
    </Container>
  );
};

const ArticlesPage = () => {
  const [articles, setArticles] = useState<[string, string, number | null][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await backend.getArticles();
        setArticles(fetchedArticles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
          Dogecoin Articles
        </Typography>
        <Grid container spacing={3}>
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

const PriceHistoryPage = () => {
  const [priceHistory, setPriceHistory] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      try {
        const history = await backend.getDogecoinPriceHistory();
        setPriceHistory(history);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching price history:', error);
        setLoading(false);
      }
    };

    fetchPriceHistory();
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
          Dogecoin Price History
        </Typography>
        <StyledPaper>
          <Line data={chartData} />
        </StyledPaper>
      </Box>
    </Container>
  );
};

const FAQPage = () => {
  const [faqs, setFAQs] = useState<[string, string][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const fetchedFAQs = await backend.getFAQs();
        setFAQs(fetchedFAQs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

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
          Frequently Asked Questions
        </Typography>
        {faqs.map(([question, answer], index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

const App: React.FC = () => {
  return (
    <>
      <Box sx={{ backgroundColor: '#BA9F33', padding: 2 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
            </Grid>
            <Grid item>
              <Link to="/articles" style={{ color: 'white', textDecoration: 'none' }}>Articles</Link>
            </Grid>
            <Grid item>
              <Link to="/price-history" style={{ color: 'white', textDecoration: 'none' }}>Price History</Link>
            </Grid>
            <Grid item>
              <Link to="/faq" style={{ color: 'white', textDecoration: 'none' }}>FAQ</Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/price-history" element={<PriceHistoryPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </>
  );
};

export default App;
