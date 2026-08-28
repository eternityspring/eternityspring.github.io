## Usage
````
npm i
````
Edit ``public/resume.json`` as your infomation then:
````
npm run build
````

The English resume is stored in ``public/resume-en.json``. Without a language parameter, the page uses the browser's preferred language: Chinese locales open the Chinese resume and all other locales open the English resume. Use ``?lang=zh`` or ``?lang=en`` to choose explicitly; the language switch in the top-right corner writes the corresponding parameter.

### Preview
[https://eternityspring.github.io/dist/](https://eternityspring.github.io/dist/)

[English version](https://eternityspring.github.io/dist/?lang=en)
