import {Container, Navbar, Form, FormControl} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function MyNavBar(props) {
    return(
        <Container fluid>
        <Navbar fixed bg="primary" className="d-flex justify-content-between">
          <Navbar.Brand href="#home"><i class="bi bi-collection-play icon-white"></i><span className='text-white'> Film Library</span></Navbar.Brand>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
          <h2><i class="bi bi-person-circle icon-white"></i></h2>
        </Navbar>
      </Container>
    );
}

export {MyNavBar};