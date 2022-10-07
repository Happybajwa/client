import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Agent from "../../App/Api/Agent";

export default function AboutPage(){
    const [validationErrors, setValidationError] = useState<string[]>([]);

    function getValidationError(){
        Agent.TestErrors.getValidationError()
        .then(() => console.log('should not see this'))
        .catch(error => setValidationError(error));
    }
      
    return(
        <Container>
            <Typography gutterBottom variant='h2'>Errors for testing purpose </Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => Agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400</Button>
                <Button variant="contained" onClick={() => Agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401</Button>
                <Button variant="contained" onClick={() => Agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404</Button>
                <Button variant="contained" onClick={() => Agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500</Button>
                <Button variant="contained" onClick={getValidationError}>Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 && 
                <Alert severity="error">
                    <AlertTitle>Validation Error</AlertTitle>
                    <List>
                        {validationErrors.map(error =>(
                            <ListItem key={error}>
                                <ListItemText>
                                    {error}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    )
}