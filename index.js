import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";

class HelloMessage extends React.Component {
    render() {
        return <div>Hello {this.props.name}</div>;
    }
}
class Index extends React.Component{
    render(){
        return <div>index page</div>
    }
}

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" component={Index}/>
            <Route path="/hello" component={HelloMessage}/>
        </div>
    </BrowserRouter>,
    document.getElementById('app')
)
