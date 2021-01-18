import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createStubObj } from '../../../util/create-object.stub';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { DaoAlquiler } from 'src/dominio/alquiler/puerto/dao/dao-alquiler';
import { AlquilerControlador } from 'src/infraestructura/alquiler/controlador/alquiler.controller';
import { ServicioRegistraAlquiler } from 'src/dominio/alquiler/servicio/servicio-registrar-alquiler';
import { servicioRegistrarAlquilerProveedor } from 'src/infraestructura/alquiler/proveedor/servicio/servicio-registrar-alquiler.proveedor';
import { ManejadorRegistrarAlquiler } from 'src/aplicacion/alquiler/comando/registrar-alquiler.manejador';
import { ManejadorListarAlquiler } from 'src/aplicacion/alquiler/consulta/listart-alquiler.manejador';
import { ComandoRegistrarAlquiler } from 'src/aplicacion/alquiler/comando/registrar-alquiler.comando';
import { Alquiler } from 'src/dominio/alquiler/modelo/alquiler';
import { ManejadorFacturarAlquiler } from 'src/aplicacion/alquiler/comando/facturar-alquiler.manejador';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';
import { servicioFacturarAlquilerProveedor } from 'src/infraestructura/alquiler/proveedor/servicio/servicio-facturar-alquiler.proveedor';
import { AlquilerDto } from 'src/aplicacion/alquiler/consulta/dto/alquiler.dto';
import { FacturacionDto } from 'src/aplicacion/alquiler/consulta/dto/facturar.dto';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de alquiler', () => {

  let app: INestApplication;
  let repositorioAlquiler: SinonStubbedInstance<RepositorioAlquiler>;
  let daoAlquiler: SinonStubbedInstance<DaoAlquiler>;
  let alquilerDto: AlquilerDto;
  let facturacionDto: FacturacionDto;

  const alquilerDataRecive = {
    id: 42,
    cedulaUsuario: '72283599500',
    serialBicicleta: 'C4SDJCT4FC238515',
    fechaAlquiler: '2021-01-17T05:00:00.000Z',
    ciudad: 'barranquilla',
    estado: false,
    fechaEntrega: '2021-01-17T05:00:00.000Z',
    horasTranscurridas: 1,
    total: 2000
  };

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioAlquiler = createStubObj<RepositorioAlquiler>([
      'existeCedulaUsuario',
      'existeIdAlquiler',
      'actualizar',
      'guardar'
    ], sinonSandbox);
    daoAlquiler = createStubObj<DaoAlquiler>(['listar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [AlquilerControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistraAlquiler,
          inject: [RepositorioAlquiler],
          useFactory: servicioRegistrarAlquilerProveedor,
        },
        {
          provide: ServicioFacturarAlquiler,
          inject: [RepositorioAlquiler],
          useFactory: servicioFacturarAlquilerProveedor
        },
        { provide: RepositorioAlquiler, useValue: repositorioAlquiler },
        { provide: DaoAlquiler, useValue: daoAlquiler },
        ManejadorRegistrarAlquiler,
        ManejadorListarAlquiler,
        ManejadorFacturarAlquiler
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  beforeEach(() => {
    alquilerDto = {
      cedulaUsuario: '72283599500',
      serialBicicleta: 'C4SDJCT4FC238515',
      fechaAlquiler: '',
      ciudad: 'barranquilla',
      estado: false,
    };
    facturacionDto = {
      idAlquiler: '42',
	    valorHora: '2000',
	    fechaInicio: '2021-01-17T05:00:00.000Z',
	    fechaEntrega: '2021-01-17T06:00:00.000Z'
    };
    return {alquilerDto, facturacionDto};
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar los alquileres registrados', async () => {
    const alquilers: any[] = [alquilerDataRecive];
    daoAlquiler.listar.returns(Promise.resolve(alquilers));

    return request(app.getHttpServer())
      .get('/alquiler/listar')
      .expect(HttpStatus.OK)
      .expect(alquilers);
  });


  it('deberia crear un nuevo alquiler', async () => {
    alquilerDto.fechaAlquiler = new Date('2020-09-20 21:57:07').toISOString();
    repositorioAlquiler.guardar.returns();

    return request(app.getHttpServer())
      .post('/alquiler')
      .send(alquilerDto)
      .expect(HttpStatus.CREATED);
  });


  it('deberia fallar al alquilar fuera de horario', async () => {
    alquilerDto.fechaAlquiler = new Date('2020-09-20 22:57:07').toISOString();
    repositorioAlquiler.guardar.returns();

    return request(app.getHttpServer())
      .post('/alquiler')
      .send(alquilerDto)
      .expect(HttpStatus.BAD_REQUEST);
  });


  it('deberia facturar un alquiler', async () => {
    facturacionDto.fechaEntrega = new Date('2020-09-20 13:57:07').toISOString();
    facturacionDto.fechaEntrega = new Date('2020-09-20 18:57:07').toISOString();
    repositorioAlquiler.existeIdAlquiler.returns(Promise.resolve(true));

    return request(app.getHttpServer())
      .put('/alquiler')
      .send(facturacionDto)
      .expect(HttpStatus.OK);
  });

});
