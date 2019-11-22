// Generate ShoppingList with delete option

import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

// Map state from root reducer to the props
const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

class ShoppingList extends Component {
  // Add prop types - for validation
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  // Call action for getting items - lifecycle method
  componentDidMount() {
    // Puts item list in props.item
    this.props.getItems();
  }

  // Call action for deleting item
  onDeleteClick = id => {
    this.props.deleteItem(id);
  }

  // Create item list with delete option
  render() {
    // Access item list from the props
    const {items} = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({_id, name}) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                      >&times;
                    </Button>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        <br/><br/><br/><br/><br/>
      </Container>
    )
  }
}

// Export rendered component to the front-end
export default connect(
  mapStateToProps,
  {getItems, deleteItem}
)(ShoppingList);
