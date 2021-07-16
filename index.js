class Board extends React.component {
    renderSquare(i){
        return <Square value = {i} />
    }
}

class Square extends React.component {
    render() {
        return (
            <button className = "square">
            bxgxfgxdfgxghxfghxfg
            {this.props.value}
            </button>
        )
    }
}