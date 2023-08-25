import { extend } from "lodash";
import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError : false};
    }
    static getDerivedStateFromError(error) {
        return {hasError: true};
    }
    componentDidCatch(error, errorInfo) {

    }
    render() {
        console.log(this.state)
        if(this.state.hasError) {
            return <h1>someting when wrong</h1>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;