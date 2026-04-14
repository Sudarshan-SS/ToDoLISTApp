# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore
# Copy everything else and build
COPY . .
RUN dotnet publish -c Release -o /app/publish
# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
EXPOSE 443
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ToDoListApi.dll"]