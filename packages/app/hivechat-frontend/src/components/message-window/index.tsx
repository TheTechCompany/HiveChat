import React, { useState } from "react";

import { Box, Typography, Paper, List } from '@mui/material'
import { MessageInput } from "../message-input";
import { MessageItem } from "../message-item";

export interface IMessage {
    message?: string;
    sender?: {id: string, name: string};
    sentAt?: Date;
}

export interface MessageWindowProps {
    messages?: IMessage[];
    onSendMessage?: (message: string) => Promise<void>;
}

export const MessageWindow : React.FC<MessageWindowProps> = (props) => {

    const [ newMessage, setNewMessage ] = useState('');

    const [ isSending, setIsSending ] = useState(false);

    const sendMessage = async () => {
        console.debug('sendMessage', newMessage);
        setIsSending(true)
        await props.onSendMessage?.(newMessage);
        setIsSending(false)
        setNewMessage('');
    }

    return (
        <Box sx={{flexDirection: 'column', display: 'flex', flex: 1}}>
            <Paper sx={{padding: '6px'}}>
                <Typography fontWeight="bold" fontSize={"medium"}>Title</Typography>
            </Paper>
            <Box sx={{
                flex: 1, 
                bgcolor: 'primary.dark', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-end',
                paddingLeft: '6px',
                paddingRight: '6px',
            }}>
                <List>
                    {props.messages?.map((message) => (
                        <MessageItem {...message} />
                    ))}
                </List>
            </Box>
            <MessageInput 
                value={newMessage}
                onChange={(e) => setNewMessage(e)}
                sending={isSending}
                onSend={sendMessage}
                />
        </Box>
    )
}