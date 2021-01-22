import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { ManejadorRegistrarBicicleta } from 'src/aplicacion/bicicletas/comando/registrar-bicicleta.manejador';
import { BicicletaDto } from 'src/aplicacion/bicicletas/consulta/dto/bicicletas.dto';
import { ManejadorListarBicicleta } from 'src/aplicacion/bicicletas/consulta/listar-bicicleta.manejador';
import { DaoBicicleta } from 'src/dominio/bicicletas/puerto/dao/dao-bicicleta';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { ServicioActualizarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-actualizar-bicicleta';
import { ServicioRegistrarBicicleta } from 'src/dominio/bicicletas/servicio/servicio-registrar-bicicleta';
import { BicicletaControlador } from 'src/infraestructura/bicicletas/controlador/bicicleta.controller';
import {
  servicioActualizarBicicletaProveedor,
  servicioRegistrarBicicletaProveedor } from 'src/infraestructura/bicicletas/proveedor/servicio/servicio-actualizar-bicicleta.proveedor';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { createStubObj } from 'test/util/create-object.stub';
import { ManejadorActualizarBicicleta } from 'src/aplicacion/bicicletas/comando/actualizar-bicicleta.manejador';

const sinonSandbox = createSandbox();

describe('Pruebas del controlador para bicicletas', () => {
  let app: INestApplication;
  let repositorioBicicleta: SinonStubbedInstance<RepositorioBicicleta>;
  let daoBicicleta: SinonStubbedInstance<DaoBicicleta>;

  let bicicletaDataRecive: object;

  beforeAll(async () => {
    repositorioBicicleta = createStubObj<RepositorioBicicleta>([
      'actualizar',
      'guardar'
    ], sinonSandbox);
    daoBicicleta = createStubObj<DaoBicicleta>([
      'listar',
      'listarUno'
    ], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [BicicletaControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioActualizarBicicleta,
          inject: [RepositorioBicicleta],
          useFactory: servicioActualizarBicicletaProveedor
        },
        {
          provide: ServicioRegistrarBicicleta,
          inject: [RepositorioBicicleta],
          useFactory: servicioRegistrarBicicletaProveedor
        },
        { provide: RepositorioBicicleta, useValue: repositorioBicicleta },
        { provide: DaoBicicleta, useValue: daoBicicleta },
        ManejadorRegistrarBicicleta,
        ManejadorActualizarBicicleta,
        ManejadorListarBicicleta,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();

  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach (() => {
    bicicletaDataRecive   = {
      id: 7,
      marca: 'Scoop',
      serial: 'FLYER 28 V20',
      color: 'Azul marino',
      almacenActual: 1,
      fechaCompra: '2021-01-19T05:00:00.000Z',
      estado: 'alquilada',
      valorHora: '9800',
      descripcion: 'Bicicleta Urbana Scoop Flyer 28 V20 28 pulgadas Género:'
    };
    return bicicletaDataRecive;
  });

  it('deberia listar todas las bicicletas', async () => {
    const bicicletas: any[] = [bicicletaDataRecive];
    daoBicicleta.listar.returns(Promise.resolve(bicicletas));

    return request(app.getHttpServer())
      .get('/bicicleta/listar')
      .expect(HttpStatus.OK)
      .expect(bicicletas);
    });

})
