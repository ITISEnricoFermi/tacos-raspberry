# Silver Computing Raspberry

Codice del server centrale di controllo.

## Getting Started

Per prima cosa clona questa repo

```shell
$ git clone https://github.com/ITISEnricoFermi/silver-computing-raspberry.git
$ cd silver-computing-raspberry
```

Installa tutte le dipendenze e avvia il server

```shell
$ npm install
$ npm run start
```

## Prerequisiti

- node js
- npm

## API Reference

Tutte le routes del api le trovi [qui](https://documenter.getpostman.com/view/6166056/RzfmGTR8)

[Documentazione](https://documenter.getpostman.com/view/6166056/RzfmGTR8)

## Per gli sviluppatori

Ci sono una serie di script npm per rendere lo sviluppo più produttivo.
```
$ npm run build
$ npm run build-watch
```
Questi due si occupano del building del sorgente typescript e salvano il codice javascript nella cartella dist
il primo esegue il building una sola volta mentre il secondo rimane in attesa di cambiamenti nel sorgente 

```
$ npm run dev
$ npm run dev-watch
```
Come i primi due script questi fanno la stessa cosa cioè avviare il programma in modalità sviluppo con messaggi di debug,
la differenza e la stessa degli script di building

## Authors

- **Ernesto Montada** - [n4y0n](https://github.com/n4y0n)
- **Davide Gabrielli** - [davegabe](https://github.com/davegabe)
- **[]** - []()
- **[]** - []()

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details
