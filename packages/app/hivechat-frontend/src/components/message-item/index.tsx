import React from "react";
import { IMessage } from "../message-window";
import { Box, Typography } from '@mui/material'
import moment from 'moment';

export const MessageItem : React.FC<IMessage> = (props) => {
    return (
        <Box sx={{display: 'flex', padding: '6px', borderRadius: '6px', marginBottom: '8px', bgcolor: 'secondary.main'}}>
            <Box sx={{
                backgroundImage: `url('https://adorableavatars.com/avatars/200/${props.sender.id}.png')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                marginRight: '6px'
            }}>
                
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography>
                        {props.sender.name}
                    </Typography>
                    <Typography sx={{marginLeft: '6px'}} fontSize="small">
                        {moment(props.sentAt).format('hh:mma')}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex'}}>
                    {props.message}
                </Box>
            </Box>
        </Box>
    )
}