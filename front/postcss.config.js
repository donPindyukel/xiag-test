var path = require('path');
var postcssConfig = {
    plugins: [
        //вендорные префиксы для w3c свойств
        require('autoprefixer'),
        //наследование
        require('postcss-nested'),
        //вырезаем простые комментарии из css
        require('postcss-inline-comment'),
        require('postcss-media-minmax'),
        //кастомные значения медиа

        // require('postcss-custom-media'),
        /*require('postcss-mixins')({
          mixins: require('./css-mixins')
        }),*/
        require('postcss-css-variables')({
            variables: require('./css-variables'),
        }),
        // require('postcss-color-function'),
        require('postcss-import'),
        require('postcss-preset-env'),
        //вырезаем keyframes из media для поддержки ies
        // require('postcss-mq-keyframes'),
        // чат не должен енсти с собой свои @font-face
        // require('postcss-strip-font-face'),
        // require('postcss-normalize-charset'),
        // require('postcss-fontstack-auto'),
        // require('postcss-minify-font-values'),
        // require('postcss-merge-idents'),
    ],
};

module.exports = postcssConfig;
