import React from 'react';
import { useState } from "react";
import {
  Button
} from "reactstrap";
import Alert from 'react-bootstrap/Alert'

const Notification = (props) => {
        return (
            <>
              <Alert variant="success" >   
                <Alert.Heading><center>Logged in successfully!</center></Alert.Heading>
                <p><h1 className='text-white'><center>Welcome to admin page</center></h1></p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button  variant="outline-success">
                  <a href="/admin/index">Next</a>
                  </Button>
                </div>
              </Alert>
        
            </>
          );
        }
        
        export default Notification;
