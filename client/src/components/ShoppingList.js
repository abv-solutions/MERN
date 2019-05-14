// Generate ShoppingList with delete option

import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  // Call getItems action - lifecycle method
  componentDidMount() {
    this.props.getItems();
  }
  // Call function for deleting item
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
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                    >&times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}
// Add prop types - for validation
ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}
// Map state from itemReducer.js to the props
const mapStateToProps = (state) => ({
  item: state.item
});
// Export rendered component to the front-end
export default connect(
  mapStateToProps,
  {getItems, deleteItem}
)(ShoppingList);
