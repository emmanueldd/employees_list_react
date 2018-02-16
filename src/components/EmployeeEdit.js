import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  state = { showModal: false };

  constructor(props) {
    super(props)
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

  componentWillMount() {
    // this props employee, contient tout l'employée passé en parametre depuis listitem
    _.each(this.props.employee, (value, prop) => {
      // On prend chacune de ces valeurs, et on les affecte en state (payload) que employeeform recupere sous forme de props grace à mapStateToProps
      this.props.employeeUpdate({ prop, value });
    });
  }

  onAccept() {
    this.props.employeeDelete(this.props.employee.id);
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, id: this.props.employee.id });
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.setState({ showModal: true })}>
            Fire employee
          </Button>
        </CardSection>
        <Confirm visible={this.state.showModal} onAccept={this.onAccept} onDecline={this.onDecline}>
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  // les state viennent de employeeformreducer, employeeUpdate
  console.log('state ==>', state)
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
}

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
