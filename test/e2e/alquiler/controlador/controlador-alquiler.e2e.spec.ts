import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createStubObj } from '../../../util/create-object.stub';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { DaoAlquiler } from 'src/dominio/alquiler/puerto/dao/dao-alquiler';
import { AlquilerControlador } from 'src/infraestructura/alquiler/controlador/alquiler.controller';
import { ServicioRegistraAlquiler } from 'src/dominio/alquiler/servicio/servicio-registrar-alquiler';
import { servicioRegistrarAlquilerProveedor } from 'src/infraestructura/alquiler/proveedor/servicio/servicio-registrar-alquiler.proveedor';
import { ManejadorRegistrarAlquiler } from 'src/aplicacion/alquiler/comando/registrar-alquiler.manejador';
import { ManejadorListarAlquiler } from 'src/aplicacion/alquiler/consulta/listart-alquiler.manejador';
import { ManejadorFacturarAlquiler } from 'src/aplicacion/alquiler/comando/facturar-alquiler.manejador';
import { ServicioFacturarAlquiler } from 'src/dominio/alquiler/servicio/servicio-facturar-alquiler';
import { servicioFacturarAlquilerProveedor } from 'src/infraestructura/alquiler/proveedor/servicio/servicio-facturar-alquiler.proveedor';
import { AlquilerDto } from 'src/aplicacion/alquiler/consulta/dto/alquiler.dto';
import { FacturacionDto } from 'src/dominio/alquiler/puerto/dto/facturar.dto';
import { RepositorioBicicleta } from 'src/dominio/bicicletas/puerto/repositorio/repositorio-bicicleta';
import { RepositorioUsuario } from 'src/dominio/usuario/puerto/repositorio/repositorio-usuario';
import { RepositorioAlquiler } from 'src/dominio/alquiler/puerto/repositorio/repositorio-alquiler';
import { ComandoFacturarAlquiler } from 'src/aplicacion/alquiler/comando/facturar-alquiler.comando';


/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de alquiler', () => {

  let app: INestApplication;
  let repositorioAlquiler: SinonStubbedInstance<RepositorioAlquiler>;
  let repositorioBicicleta: SinonStubbedInstance<RepositorioBicicleta>;
  let repositorioUsuario: SinonStubbedInstance<RepositorioUsuario>;
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
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al
   * levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioAlquiler = createStubObj<RepositorioAlquiler>([
      'existeAlquilerSinFacturar',
      'buscarAlquiler',
      'actualizar',
      'guardar'
    ], sinonSandbox);
    repositorioUsuario = createStubObj<RepositorioUsuario>([
      'existeCedulaUsuario',
      'usuarioHabilitado',
      'actualizarEstado',
      'guardar'
    ], sinonSandbox);
    repositorioBicicleta = createStubObj<RepositorioBicicleta>([
      'existeBicicleta',
      'obtenerValorHora',
      'bicicletaHabilitada',
      'actualizarEstado',
      'guardar'
    ], sinonSandbox);

    daoAlquiler = createStubObj<DaoAlquiler>(['listar'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [AlquilerControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistraAlquiler,
          inject: [RepositorioAlquiler, RepositorioBicicleta, RepositorioUsuario],
          useFactory: servicioRegistrarAlquilerProveedor,
        },
        {
          provide: ServicioFacturarAlquiler,
          inject: [RepositorioAlquiler, RepositorioBicicleta, RepositorioUsuario],
          useFactory: servicioFacturarAlquilerProveedor
        },
        { provide: RepositorioAlquiler, useValue: repositorioAlquiler },
        { provide: RepositorioBicicleta, useValue: repositorioBicicleta },
        { provide: RepositorioUsuario, useValue: repositorioUsuario },
        { provide: DaoAlquiler, useValue: daoAlquiler },
        ManejadorRegistrarAlquiler,
        ManejadorFacturarAlquiler,
        ManejadorListarAlquiler,
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
      cedulaUsuario: '72283599',
      idBicicleta: '5',
      fechaAlquiler: '',
      ciudad: 'barranquilla',
      estado: true,
    };
    facturacionDto = {
      idAlquiler: 42,
      valorHora: 2000,
      fechaInicio: new Date('2021-01-17T05:00:00.000Z'),
      fechaEntrega: new Date('2021-01-17T06:00:00.000Z')
    };
    return { alquilerDto, facturacionDto };
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Debería listar los alquileres registrados', async () => {
    const alquilers: any[] = [alquilerDataRecive];
    daoAlquiler.listar.returns(Promise.resolve(alquilers));

    return request(app.getHttpServer())
      .get('/alquiler/listar')
      .expect(HttpStatus.OK)
      .expect(alquilers);
  });


  it('Deberia crear un nuevo alquiler', async () => {
    alquilerDto.fechaAlquiler = new Date('2020-09-20 20:57:07').toISOString();
    repositorioUsuario.existeCedulaUsuario.returns(Promise.resolve(true));
    repositorioBicicleta.existeBicicleta.returns(Promise.resolve(true));
    repositorioUsuario.usuarioHabilitado.returns(Promise.resolve(true));
    repositorioBicicleta.bicicletaHabilitada.returns(Promise.resolve(true));

    repositorioAlquiler.guardar.returns();
    repositorioBicicleta.actualizarEstado.returns();
    repositorioUsuario.actualizarEstado.returns();


    return request(app.getHttpServer())
      .post('/alquiler')
      .send(alquilerDto)
      .expect(HttpStatus.CREATED);
  });


  it('deberia facturar un alquiler', async () => {
    const factura: ComandoFacturarAlquiler = { idAlquiler: '1' };

    repositorioAlquiler.existeAlquilerSinFacturar.returns(Promise.resolve(true));
    repositorioAlquiler.buscarAlquiler.returns(Promise.resolve({
      cedulaUsuario: 2343434,
      idBicicleta: 2,
      fechaAlquiler: new Date('2020-09-20 20:57:07')
    }));

    repositorioAlquiler.actualizar.returns();

    return request(app.getHttpServer())
      .put('/alquiler')
      .send(factura)
      .expect(HttpStatus.OK);
  });

});
