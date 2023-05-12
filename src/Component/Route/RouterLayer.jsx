import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ListDataContextProvider from '../Context/listingConext';
import { Routes, Route } from 'react-router-dom';
import EditProfile from '../Pages';
import MasterLayout from '../MasterLayout/MasterLayout';

import App from "../../App"
const history = createBrowserHistory();

const RouterLayer = props => {
    return (
        <><Router history={history}>
      
          <ListDataContextProvider>
            <MasterLayout>
            <Routes>
          <Route exact path='/' element={   <App history={history}/>} />
          <Route  path='/editprofile/:id' element={   <EditProfile history={history}/>} />
          </Routes>
          </MasterLayout>
          </ListDataContextProvider>
      
      </Router></>

    );
  };
  
  export default RouterLayer;

