import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import { Col, Container, Row, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { MyNavBar } from './MyNavbar';

function FilmList(props) {
    const navigate = useNavigate();

    function renderSwitch(choose) {
        switch (choose) {
            case 'All':
                return props.films.map((f) => <FilmRow film={f} key={f.id} deleteExam={props.deleteExam} setFavorite={props.setFavorite} setRating={props.setRating} />);
            case 'Favorites':
                return props.films.filter((f) => f.favorite == true).map((f) => <FilmRow film={f} key={f.id} deleteExam={props.deleteExam} setFavorite={props.setFavorite} setRating={props.setRating} />);
            case 'Best rated':
                return props.films.filter((f) => f.rating == 5).map((f) => <FilmRow film={f} key={f.id} deleteExam={props.deleteExam} setFavorite={props.setFavorite} setRating={props.setRating} />);
            case 'Seen Last Month':
                return props.films.filter((f) => {
                    if (f.date != undefined)
                        return f.date.isAfter(dayjs().subtract(30, 'days'))
                }).map((f) => <FilmRow film={f} key={f.id} deleteExam={props.deleteExam} setFavorite={props.setFavorite} setRating={props.setRating} />);
            case 'Unseen':
                return props.films.filter((f) => f.date == undefined).map((f) => <FilmRow film={f} key={f.id} deleteExam={props.deleteExam} setFavorite={props.setFavorite} setRating={props.setRating} />);
        }
    }

    return (

        <>
            <main class="col-8 col-12 below-nav">
                <h1 class="mb-2" id="filter-title">Filter: {props.selected}</h1>
                <ul class="list-group list-group-flush" id="list-films">
                    {renderSwitch(props.selected)}
                </ul>
                <button type="button" class="position-absolute bottom-0 end-0 btn btn-primary btn-circle btn-lg" onClick={() => { navigate(`/add`) }}>+</button>
            </main>
        </>

    )
}

function FilmRow(props) {
    return (
        <FilmData film={props.film} deleteExam={props.deleteExam} setFavorite={props.setFavorite} setRating={props.setRating} />
    );
}

function FilmData(props) {
    const navigate = useNavigate();

    return (
        <>
            <li className="list-group-item">
                <div className="d-flex w-100 justify-content-between">
                    <p className="favorite text-start col-md-5 col-3">
                        <i class="bi bi-pencil-square" onClick={() => { navigate(`/edit/${props.film.id}`) }}></i>
                        <i class="bi bi-trash3" onClick={() => { props.deleteExam(props.film.id) }}></i>
                        <span className={(props.film.favorite == true) ? 'text-danger' : ''}>{props.film.name}</span>
                    </p>
                    <span className="custom-control custom-checkbox col-md-1 col-3">
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Favorite" id={`default-${props.film.id}`} checked={props.film.favorite} onClick={(event) => { props.setFavorite(props.film.id) }} />
                        </Form.Group>
                    </span>
                    <small className="watch-date col-md-3 col-3">
                        {(props.film.date == undefined) ? "No date" : props.film.date.format('MMMM DD, YYYY')}
                    </small>
                    <span className="rating text-end col-md-3 col-3">

                    { (props.film.rating != undefined)?Array(5).fill().map((element,index)=>{console.log("uaooo:",index);if (index >=props.film.rating) {return <i class="bi bi-star" onClick={(event) => { props.setRating(props.film.id, index+1) }}></i> }else {return <i class="bi bi-star-fill" onClick={(event) => { props.setRating(props.film.id, index+1) }}></i>}}):"No rate" }
                    </span>
                </div>
            </li>
        </>
    );
}

export { FilmList };