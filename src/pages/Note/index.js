import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Note({ note }) {
  return (
    <Box component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
      <Card sx={{ minWidth: 275, marginBottom: '16px', borderRadius: '0', }}>
          <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
          {note.category}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {note.name}
        </Typography>
        
        <Typography variant="body1">
          {note.content}
        </Typography>
      </CardContent>
      </Card>
    </Box>
  );
}