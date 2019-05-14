// Generate Modal with add option

import React, {Component} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  // Call function for deleting item
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  // Call function for input typing
  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    }
    // Add item via addItem action
    this.props.addItem(newItem);
    // Close Modal
    this.toggle();
  }
  // Create Modal with add option
  render() {
    return(
      <div>
        <Button
          color='dark'
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
          >Add Item
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add To Shopping List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button
                  color='dark'
                  style={{marginTop: '2rem'}}
                  block
                  >Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
// Add prop types - for validation
ItemModal.propTypes = {
  AddItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}
// Map state from itemReducer.js to the props
const mapStateToProps = (state) => ({
  item: state.item
});
// Export rendered component to the front-end
export default connect(
  mapStateToProps,
  {addItem}
)(ItemModal);
