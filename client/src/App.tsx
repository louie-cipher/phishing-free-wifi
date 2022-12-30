import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import PageTitle from './components/pageTitle';
import NotFound from './Pages/NotFound';
import Admin from './Pages/Admin';
import { Container, Footer, FooterLink, Line } from './style';
import ForgotPassword from './Pages/ForgotPassword';

function App() {
	return (
		<Container>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<PageTitle page={<Home />} title='WiFi Check-in' />} />
					<Route
						path='/administrator'
						element={<PageTitle page={<Admin />} title='Administrator panel' />}
					/>
					<Route
						path='/forgot-password'
						element={<PageTitle page={<ForgotPassword />} title='Forgot Password' />}
					/>
					<Route
						path='/*'
						element={<PageTitle page={<NotFound />} title='Not Found' />}
					/>
				</Routes>
			</BrowserRouter>
			<Line />
			<Footer>
				<FooterLink>Sobre</FooterLink>·<FooterLink>Ajuda</FooterLink>·
				<FooterLink>Mais</FooterLink>
				<br />
			</Footer>
			<FooterLink>Meta © 2022</FooterLink>
		</Container>
	);
}

export default App;
