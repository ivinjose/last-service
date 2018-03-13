import * as React from "react";

interface HelloProps {
    compiler: string;
    framework: string;
}

// const Test = (props: HelloProps) => (
//     <h1>
//         Hello from {props.compiler} and {props.framework}!
//     </h1>
// );

class Test extends React.Component<HelloProps, {}> {
    // private _x: number;
    // set x(value) {
    //     this._x = value;
    // }
    render() {
        return (
            <h1>
                Hello from {this.props.compiler} and {this.props.framework}!
            </h1>
        );
    }
}

let T = new Test();

// T.x = "10";

export default Test;
