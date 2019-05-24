module.exports = function(api) {
    // api.cache(true);
    const isTest = api.env('test');
    let presets = [
        [
            '@babel/env',
            {
                useBuiltIns: 'usage',
                corejs: '2.0',
            },
        ],
        '@babel/typescript',
        '@babel/react',
    ];
    const plugins = [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
    ];
    if (isTest) {
        presets = ['@babel/env', '@babel/react'];
    }

    return {
        presets,
        plugins,
    };
};
