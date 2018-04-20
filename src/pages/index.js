import React from 'react';
import { connect } from 'dva';
import { Form, Input, Icon, Button } from "antd";
import styles from './index.css';
const FormItem = Form.Item;

class IndexPage extends React.Component {

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'Todo/login'
        })
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.normal}>
        <div className={styles.login}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem>
              <div>
                TodoApp
              </div>
            </FormItem>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className={styles.loginButton} loading={loading}>
                Login
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      loading: state.loading.models.Todo,
  }
}

export default connect(mapStateToProps)(Form.create()(IndexPage));
