<?php

return [

    /**
     * Dev Mode
     *
     * While in dev mode, the stack trace of errors are printed in the
     * json response body. By default, this `devMode` observes the default
     * setting of the `devMode` in Craft's general configuration.
     */
    'devMode' => \Craft\craft()->config->get('devMode'),

    /**
     * Api Route Prefix
     *
     * The Api Route Prefix acts as a namespace and is prepended to all
     * routes that the API plugin defines.
     */
    'apiRoutePrefix' => 'api',

    /**
     * Default Headers
     *
     * These headers will be sent with every Response.
     */
    'defaultHeaders' => [
        'Pragma'        => [
            'no-cache',
        ],
        'Cache-Control' => [
            'no-store',
            'no-cache',
            'must-revalidate',
            'post-check=0',
            'pre-check=0',
        ],
        'Content-Type' => [
            'application/json; charset=utf-8',
        ],
    ],

    /**
     * Page Trigger
     *
     * The query string parametere for pagination. If the value is the same as
     * Craft's `pageTrigger`, an exception will be thrown.
     */
    'paginationParameter' => 'page',

    /**
     * Pagination Base Url
     *
     * The url that is prepended to all pagination links.
     */
    'paginationBaseUrl' => \Craft\craft()->request->getPath(),

    /**
     * Content Model Fields Location
     *
     * This is the key, in the body of $_POST or php://input, in which
     * content that will need to be added to the element's content
     * model.
     */
    'contentModelFieldsLocation' => 'fields',

    /**
     * Content Recursion Limit
     *
     * This is the number of times content fields can be populated recursively.
     * With complex data models that have multiple relationships, populating content
     * automatically can pull in a lot of extra data.
     */
    'contentRecursionLimit' => 2,

    /**
     * Default Auth
     *
     * The authentication method that should be applied to all requests. `null` will disable
     * authentication altogether.
     */
    'defaultAuth' => null,

    /**
     * Auth
     *
     * Settings authentication methods
     */
    'auth' => [

        'basicAuth' => [
            'username' => '',
            'password' => '',
        ],

        'craft' => [
            'permissions' => [],
            'users'       => [],
            'groups'      => [],
        ],

    ],

    /**
     * Autoload
     *
     * Determine which directories should have thier files autoloaded.
     *
     * `true` loads the files in that directory across ALL plugins.
     * `false` loads the files in that directory only in the RestfulApi plugin.
     */
    'autoload' => [
        'transformers' => true,
        'validators'   => true,
    ],

    /**
     * Default Serializers
     *
     * A Serializer structures your Transformed data in certain ways.
     * For more info, see http://fractal.thephpleague.com/serializers/.
     */
    'defaultSerializer' => 'ArraySerializer',

    /**
     * Serializers
     *
     * Available serializers that can be specified as default serializer.
     */
    'serializers' => [
        'ArraySerializer'     => 'League\\Fractal\\Serializer\\ArraySerializer',
        'DataArraySerializer' => 'League\\Fractal\\Serializer\\DataArraySerializer',
        'JsonApiSerializer'   => 'League\\Fractal\\Serializer\\JsonApiSerializer',
    ],

    /**
     * Exception Transformer
     *
     * This transformer will be applied to all thrown exceptions.
     */
    'exceptionTransformer' => 'RestfulApi\\Transformers\\ArrayTransformer',

    /**
     * Element Types
     *
     * Define settings for each element type. If no setting is defined for an element type,
     * the default settings defined in the `*` wildcard will be inherited.
     */
    'elementTypes' => [

        '*' => [
            'enabled'     => true,
            'transformer' => 'RestfulApi\\Transformers\\ArrayTransformer',
            'validator'   => null,
            'permissions' => [
                'public'        => ['GET'],
                'authenticated' => ['POST', 'PUT', 'PATCH'],
            ],
        ],

        'Asset' => [
            'enabled'     => true,
            'transformer' => 'RestfulApi\\Transformers\\AssetFileTransformer',
            'validator'   => 'RestfulApi\\Validators\AssetFileValidator',
        ],

        'Category' => [
            'enabled'     => true,
            'transformer' => 'RestfulApi\\Transformers\\CategoryTransformer',
            'validator'   => 'RestfulApi\\Validators\\CategoryValidator',
        ],

        'Entry' => [
            'enabled'     => true,
            'transformer' => 'RestfulApi\\Transformers\\EntryTransformer',
            'validator'   => 'RestfulApi\\Validators\\EntryValidator',
        ],

        'GlobalSet' => [
            'enabled'     => true,
            'transformer' => 'RestfulApi\\Transformers\\GlobalSetTransformer',
            'validator'   => 'RestfulApi\\Validators\\GlobalSetValidator',
        ],

        'MatrixBlock' => [
            'enabled'     => true,
            'transformer' => 'RestfulApi\\Transformers\\MatrixBlockTransformer',
            'validator'   => 'RestfulApi\\Validators\\MatrixBlockValidator',
        ],

        'Tag' => [
            'enabled'     => true,
            'transformer' => 'RestfulApi\\Transformers\\TagTransformer',
            'validator'   => 'RestfulApi\\Validators\\TagValidator',
        ],

        'User' => [
            'enabled'     => true,
            'transformer' => 'RestfulApi\\Transformers\\UserTransformer',
            'validator'   => 'RestfulApi\\Validators\\UserValidator',
        ],

    ],

];
