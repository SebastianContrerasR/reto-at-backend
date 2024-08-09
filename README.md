## **Backend patron saga**

### Ejecución del Proyecto

Para ejecutar el proyecto, sigue estos pasos:

1. **Instalar Dependencias**: Asegúrate de tener todas las dependencias instaladas ejecutando:
   ```bash
   npm install
   ```
2. **Docker compose**: Docker compose levantara Kafka y las bases de datos de los microservicios.
   ```bash
   docker compose up -d
   ```
3. **Iniciar microservicios**:
   ```bash
   npm run start:dev:all
   ```
Se ejecuta en el puerto `http://localhost:3000`

**Importante**
Este repositoria funciona conjuntamente con: [Frontend](https://github.com/SebastianContrerasR/reto-at-frontend)

### **Tecnologías Utilizadas**

- **NestJS**: Framework de NodeJS para construir aplicaciones del lado del servidor con una arquitectura modular y escalable.
- **TypeScript**: Lenguaje que agrega tipos estáticos a JavaScript, mejorando la robustez y la mantenibilidad del código.
- **Postgres**: Sistema de gestión de bases de datos relacional, utilizado para almacenar datos de manera estructurada y consistente.
- **TypeORM**: ORM para TypeScript y JavaScript que facilita la interacción con bases de datos relacionales.
- **Passport**: Middleware de autenticación para Node.js, utilizado para implementar estrategias de autenticación como JWT.
- **Kafka**: Plataforma de mensajería distribuida para la comunicación entre microservicios.
- **Microservicios de NestJS**: Utilizados para dividir la aplicación en servicios independientes que se comunican entre sí.

### **Arquitectura de Microservicios**

La arquitectura de microservicios permite dividir la aplicación en componentes independientes, cada uno con una responsabilidad específica. Esto ofrece varios beneficios:

1. **Escalabilidad**: Cada microservicio puede escalar de forma independiente según la demanda.
2. **Desarrollo Independiente**: Los equipos pueden trabajar en microservicios separados sin interferir en el trabajo de otros equipos.
3. **Mantenimiento y Actualizaciones**: Facilita la actualización de componentes individuales sin afectar al sistema completo.

#### **Microservicios Implementados**

1. **Auth**: Maneja la autenticación de usuarios, incluyendo login y registro.
2. **Tickets**: Es el microservicio principal del reto, que orquesta el flujo de creación de tickets y actúa como gateway para otros microservicios.
3. **Flights**: Gestiona la información sobre vuelos y asientos.
4. **Payments**: Procesa las transacciones de pago.

### **Patrón SAGA**

El patrón SAGA se utiliza para manejar transacciones distribuidas en una arquitectura de microservicios. En este proyecto, se emplea el patrón SAGA basado en **orquestación**. El microservicio **Tickets** actúa como el orquestador que coordina los pasos del proceso de creación del ticket.

#### **Interfaz de pasos del patron SAGA**

```typescript
export abstract class Step<T, R> {
  name: string;
  abstract invoke(params: T): Promise<R>;
  abstract withCompenstation(params: T): Promise<R>;
}
```

#### **Pasos en la Creación del Ticket**

1. **Create Ticket**: Crea el ticket con estado `pending`.
2. **Check Seats Free**: Verifica si los asientos están disponibles. (Consulta al microservicio Flights)
3. **Reserve Seats**: Reserva los asientos seleccionados. (Consulta al microservicio Flights)
4. **Process Payment**: Procesa el pago del usuario. (Consulta al microservicio Payments)
5. **Confirm Ticket**: Actualiza el estado del ticket a `confirm`.

Cada paso tiene una transacción compensatoria en caso de fallo, excepto **Check Seats Free**, que por su naturaleza, no es necesario.

### **Principios SOLID**

**Cumplimiento de SOLID:**

- **Single Responsibility Principle (SRP)**: Cada microservicio tiene una única responsabilidad, lo que facilita su mantenimiento y evolución.
- **Open/Closed Principle (OCP)**: Los microservicios están diseñados para ser extensibles sin modificar el código existente. Nuevas funcionalidades se pueden agregar mediante nuevos microservicios o módulos.
- **Dependency Inversion Principle (DIP)**: Los microservicios dependen de abstracciones (interfaces) y no de implementaciones concretas, facilitando la modularidad y el desacoplamiento.

**Estructura de Carpetas por Casos de Uso:**

La estructura de carpetas organizada por casos de uso ayuda a:

1. **Segregación de Responsabilidades**: Cada carpeta (por ejemplo, `auth`, `tickets`, `flights`, `payments`) contiene solo los archivos relacionados con una funcionalidad específica, lo que facilita la localización y el mantenimiento del código.
2. **Modularidad**: La separación clara entre casos de uso permite el desarrollo de cada funcionalidad.
3. **Escalabilidad**: La estructura modular facilita la adición de nuevas funcionalidades sin afectar el código existente.
