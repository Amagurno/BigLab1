import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { MySidebar } from './Components/MySidebar';
import { MyNavBar} from './Components/MyNavbar';
import { FilmList } from './Components/MyMain';
import dayjs from 'dayjs';
import './App.css';
import './Components/custom.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmForm from './FilmForm';

const fakeFilms = [
  { id: 1, name: 'Pulp Fiction', favorite: true, date: dayjs('2022-03-10'), rating: 5 },
  { id: 2, name: '21 Grams', favorite: true, date: dayjs('2022-04-17'), rating: 4 },
  { id: 3, name: 'Star Wars', favorite: false, date: undefined, rating: undefined },
  { id: 4, name: 'Matrix', favorite: false, date: undefined, rating: undefined },
  { id: 5, name: 'Shrek', favorite: false, date: dayjs('2022-03-21'), rating: 3 }
];

function App() {
  const [films, setFilms] = useState(fakeFilms);

  function deleteExam(id) {
    setFilms(films.filter((f) => f.id !== id));
  }

  function setFavorite(id) {
    setFilms(films => films.map(
      f => (f.id === id) ? { id: f.id, name: f.name, favorite: !f.favorite, date: f.date, rating: f.rating } : f
    ));
  }

  function setRating(id, rate) {
    setFilms(films => films.map(
      f => (f.id === id) ? { id: f.id, name: f.name, favorite: f.favorite, date: f.date, rating: rate } : f
    ));
  }

  function addFilm(film) {
    setFilms(oldFilm => [...oldFilm, film]);
  }

  function updateFilm(film) {
    setFilms(films => films.map(
      f => (f.id === film.id) ? Object.assign({}, film) : f
    ));
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<> <Row><MyNavBar></MyNavBar></Row><Row> <Col xl={3}><MySidebar selected={'All'} /></Col> <Col xl={9}><FilmList films={films} selected={'All'} deleteExam={deleteExam} setFavorite={setFavorite} setRating={setRating} /></Col> </Row> </>} />
          <Route path='/all' element={<> <Row><MyNavBar></MyNavBar></Row><Row> <Col xl={3}><MySidebar selected={'All'} /></Col> <Col xl={9}><FilmList films={films} selected={'All'} deleteExam={deleteExam} setFavorite={setFavorite} setRating={setRating} /></Col> </Row></>} />
          <Route path='/favorites' element={<> <Row><MyNavBar></MyNavBar></Row><Row> <Col xl={3}><MySidebar selected={'Favorites'} /></Col> <Col xl={9}><FilmList films={films} selected={'Favorites'} deleteExam={deleteExam} setFavorite={setFavorite} setRating={setRating} /></Col> </Row></>} />
          <Route path='/bestrated' element={<> <Row><MyNavBar></MyNavBar></Row><Row> <Col xl={3}><MySidebar selected={'Best rated'} /></Col> <Col xl={9}><FilmList films={films} selected={'Best rated'} deleteExam={deleteExam} setFavorite={setFavorite} setRating={setRating} /></Col> </Row></>} />
          <Route path='/seenLastMonth' element={<> <Row><MyNavBar></MyNavBar></Row><Row> <Col xl={3}><MySidebar selected={'Seen Last Month'} /></Col> <Col xl={9}><FilmList films={films} selected={'Seen Last Month'} deleteExam={deleteExam} setFavorite={setFavorite} setRating={setRating} /></Col> </Row></>} />
          <Route path='/unseen' element={<> <Row><MyNavBar></MyNavBar></Row><Row> <Col xl={3}><MySidebar selected={'Unseen'} /></Col> <Col xl={9}><FilmList films={films} selected={'Unseen'} deleteExam={deleteExam} setFavorite={setFavorite} setRating={setRating} /></Col> </Row></>} />
          <Route path='/add' element={<> <Row><MyNavBar></MyNavBar></Row><FilmForm films={films} addOrEditFilm={addFilm} /></>} />
          <Route path='/edit/:filmId' element={<> <Row><MyNavBar></MyNavBar></Row><FilmForm addOrEditFilm={updateFilm} films={films} /></>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;