/*
const express = require('express');

require('dotenv').config();

const app = express();
import bodyParser from 'body-parser';

const apiCals = require('./routes/apiCals');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', 'src/views');


app.get('/view', (req: Request, res: any) => {
//  console.log(app.get('views'));
  
  res.render('index');
})

app.use('/call', apiCals);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

*/
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import axios from 'axios';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../conversion.proto');

// Carregar definições do Proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Converte a definição do pacote em um objeto utilizável pelo gRPC
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as unknown as {
  ConversionService: grpc.ServiceDefinition<any>;
};

// Acessar o serviço específico
const ConversionService = grpcObject.ConversionService;

// Criação do servidor gRPC
const server = new grpc.Server();

// Implementação dos métodos do serviço
server.addService(ConversionService, {
  GetLastConversion: (call:any, callback:any) => {
    const convert = call.request.convert;

    axios
      .get(`${process.env.URL}json/last/${convert}`)
      .then((res) => {
        if (!res.data) {
          return callback({
            code: grpc.status.NOT_FOUND,
            details: 'Data not found',
          });
        }
        callback(null, { data: JSON.stringify(res.data) });
      })
      .catch((err) => {
        callback({
          code: grpc.status.INTERNAL,
          details: err.message,
        });
      });
  },

  GetDailyConversion: (call:any, callback:any) => {
    const { moeda, dias } = call.request;

    axios
      .get(`${process.env.URL}json/daily:${moeda}/:${dias}`)
      .then((res) => {
        if (!res.data) {
          return callback({
            code: grpc.status.NOT_FOUND,
            details: 'Data not found',
          });
        }
        callback(null, { data: JSON.stringify(res.data) });
      })
      .catch((err) => {
        callback({
          code: grpc.status.INTERNAL,
          details: err.message,
        });
      });
  },
});

// Iniciar o servidor
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
    return;
  }
  console.log(`Server running at http://127.0.0.1:${port}`);
  server.start();
});
