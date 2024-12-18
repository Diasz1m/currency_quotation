import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../conversion.proto');

// Carregando o proto com configurações explícitas
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Tipagem explícita do serviço
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as unknown as {
    ConversionService: grpc.ServiceDefinition<any>;
};

// Inicialização do cliente gRPC
const client = new (grpc.makeGenericClientConstructor(protoDescriptor, 'teste'))(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure(),
);

// Chamadas ao serviço gRPC
client.GetLastConversion({ convert: 'USD' }, (error: any, response: any) => {
    if (error) {
        console.error('Error fetching last conversion:', error.message);
    } else {
        console.log('Last Conversion Data:', response.data);
    }
});

client.GetDailyConversion({ moeda: 'USD', dias: 5 }, (error: any, response: any) => {
    if (error) {
        console.error('Error fetching daily conversion:', error.message);
    } else {
        console.log('Daily Conversion Data:', response.data);
    }
});
