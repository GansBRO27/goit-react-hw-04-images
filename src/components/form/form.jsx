import PropTypes from 'prop-types';
import { Component } from 'react';
import Input from '../input/input';
import Button from 'components/button/button';
export default class Form extends Component {
  state = {
    search: '',
  };
  handleChange = e => {
    console.log(e.currentTarget.value);
    this.setState({ search: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search !== '') this.props.onSubmit(this.state.search);
  };
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <Button />

        <Input onChange={this.handleChange} value={this.state.search} />
      </form>
    );
  }
}
Form.propTypes = {
  onSubmit: PropTypes.func,
};
