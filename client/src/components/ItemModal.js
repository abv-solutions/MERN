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
  Input,
  Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

// Map state from root reducer to the props
const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    msg: null
  };

  // Add prop types - for validation
  static propTypes = {
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  }

  // Copy timeout error inside the local state
  componentDidUpdate(prevProps) {
    const error = this.props.error;
    if (error !== prevProps.error) {
      // Check for timeout error
      if (error.id === 'LOGIN_TIMEOUT') {
        this.setState({msg: error.msg.msg});
      } else {
        this.setState({msg: null});
      }
    }
  }

  toggle = () => {
    this.setState({
      name: '',
      modal: !this.state.modal
    });
  };

  // Call function for input typing
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  // Call function for adding item
  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    }
    // Add item via addItem action
    this.props.addItem(newItem);
    // Close Modal
    this.toggle();
  };

  // Create Modal with add option
  render() {
    return(
      <div>
        {this.state.msg ? (
          <Alert color='danger'>{this.state.msg}</Alert>
        ) : null}
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{marginBottom: '1rem', marginLeft: '1rem'}}
            onClick={this.toggle}
            >Add Item
          </Button>
        ) : (
          <h4 className='mb-4  ml-4'>
            Please log in to manage items
          </h4>
        )}
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

// Export rendered component to the front-end
export default connect(
  mapStateToProps,
  {addItem}
)(ItemModal);
