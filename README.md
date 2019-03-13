# swagger-to-jira
Convert Swagger definitions file to an ascii-art checklist in jira.

Very far from perfect or efficient.

## Usage
Not much to say:
```
$ npm run start
```
Accepts `SWAGGER_FILE` env var to specify a different path (defaults to `./swagger.yaml`).

Prints result to stdout, so you can redirect to a file with:
```
$ npm run start > output.txt
```
