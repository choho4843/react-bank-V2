import { Component } from "react";
import { Form, Label, Input, Button, Col, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';

class MakeAccount extends Component {
    constructor(props) {
        super(props);
        this.divstyle = {
            width: '600px', height: '350px', textAlign: 'left',
            margin: '100px auto', border: '2px solid gray',
            padding: '40px', borderRadius: '20px'
        }
        this.state = {
            acc: {
                id: '',
                name: '',
                password: '',
                grade: '',
            },
            special: false,
            modal: false,
            msg_header: '',
            msg_body: ''
        }

    }
    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ acc: { ...this.state.acc, [name]: value } })
    }
    changeSpecial = (e) => {
        this.setState({ special: e.target.checked });
        if (!e.target.checked) {
            this.setState({ acc: { ...this.acc, grade: '' } });
        }
    }
    toggle = (e) => {
        this.setState({ modal: !this.state.modal });
    }
    checkid = (e) => {
        axios.post('http://localhost:8080/doubleid', null,
            { params: { id: this.state.acc.id} }
        ).then((response) => {
            let msg = '';
            if (response.data === true)
                msg = "사용중인 계좌번호입니다.";
            else
                msg = "사용가능한 계좌번호입니다.";
            this.setState({ msg_header: "계좌중복확인", msg_body: msg });
            this.toggle();
        }).catch((error) => {
            this.setState({ msg_header: '오류', msg_body: '계좌 개설에 실패했습니다.' })
            this.toggle();
        })
    }
    submit = (e) => {
        console.log(JSON.stringify(this.state.acc));
        axios.post('http://localhost:8080/makeaccount', null,
            { params: this.state.acc }
        ).then((response) => {
            this.setState({ msg_header: "계좌개설", msg_body: '계좌가 개설되었습니다.' });
            this.toggle();
        }
        ).catch((error) => {
            this.setState({ msg_header: '오류', msg_body: '계좌개설에 실패했습니다.' })
            this.toggle();
        })
    }
    render() {
        return (
            <>
                <div style={this.divstyle}>
                    <Form>
                        <FormGroup row>
                            <Label for="id" sm={4}>계 좌 &nbsp; 번호</Label>
                            <Col sm={6}>
                                <Input type="text" name="id" id='id' value={this.state.acc.id} onChange={this.change} />
                            </Col>
                            <Col>
                                <Button sm={2} color='primary' style={{ width: '100%' }} onClick={this.checkid}>중복</Button>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="id" sm={4}>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름 </Label>
                            <Col sm={8}>
                                <Input type="text" name="name" id='name' value={this.state.acc.name} onChange={this.change} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='password' sm={4}>비밀&nbsp; 번 호</Label>
                            <Col >
                                <Input type="password" name="password" id='password' value={this.state.acc.password} onChange={this.change} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label check sm={4}>
                                <Input type="checkbox" checked={this.state.special} onChange={this.changeSpecial} />특수계좌
                            </Label>
                            <Col sm={8}>
                                <Input type='select' name="grade" id='grade'
                                    style={{ color: "gray" }} disabled={!this.state.special} onChange={this.change}>
                                    <opiton>---</opiton>
                                    <option>VIP</option>
                                    <option>Gold</option>
                                    <option>Silver</option>
                                    <option>Normal</option>
                                </Input>
                            </Col>

                        </FormGroup>
                        <FormGroup>
                            <Col sm={12} >
                                <Button style={{ width: '100%' }} color='primary'
                                    onClick={this.submit}>계좌개설</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <Modal isOpen={this.state.modal} fade={true} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>{this.state.msg_header}</ModalHeader>
                        <ModalBody>
                            {this.state.msg_body}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>닫기</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        );
    }
}

export default MakeAccount;