import { Outlet } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Header from '../components/partials/Header';
import Footer from '../components/partials/Footer';
import Sidebar from '../components/partials/Sidebar';

function DefaultLayout() {
  return (
    <Container>
      <Header />
      <div>
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
}

export default DefaultLayout;
