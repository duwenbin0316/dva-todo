import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

let id = 0;

class AddTodo extends React.Component {

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { todo } = values;
                const res = {
                    id,
                    text: todo,
                    completed: false
                };
                this.props.onOk(res);
                id++;

                // reset form
                this.props.form.resetFields();
            }
        });
    }

    render() {
        const {getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem>
                        {getFieldDecorator('todo', {
                            validateTrigger: ['onChange', 'onBlur', 'onSubmit'],
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your todo item!'
                                }
                            ]
                        })(
                            <Input
                                prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                type="text"
                                placeholder="todo"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" >
                            Add Todo
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddTodo);
