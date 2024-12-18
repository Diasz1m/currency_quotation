import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Caminho para o arquivo `.proto`
const PROTO_PATH = path.join(__dirname, '../conversion.proto');

// Carregar definições do Proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Converte o pacote carregado para um objeto gRPC
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

// Extração do serviço específico
const ConversionService = protoDescriptor.ConversionService;

// Criação do cliente
const client = new ConversionService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Usando o cliente para chamar os métodos do serviço
client.GetLastConversion({ convert: 'USD_BRL' }, (error: any, response: any) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response:', response);
  }
});

client.GetDailyConversion({ moeda: 'USD', dias: 7 }, (error: any, response: any) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response:', response);
  }
});
