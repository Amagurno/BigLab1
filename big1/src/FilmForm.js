import { Button, Alert, Form } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

function FilmForm(props) {
    const { filmId } = useParams();
    const filmToEdit = props.films.find(f => f.id == filmId);
    //dopo le precedenti due istruzioni io dentro filmToEdit ho il film da editare se ho premuto la matita, mentre ho undefined se ho premuto il +

    const [name, setName] = useState(filmToEdit ? filmToEdit.name : '');
    const [favorite, setFavorite] = useState(filmToEdit ? filmToEdit.favorite : false);
    const [date, setDate] = useState((filmToEdit && filmToEdit.date != undefined) ? filmToEdit.date : dayjs());
    const [rating, setRating] = useState((filmToEdit && filmToEdit.rating != undefined) ? filmToEdit.rating : 0);

    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (name.trim().length === 0) {
            setErrorMsg('Il nome del film deve contenere dei caratteri che non siano solo spazi');
            return;
        }

        if (date.isAfter(dayjs())) {
            setErrorMsg('La data non può essere futura');
            return;
        }

        //sia nel caso di add che di edit faccio le seguenti cose
        const newFilm = { id: (!filmToEdit) ? props.films.length + 1 : filmToEdit.id, name: name.trim(), favorite: favorite, date: date, rating: rating }
        props.addOrEditFilm(newFilm);
        navigate('/');
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {filmToEdit ? <h1>Edit film: {filmToEdit.name}</h1> : <h1>Add new film</h1>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {errorMsg ? <Alert variant='danger' onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert> : false}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control required={true} minLength={0} value={name} onChange={ev => setName(ev.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check type="checkbox" label="Favorite" defaultChecked={favorite} onClick={(event) => { setFavorite(oldState => !oldState) }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <Form.Control type='date' value={date.format('YYYY-MM-DD')} onChange={ev => setDate(dayjs(ev.target.value))} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control type='number' min={0} max={5} value={rating} onChange={ev => setRating(ev.target.value)} />
                            </Form.Group>
                            <Button type='submit' >Save</Button>
                            <Button onClick={() => navigate('/')} variant='secondary' >Cancel</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FilmForm;