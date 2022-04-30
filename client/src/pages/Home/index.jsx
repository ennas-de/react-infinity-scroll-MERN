import * as React from "react";
import axios from "axios";
import { dataAPI } from "../../api";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/Loader";

const theme = createTheme();

export default function Home({ updateUser, user }) {
  const [items, setItems] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(2);

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${dataAPI}1&results=50`);
      setItems(res.data.results);
    };
    getData();
  }, []);

  const getMoreData = async () => {
    const res = await axios.get(`${dataAPI}${page}&results=50`);
    const data = res.data.results;
    return data;
  };

  const fetchData = async () => {
    const fetchMoreDatas = await getMoreData();

    setItems([...items, ...fetchMoreDatas]);

    if (fetchMoreDatas.length === 0 || fetchMoreDatas.length < 50) {
      setHasMore(false);
    }

    setPage(page + 1);
  };
  return (
    <div>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
              <Toolbar
                style={{
                  justifyContent: "space-between",
                  margin: "10px 30px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <CameraIcon sx={{ mr: 2 }} />
                  <Typography variant="h6" color="inherit" noWrap>
                    React-Infinity-Scroll
                  </Typography>
                </div>
                <div>
                  <Button
                    onClick={() => updateUser({})}
                    style={{ color: "#fff" }}
                  >
                    Logout
                  </Button>
                </div>
              </Toolbar>
            </AppBar>
            <main>
              {/* Hero unit */}
              <Box
                sx={{
                  bgcolor: "background.paper",
                  pt: 8,
                  pb: 6,
                }}
              >
                <Container maxWidth="sm">
                  <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    React-Infinity-Scroll
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                  >
                    A demo React frontend app showcasing the INFINITY scrolling
                    effect. <br />
                    Something short and leading about the collection below—its
                    contents, the creator, etc. Make it short and sweet, but not
                    too short so folks don&apos;t simply skip over it entirely.
                  </Typography>
                </Container>
              </Box>
              <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                  {items.map((item) => (
                    <Grid item key={item} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        key={item.login.uuid}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            // 16:9
                            pt: "56.25%",
                          }}
                          image={item.picture.large}
                          alt={item.name.first}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.name.first} {item.name.last}
                          </Typography>
                          <Typography>
                            Location: {item.location.street.name}{" "}
                            {item.location.street.number}, {item.location.city},{" "}
                            {item.location.postcode}, {item.location.country}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">View</Button>
                          <Button size="small">Edit</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </main>

            {/* Footer */}
            <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
              <Typography variant="h6" align="center" gutterBottom>
                Footer
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
              >
                Something here to give the footer a purpose!
              </Typography>
            </Box>
            {/* End footer */}
          </ThemeProvider>
        </div>{" "}
      </InfiniteScroll>
    </div>
  );
}
