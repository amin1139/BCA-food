import react from "react"

class User extends react.Component {
    constructor(props){
        super(props)
        console.log(props.name + 'constructor');
    }
    componentDidMount(){
        console.log(this.props.name + 'component did mounts');
        
    }
    componentWillUnmount(){
        console.log(this.props.name + 'component did unmounts');
        
    }
    render(){
        const {name} = this.props;

        console.log(name + 'render');
        return(
            <>
                <h1>NAME : {name}</h1>
                <h2>CONTACT : 9336XXXXX</h2>
            </>
        )
    }
}
export default User