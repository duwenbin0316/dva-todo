import React from 'react';
import { connect } from 'dva';
import { Divider } from 'antd';

class Filter extends React.Component {
    renderLink(name, type) {
        const { Todo: { filter } } = this.props;
        if(type === filter){
            return name;
        }

        return (
            <a onClick={ () => { 
                this.props.dispatch({
                    type: 'Todo/filter',
                    payload: type
                }) } 
                }>
                {name}
            </a>
        )
    }

    render() {
        return (
            <div>
                SHOW:
                {' '}
                { this.renderLink('SHOW_ALL', 'ALL') }
                <Divider type='vertical'/>
                { this.renderLink('SHOW_ACTIVE', 'ACTIVE') }
                <Divider type='vertical'/>
                { this.renderLink('SHOW_COMPLETED', 'COMPLETED') }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Filter);
