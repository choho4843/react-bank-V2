import { Component } from "react";
import { Form, Label, Input, Button, Col, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import axios from 'axios';

class AllAccount extends Component {
    constructor(props) {
        super(props);
        this.divstyle = {
            width: '600px', height: '250px', textAlign: 'left',
            margin: '100px auto',
            padding: '40px'
        }
        this.state = {
            accs: [],
        };
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    componentDidMount() {
        axios.get('http://localhost:8080/all')
            .then((response) => {
                this.setState({ accs: response.data })
            });
    }

    render() {
        return (
            <>
                <div style={this.divstyle}>
                    <Table>
                        <tbody>
                            <tr>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>잔액</th>
                                <th>등급</th>
                            </tr>
                            {this.state.accs.map((acc) => (
                                <tr key={acc.id}>
                                    <td>{acc.id}</td>
                                    <td>{acc.name}</td>
                                    <td>{acc.balance}</td>
                                    <td>{acc.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </>
        );
    }
}
export default AllAccount;