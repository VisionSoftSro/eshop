import * as React from "react";

export class DeleteThis extends React.Component {


    // @ts-ignore
    state = {value:null};

    async componentDidMount() {
        const result = await fetch("/cmr-api/test");
        console.log(result);
    }

    render() {
        return "delete this";
    }

}