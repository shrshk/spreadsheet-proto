import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '../src/Link';
import Button from '@mui/material/Button';
import LaunchIcon from '@mui/icons-material/Launch';
import Typography from '@mui/material/Typography';


export default function Index() {
  return (
      <Container maxWidth="lg">
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justifyContent="center"
                fontFamily="DejaVu Sans Mono, monospace"
            >
                <Grid item xs={4}>
                    <Button variant="text" style={{ color: '#000'}} component={Link} noLinkStyle href="/spreadsheet">
                        <LaunchIcon style={{ minWidth: '40px', paddingBottom: '5px'}}/>
                        <Typography variant="button" display="block" gutterBottom>
                            SpreadSheet
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
  );
}