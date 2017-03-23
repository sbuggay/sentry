import * as React from "react";
import { connect } from "react-redux";

class App extends React.Component {
	render() {
		return <h1>{this.props.title}</h1>;
	}
}

const mapStateToProps = (state) => {
	return {
		title: state.title
	}
}

export default connect(mapStateToProps)(App);