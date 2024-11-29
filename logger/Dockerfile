FROM openjdk:21-jdk-slim
WORKDIR /server
COPY logger/target/logger-3.4.0.jar server.jar
COPY .env .env
ENTRYPOINT ["java", "-jar", "server.jar", "--spring.profiles.active=production"]