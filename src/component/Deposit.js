import { Component } from "react";
import axios from "axios";
import { Form, Label, Input, Button, Col, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Deposit extends Component{
    constructor(props) {
        super(props);
        this.divstyle = {
            width: '450px', height: '250px', textAlign: 'left',
            margin: '100px auto', border: '2px solid gray',
            padding: '40px', borderRadius: '20px'
        }
        this.state = {
            acc: {id:'', money:''},
            modal : false,
            msg_header :'',
            msg_body:''      
          };
        
        }
        toggle = () => {
            this.setState({ modal: !this.state.modal });
        }
        submit = (e) => {
            console.log("acc:"+JSON.stringify(this.state.acc));
            axios.post('http://localhost:8080/deposit', null,
              {
                params: this.state.acc
              }
            )
            .then((response) => {
              console.log(response);
              this.setState({msg_header:"입금", msg_body:`잔 액 : ${response.data}원`});
              this.toggle();
            })
            .catch((error) => {
              this.setState({msg_header:"오류", msg_body:"입금을 실패했습니다."});
              this.toggle();
            });    
          }
        change =(e) => {
            const name = e.target.name;
            const value = e.target.value;
            this.setState({acc:{...this.state.acc,[name]:value}})
        }
    
    render(){
        return(
            <>
             <div style={this.divstyle}>
                    <Form>
                        <FormGroup row>
                            <Label for="id" sm={4}>계 좌 &nbsp; 번호</Label>
                            <Col sm={8}>
                                <Input type="text" name="id" id='id' value={this.state.acc.id}  onChange={this.change}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="money" sm={4}>입 &nbsp; 금 &nbsp; 액 </Label>
                            <Col sm={8}>
                                <Input type="balance" name="money" id='money' value={this.state.acc.money} onChange={this.change} />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col sm={12} >
                                <Button style={{ width: '100%' }} color='primary'
                                    onClick={this.submit}>입금</Button>
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
        )
    }
}
export default Deposit;