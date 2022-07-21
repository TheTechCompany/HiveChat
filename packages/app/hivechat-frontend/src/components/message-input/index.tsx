import React from "react";
import { Paper, TextField, CircularProgress, IconButton } from '@mui/material'
import { Send } from '@mui/icons-material'

export interface MessageInputProps {
    value?: string;
    onChange?: (value: string) => void;
    sending?: boolean;
    onSend?: () => void;
}

export const MessageInput : React.FC<MessageInputProps> = (props) => {
    
    return (
        <Paper sx={{display: 'flex', padding: '6px'}}>
            <TextField 
                fullWidth
                value={props.value || ''}
                onChange={(e) => props.onChange?.(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key == "Enter") {
                        props.onSend?.();
                    }
                }}
                label="Message" 
                size="small" />
            <IconButton disabled={props.sending} onClick={props.onSend}>
                {props.sending ? <CircularProgress size="20px" /> : <Send />}
            </IconButton>
        </Paper>
    )
}