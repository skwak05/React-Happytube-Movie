import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import VideoUploadPage from "./views/Video/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./views/Video/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./views/Video/SubscriptionPage/SubscriptionPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

import MovieLadningPage from "./views/Movie/LandingPage/LandingPage";
import MovieDetailPage from "./views/Movie/MovieDetailPage/MovieDetailPage";
import FavoritePage from "./views/Movie/FavoritePage/FavoritePage";


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, true)} />

          <Route exact path="/movie" component={Auth(MovieLadningPage, null)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetailPage, null)} />
          <Route exact path="/movie/favorite/list" component={Auth(FavoritePage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
