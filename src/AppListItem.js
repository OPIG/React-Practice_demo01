import React, { Component } from 'react';
import PropTypes from 'prop-types'

class AppListItem  extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    //组件第一次存在于dom中，函数是不会被执行
    //如果已经存在于Dom中，函数才会被执行
    componentWillReceiveProps(){
        console.log('child--componentWillReceiveProps')
    }

    componentWillUnmount(){
        console.log('child-componentWillUnmount')
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.content!=this.props.content){
            return true
        }else{
            return false
        }
    }

    render() { 
        return (
            <li>
                {this.props.content}
                <button onClick={this.handleClick}>Del</button>
            </li>
          );
    }
    handleClick(){
        this.props.handleDel(this.props.index)
    }
}
AppListItem.propTypes={
    content: PropTypes.string,
    index:PropTypes.number,
    handleDel:PropTypes.func
}

export default AppListItem ;