import React, { useEffect, useState } from "react";
import { Card, Button, Form, Icon, Container, Divider, Input } from 'semantic-ui-react';
    const Chat = ({socket,username,room}) => {
            const [currentMessage,setCurrentMessage] = useState("")
            const [messageList,setMessageList] = useState([]);
            const sendMessage = async () => {
                if (username && currentMessage) {
                    const info = {
                        message : currentMessage,
                        room,
                        author:username,
                        time:new Date(Date.now()).getHours()+":"
                        + new Date (Date.now()).getMinutes(),
                    };

                    await socket.emit("send_message",info)
                }
            }

            useEffect(()=> {
                const messageHandle = (data)=> {
                    setMessageList((list) => [...list, data]);
                }
                socket.on("receive_message",messageHandle);
                return () => socket.off("receive_message",messageHandle);
            },[socket]);
        
        return (
            <Container >
                <Card fluid>
                    <Card.Content header={ `Chat en vivo | Sala ${room}`}/>
                    <Card.Content style ={{minHeight:"300px"}}>
                        {
                            messageList.map((item)=>{
                                return <h3>{item.message}</h3>
                            })
                        }
                    </Card.Content>
                    <Card.Content extra>
                        <Form>
                            <Form.Field>
                                <Input 
                                    action={{
                                        color: 'teal',
                                        labelPosition: 'right',
                                        icon: 'send',
                                        content: 'Enviar',
                                        onClick: sendMessage
                                    }}
                                    type="text"  
                                    placeholder="mensaje ..." 
                                    onChange={e => setCurrentMessage(e.target.value)}
                                />
                            </Form.Field>
                        </Form>
                    </Card.Content>
                </Card>
                <section className="chat-messages">
                    
                </section>
                <section className="chat-footer">
                    
                    
                </section>
            </Container>
        )
    }

export default Chat