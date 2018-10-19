


# MARKDOWN
`v1.0.0`
![screenshot_1](https://user-images.githubusercontent.com/39093869/47227775-02312680-d39a-11e8-864c-4678f914cb9c.png)
[Laboratoria] (www.laboratoria.la)


:v: Biblioteca para extraer links de archivos .md

## Características :clipboard:

- Lee solo archivos con la extensión _.md_
- Extrae y lista todos los links que contenga el archivo
- Agregando la opción `--validate` valida estado actual de los links encontrados


## Iniciar :rocket:

Para comenzar debes tener instalado [Node.js](https://nodejs.org/en/) en tu computador.

### Instalación :wrench:

Para instalación global en la consola de tu proyecto debes instalar 
```
npm install -g md-links-cl
```

Para instalar dependencia
```
npm i md-links-cl --save
```

### CLI

Comando de ejecución del modulo
```
$ md-links-cl <path-file>
```

Reemplaza `<path-file>` por la ruta del archivo que deseas extraer links.

Retorna
```return
  line: Línea del link.
  href: URL encontrada.
  text: Texto descriptivo del link.
  file: Ruta del archivo donde se encontró el link.
```
Ejecución de opcion --validate
```
$ md-links-cl <path-file> [options]
```

Retorna el estatus a la petición HTTP de la url extraída
```return
  line: Línea del link.
  href: URL encontrada.
  text: Texto descriptivo del link.
  status: Código de estado
  statusText: `ok` or `file`
  file: Ruta del archivo donde se encontró el link.
```

#### Ejemplo

```boirplate
./
├── .eslintrc
├── .gitignore
├── README.md
├── text
│   ├── some.md
├── package.json
```

Para poder extraer archivos desde _some.md_ ejecutamos
```
$ md-links-cl text/some.md
```

Retorna
 
```sni
line:1 - http://www.google.cl - www.google.cl - C:\Users\proyecto\text\some.md
line:12 - http://www.somes.com - alguna pagina - C:\Users\proyecto\text\some.md
```

Ejecutar con options _--validate_
```
$ md-links-cl text/some.md --validate
```

Retorna
```sni
line:1 - http://www.google.cl - www.google.cl - 200 ok C:\Users\proyecto\text\some.md 
line:12 - http://www.somes.com - alguna pagina - 404 not found C:\Users\proyecto\text\some.md
```

##Versiones :computer:

`Versión 1.0.0` = inicial con todas las características básicas:
  - Línea de link
  - URL
  - Text
  - Ruta del archivo

Se incluye la opción de validar links _--validate_:
  - Status
  - StatusText

## Autor :pencil2:
##### Cindy López Oportus 
[Paquete npm.com](https://www.npmjs.com/settings/cindy.oportus/packages)
	
