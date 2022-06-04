import React from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {App} from "./App";
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// Axios defaults
axios.defaults.baseURL = "api.themoviedb.org/3"
axios.defaults.params = {
  api_key: "3390a8a14e621ee87b8e65a286d5c250",
  include_adult: false
}

ReactDom.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
)