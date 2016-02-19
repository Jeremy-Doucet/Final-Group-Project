'use strict';

let should = require('should');
let mongoose = require('mongoose');
let request = require('supertest');

let app = require('../../server');
let Beer = mongoose.model('Beer');

////////////////////////
///GET: by location
////////////////////////
