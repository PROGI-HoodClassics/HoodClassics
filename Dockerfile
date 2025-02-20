FROM node:18 AS frontend-builder

WORKDIR /app/frontend

ARG VITE_BASE
ENV VITE_BASE=${VITE_BASE}

COPY frontend/ .

RUN echo "VITE_BASE=${VITE_BASE}" && npm install && npm run build

FROM openjdk:17-jdk-slim AS backend-builder

WORKDIR /app/backend

COPY backend/ .

COPY --from=frontend-builder /app/frontend/dist /app/backend/src/main/resources/static

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=backend-builder /app/backend/target/opp-0.0.1-SNAPSHOT.jar /app/

EXPOSE 8080

CMD ["java", "-jar", "opp-0.0.1-SNAPSHOT.jar"]

