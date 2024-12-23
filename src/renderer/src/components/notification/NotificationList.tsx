import React from 'react'
import { Box, Paper, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useNotification } from './NotificationContext'

const NotificationList: React.FC = () => {
  const { notifications, removeNotification } = useNotification()

  const getBackgroundColor = (type?: 'success' | 'error' | 'info'): string => {
    switch (type) {
      case 'success':
        return '#57D95B'
      case 'error':
        return '#D96257'
      default:
        return '#007bff'
    }
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 2
      }}
    >
      {notifications.map((notif) => (
        <Paper
          key={notif.id}
          sx={{
            p: 2,
            backgroundColor: getBackgroundColor(notif.type),
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: 300,
            maxWidth: 400
          }}
        >
          <Typography>{notif.message}</Typography>
          <IconButton onClick={() => removeNotification(notif.id)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Paper>
      ))}
    </Box>
  )
}

export default NotificationList
