const { Component } = require("react");

class NewTest extends Component{
    state={
        fieldOfStudy: "dunnyField"
    }

    render(){
        return(
            <div>
            <h1 className="heading_1">New Test</h1>
            <div className="newTestContainer">
                <label className="heading_2">General Test Details</label> 
            </div>
            </div>
        )
    }
}
export default NewTest;