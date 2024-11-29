FROM openjdk:21-jdk-slim
WORKDIR /server
COPY server/target/server-3.3.5.jar server.jar
COPY .env .env
ENTRYPOINT ["java", "-jar", "server.jar", "--spring.profiles.active=production"]