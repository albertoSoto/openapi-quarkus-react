# backend

https://es.quarkus.io/guides/openapi-swaggerui

```bash
brew install quarkusio/tap/quarkus
quarkus --version
3.15.1
brew update 
brew upgrade quarkus 
#quarkus create app es.albertosoto:openapi-backend
#quarkus extension add rest-jackson
quarkus create app es.albertosoto:openapi-backend --extension='rest-jackson' --no-code
quarkus extension add quarkus-smallrye-openapi
cd openapi-backend
quarkus dev
#http://localhost:8080/q/dev-ui/configuration-form-editor
#http://localhost:8080/q/dev-ui/dependencies-application-dependencies
#http://localhost:8080/q/openapi/
```


## frontend

```bash
# Create new NX workspace
npx create-nx-workspace@latest react-app --preset=react
# Navigate to workspace
cd react-app
# Install dependencies
yarn
yarn add axios @openapitools/openapi-generator-cli
# Create a shared lib for api thingies
nx g @nx/react:lib libs/shared-api
cd react-app/libs/shared-api

```


# Add OpenAPI Generator configuration
cat > .openapi-generator-config.json << EOL
{
"apiPackage": "api",
"modelPackage": "models",
"supportsES6": true,
"withSeparateModelsAndApi": true,
"useSingleRequestParameter": true
}
EOL

# Add scripts to package.json
cat >> package.json << EOL
{
"scripts": {
"generate-api": "openapi-generator-cli generate -i http://localhost:8080/v3/api-docs -g typescript-axios -o src/generated --config .openapi-generator-config.json"
}
}
EOL
