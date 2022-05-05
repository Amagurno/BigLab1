import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from "react-bootstrap";
import './custom.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function MySidebar(props) {
    const navigate = useNavigate();
    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light below-nav row vheight-100">
                <Nav.Item>
                    <Nav.Link className={(props.selected == 'All') ? 'bg-primary text-white' : ''} onClick={() => { navigate('/all'); }}>All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={(props.selected == 'Favorites') ? 'bg-primary text-white' : ''} onClick={() => { navigate('/favorites'); }}>Favorites</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={(props.selected == 'Best rated') ? 'bg-primary text-white' : ''} onClick={() => { navigate('/bestRated'); }}>Best rated</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={(props.selected == 'Seen Last Month') ? 'bg-primary text-white' : ''} onClick={() => { navigate('/seenLastMonth'); }}>Seen Last Month</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className={(props.selected == 'Unseen') ? 'bg-primary text-white' : ''} onClick={() => { navigate('/unseen'); }}>Unseen</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}

export { MySidebar };