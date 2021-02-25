import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';
import './app.css';


export default class App extends Component {
  gotService = new gotService();

  constructor() {
    super();
    this.onToggleShowRandom = this.onToggleShowRandom.bind(this);
  }
  state = {
    toggleShowRandom: true,
    error: false
  }

  componentDidCatch() {
    console.log('error');
    this.setState({
      error: true
    })
  }

  onToggleShowRandom() {
    let newState = this.state;
    newState.toggleShowRandom = !this.state.toggleShowRandom;
    this.setState(newState);
  }

  render () {
    const RandomCharSec = this.state.toggleShowRandom ? <RandomChar/> : null

    if (this.state.error) {
      return <ErrorMessage/>
    }

    return (
      <> 
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{size: 5, offset: 0}}>
              {RandomCharSec}
              <Button 
                className='toggle-btn'
                color='dark' 
                size='sm' 
                block 
                onClick={this.onToggleShowRandom}>Toggle random character section
                </Button>
            </Col>
          </Row>
          <CharacterPage/>
          <Row>
            <Col md='6'>
              <ItemList 
                onCharSelected={this.onCharSelected}
                getData={this.gotService.getAllBooks}
                renderItem ={(item) => item.name}
              />
            </Col>
            <Col md='6'>
              <CharDetails charId={this.state.selectedChar}/>
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <ItemList 
                onCharSelected={this.onCharSelected}
                getData={this.gotService.getAllHouses}
                renderItem ={(item) => item.name}
              />
            </Col>
            <Col md='6'>
              <CharDetails charId={this.state.selectedChar}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};