import React, { useState } from "react";
import { Box, List, ListItem, Paper } from '@mui/material'
import { MessageWindow } from "./components/message-window";
import { useQuery, gql, useMutation, useApolloClient } from '@apollo/client'

export default () => {

    const [ channel, setChannel ] = useState('');

    const client = useApolloClient();

    const { data } = useQuery(gql`
        query GetUsers {
            users {
                id
                name
            }

        }
    `)

    const { data : messageData } = useQuery(gql`
        query GetMessages ($channel: String) {

            messages(channel: $channel){
                id
                sentAt
                sender {
                    id
                    name
                }
                message
            }
        }
    `, {
        variables: {
            channel
        }
    })

    const users = data?.users || [];

    const messages = messageData?.messages || [];

    const [ sendMessage ] = useMutation(gql`
        mutation SendMessage($channel: String!, $message: String!) {
            sendMessage(channel: $channel, message: $message) {
                id
            }
        }
    `)

    const refetch = () => {
        client.refetchQueries({include: ['GetMessages']})
    }

    // const [ messages, setMessages ] = useState<any[]>([
    //     {message: "Testing", sender: '102'},
    //     {message: "Testing 2", sender: '101', sentAt: new Date()},
    // ]);

    return (
        <Box sx={{display: 'flex', flex: 1, height: '100%'}}>
            <Paper sx={{minWidth: '10vw'}}>
                <List>
                    {users.map((user) => (
                        <ListItem 
                            onClick={() => setChannel(user.id)}
                            button 
                            sx={{display: 'flex', alignItems: 'center'}}>
                           <Box sx={{
                                backgroundImage: `url('https://adorableavatars.com/avatars/30/${user.id}.png')`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                width: '30px',
                                height: '30px',
                                borderRadius: '6px',
                                marginRight: '6px'
                            }}>
                                
                            </Box>
                            {user.name}
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box sx={{flex: 1, display: 'flex'}}>
                <MessageWindow
                    messages={messages}
                    onSendMessage={async (message) => {
                        sendMessage({variables: {channel, message}}).then(() => {
                            refetch()
                        });
                        // setMessages([...messages, {message, sender: '102'}])
                    }}
                    />
            </Box>
        </Box>
    )
}