import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import SzemelyekPage from './pages/SzemelyekPage';
import SzemelyAdatokPage from './pages/SzemelyAdatok';
import PostSzemelyPage from './pages/PostSzemelyPage';
import PostPenztargepekPage from './pages/PostPenztargepek';
import FelulvizsgalatokPage from './pages/Felulvizsgalatok';


import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/Szemelyek' component={SzemelyekPage} />                
                <Route path='/Adatbazis' component={SzemelyAdatokPage} />
                <Route path='/PostSzemely' component={PostSzemelyPage} />
                <Route path='/PostPenztargep' component={PostPenztargepekPage} />
                <Route path='/Felulvizsgalatok' component={FelulvizsgalatokPage} />
            </Layout>
        );
    }
}
