# babel-rewrite-import-paths-plugin
Allows you to rewrite import paths for specific modules using Babel.

This Babel plugin is useful when the host environment where your script will run already has one of your dependencies available as an ES module. 
Let's use React as an example. Say that you will deploy your script to a webside that has it's own version of React available from it's server at the url
```https://acme.com/vendors/react```. In order to use this, you'd need to write the following code:

```js
import React from "/vendors/react";
```

However, when you're developing locally, if you wrote that you'd get an error as React wouldn't be available there.
This plugin allows you to specify packages like this and have their imports rewritten at the time of transpile,
allowing you to write js`import React from 'react';` in your codebase but have that transpiled to something else so in production it works as you'd expect.

## Setup


```bash
npm install @toadslop/babel-rewrite-import-paths-plugin
```

Update your Babel config as shown:


```json
// babel.config.json

{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1"
                },
                "useBuiltIns": "usage",
                "corejs": "3.6.5",
                "modules": false
            }
        ]
    ],
    "plugins": [
        [
            "rewrite-import-paths",
            {
                "rewrites": {
                    "react": "/vendors/react"
                }
            }
        ]
    ]
}

```

Imagine we have this simple JavaScript file in our project:


```js
import React from "react";
import something from "otherPackage"
```

Babel would transpile this as follows:


```js
import React from "vendors/React";
import something from "otherPackage";
```

Hope this helps you!
