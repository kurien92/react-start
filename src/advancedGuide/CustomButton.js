import React from 'react';

// export default class CustomButton extends React.createElement {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         const style = {
//             color: this.props.color
//         };

//         return <button style={style}>{this.props.children}</button>
//     }
// }

export default function CustomButton(props) {
    const style = {
        color: props.color
    };

    return <button style={style}>{props.children}</button>
}