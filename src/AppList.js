import React,{Component, Fragment} from 'react'
import AppListItem from './AppListItem'
import style from './style.css'
import axios from 'axios'
import { TransitionGroup, CSSTransition } from 'react-transition-group'


class AppList extends Component{
    constructor(props){
        super(props);
        this.state={
            inputValue:'',
            listData:[],
            isShow:true
        }
        console.log('constructor--get start-'+this.ul)
        this.toggle=this.toggle.bind(this)
    }

    componentWillMount(){
        console.log('ComponentWillMount---start-'+this.ul)
        setTimeout(()=>{
            console.log('time--componentWillMount---1-'+this.ul)

        },1000)
    }

    componentDidMount(){
        console.log('ComponentDidMount---start-'+this.ul)
        //get list data from easy mock
            this.asyncGetData()
    }

    shouldComponentUpdate(){
        console.log('1-shouldComponentUpdate --start--' +this.ul)
        return true
    }
    componentWillUpdate(){
        console.log('2-componentWillUpdate--start--'+ this.ul)
    }

    componentDidUpdate(){
        console.log('4-componentDidUpdate--start--'+this.ul)
    }

    render(){
        console.log('3-render---start-'+this.ul)

        return(
            <Fragment>
                <div className="addMore">
                    <input 
                        value={this.state.inputValue} 
                        onChange={this.inputChange.bind(this)}
                        ref={input=>this.input=input}
                        / >
                    <button onClick={this.addItem.bind(this)}>Add</button></div>
                <ul ref={ul=>this.ul=ul}>
                <TransitionGroup>
                    {
                        this.state.listData.map((item,indx)=>{
                            return (
                                <CSSTransition
                                    timeout={2000}
                                    classNames="box-text"
                                    unmountOnExit
                                    appear={true}
                                    key={indx+item}
                                >
                                    <AppListItem 
                                        key={item+indx} 
                                        index={indx} 
                                        content={item} 
                                        handleDel={this.delete.bind(this)}/>
                                </CSSTransition>
                                
                            )
                        })
                    }
                </TransitionGroup>
                    
                </ul>
                <CSSTransition
                    in={this.state.isShow}
                    timeout={2000}
                    classNames="box-text"
                    unmountOnExit
                >
                    {/* <div className={this.state.isShow?'show':'hide'}>click button to show css Transition</div> */}
                    <div>click button to show css Transition</div>
                </CSSTransition>
                 
                <button onClick={this.toggle}>Click Me</button>
            </Fragment>
        )
    }

    toggle(){
        this.setState({
            isShow:this.state.isShow?false:true
        })
    }

    asyncGetData(){
        axios.get("https://easy-mock.com/mock/5f16c3f094896b22a7fa795c/ReactDemo01/getList")
        .then((res)=>{
            console.log(res)
            let resData=res.data.data 
            resData=this.state.listData.concat(resData)
            this.setState({
                listData:resData
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    inputChange(e){
        //this.setState({inputValue:e.target.value})
        this.setState({inputValue:this.input.value})
    }
    addItem(){
       // this.setState({listData:this.state.listData.concat(this.state.inputValue)})
       if(this.state.inputValue.toString()){
        this.setState({
            listData:[...this.state.listData,this.state.inputValue.trim()],
            inputValue:''
            
        },()=>{
            console.log(this.ul.querySelectorAll('li').length)
        })
       }
    }

    delete(index){
        var newData=this.state.listData
        newData.splice(index,1)
        this.setState({
            listData:newData
        },()=>{
            console.log(this.ul.querySelectorAll('li').length)
        })
    }
}

export default AppList