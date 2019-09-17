import * as React from 'react';


interface PaymentResultProps {
    success:boolean
}
class PaymentResultState {
    data:any = null;
}
export class PaymentResult extends React.Component<PaymentResultProps> {

    state = new PaymentResultState();

    componentDidMount() {

    }

    render() {
        return this.props.success && "success" || "failed";
    }
}