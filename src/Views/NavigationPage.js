import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Outlet,
  Routes,
} from 'react-router-dom';
import './NavigationPageStyles.css';
import IntroPage from './Intro/IntroPage';
import FaceRecognitionPage from './FaceRecognition/FaceRecognitionPage';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

const Navigation = (parms) => {
  const Router = BrowserRouter;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IntroPage />} />
          <Route path="facerecogniton" element={<FaceRecognitionPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </Router>
    // <Router>
    //   <div>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/about">About</Link>
    //       </li>
    //       <li>
    //         <Link to="/dashboard">Dashboard</Link>
    //       </li>
    //     </ul>

    //     <hr />

    //     {/*
    //       A <Switch> looks through all its children <Route>
    //       elements and renders the first one whose path
    //       matches the current URL. Use a <Switch> any time
    //       you have multiple routes, but you want only one
    //       of them to render at a time
    //     */}
    //     <Switch>
    //       <Route exact path="/">
    //         <Home />
    //       </Route>
    //       <Route path="/about">
    //         <About />
    //       </Route>
    //       <Route path="/dashboard">
    //         <Dashboard />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>
  );
};

// You can think of these components as "pages"
// in your app.

const Layout = () => {
  return (
    <>
      <div className="header">
        <nav className="nav">
          <Link to="/" className="headerLink">
            <div className="menuOptions">Home</div>
          </Link>
          <Link to="/facerecogniton" className="headerLink">
            <div className="menuOptions">Face Recognition</div>
          </Link>
          <Link to="/dashboard" className="headerLink">
            <div className="menuOptions">Dashboard</div>
          </Link>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

// const FaceRecognition_Page = (parms) => {
//   return (
//     <div>
//       <p>Hello Face</p>
//     </div>
//   );
// };
// const FaceRecognitionPage2 = FaceRecognition_Page;

// function FaceRecognitionPage() {
//   return (
//     <div>
//       <h2>Hello Face</h2>
//     </div>
//   );
// }

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

const NoPage = () => {
  return <h1>404</h1>;
};

export default Navigation;
