'use strict';

(function () {

    var module = angular.module('sg-producto', ['restangular']);

    module.provider('sgProducto', function () {

        this.restUrl = 'http://localhost';

        this.$get = function () {
            var restUrl = this.restUrl;
            return {
                getRestUrl: function () {
                    return restUrl;
                }
            }
        };

        this.setRestUrl = function (restUrl) {
            this.restUrl = restUrl;
        };
    });

    module.factory('ProductoRestangular', ['Restangular', 'sgProducto', function (Restangular, sgProducto) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(sgProducto.getRestUrl());
        });
    }]);

    var RestObject = function (path, restangular, extendMethods) {
        var modelMethods = {

            /**
             * Retorna url*/
            $getBasePath: function () {
                return path;
            },
            /**
             * Retorna la url completa del objeto*/
            $getAbsoluteUrl: function () {
                return restangular.one(path, this.id).getRestangularUrl();
            },
            /**
             * Concatena la url de subresource con la url base y la retorna*/
            $concatSubResourcePath: function (subResourcePath) {
                return this.$getBasePath() + '/' + this.id + '/' + subResourcePath;
            },


            $new: function (id) {
                return angular.extend({id: id}, modelMethods);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethods, {
                    $save: function () {
                        return restangular.all(path).post(this);
                    }
                });
            },

            $search: function (queryParams) {
                return restangular.all(path).getList(queryParams);
            },

            $find: function (id) {
                return restangular.one(path, id).get();
            },
            $save: function () {
                return restangular.one(path, this.id).customPUT(restangular.copy(this), '', {}, {});
            },
            $saveSent: function (obj) {
                return restangular.all(path).post(obj);
            },

            $enable: function () {
                return restangular.one(path, this.id).all('enable').post();
            },
            $disable: function () {
                return restangular.one(path, this.id).all('disable').post();
            },
            $remove: function () {
                return restangular.one(path, this.id).remove();
            }
        };

        modelMethods = angular.extend(modelMethods, extendMethods);

        restangular.extendModel(path, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethods);
            } else {
                return angular.extend({id: obj}, modelMethods)
            }
        });

        restangular.extendCollection(path, function (collection) {
            angular.forEach(collection, function (row) {
                angular.extend(row, modelMethods);
            });
            return collection;
        });

        return modelMethods;
    };

    module.factory('SGProductoCuentaPersonal', ['ProductoRestangular', function (ProductoRestangular) {

        var cuentaPersonalResource = RestObject('cuentasPersonales', ProductoRestangular);

        return cuentaPersonalResource;

    }]);

    module.factory('SGProductoCredito', ['ProductoRestangular', function (ProductoRestangular) {

        var url = 'creditos';
        var urlCount = url + '/count';

        var modelMethos = {
            $new: function (id) {
                return angular.extend({id: id}, modelMethos);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethos, {
                    $save: function () {
                        return ProductoRestangular.all(url).post(this);
                    }
                });
            },
            $save: function () {
                return ProductoRestangular.one(url, this.id).customPUT(ProductoRestangular.copy(this), '', {}, {});
            },


            $find: function (id) {
                return ProductoRestangular.one(url, id).get();
            },
            $search: function (queryParams) {
                return ProductoRestangular.all(url).getList(queryParams);
            },


            $count: function () {
                return ProductoRestangular.one(urlCount).get();
            },


            $disable: function () {
                return ProductoRestangular.all(url + '/' + this.id + '/disable').post();
            },
            $remove: function (id) {
                return ProductoRestangular.one(url, id).remove();
            },

            $addTasa: function (obj) {
                return ProductoRestangular.all(url + '/' + this.id + '/tasas').post(obj);
            },
            $getTasas: function () {
                return ProductoRestangular.all(url + '/' + this.id + '/tasas').getList();
            },
            $addCaracteristica: function (obj) {
                return ProductoRestangular.all(url + '/' + this.id + '/caracteristicas').post(obj);
            },
            $getCaracteristicas: function () {
                return ProductoRestangular.all(url + '/' + this.id + '/caracteristicas').getList();
            },
            $addComision: function (obj) {
                return ProductoRestangular.all(url + '/' + this.id + '/comisiones').post(obj);
            },
            $getComisiones: function () {
                return ProductoRestangular.all(url + '/' + this.id + '/comisiones').getList();
            }
        };

        ProductoRestangular.extendModel(url, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

    module.factory('SGProductoTasa', ['ProductoRestangular', function (ProductoRestangular) {

        var url = 'productoTasas';
        var urlCount = url + '/count';

        var modelMethos = {
            $new: function (id) {
                return angular.extend({id: id}, modelMethos);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethos, {
                    $save: function () {
                        return ProductoRestangular.all(url).post(this);
                    }
                });
            },
            $save: function () {
                return ProductoRestangular.one(url, this.id).customPUT(ProductoRestangular.copy(this), '', {}, {});
            },

            $find: function (id) {
                return ProductoRestangular.one(url, id).get();
            },
            $search: function (queryParams) {
                return ProductoRestangular.all(url).getList(queryParams);
            },

            $count: function () {
                return ProductoRestangular.one(urlCount).get();
            },

            $remove: function (id) {
                return ProductoRestangular.one(url, id).remove();
            }
        };

        ProductoRestangular.extendModel(url, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

    module.factory('SGProductoCaracteristica', ['ProductoRestangular', function (ProductoRestangular) {

        var url = 'productoCaracteristicas';
        var urlCount = url + '/count';

        var modelMethos = {
            $new: function (id) {
                return angular.extend({id: id}, modelMethos);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethos, {
                    $save: function () {
                        return ProductoRestangular.all(url).post(this);
                    }
                });
            },
            $save: function () {
                return ProductoRestangular.one(url, this.id).customPUT(ProductoRestangular.copy(this), '', {}, {});
            },

            $find: function (id) {
                return ProductoRestangular.one(url, id).get();
            },
            $search: function (queryParams) {
                return ProductoRestangular.all(url).getList(queryParams);
            },

            $count: function () {
                return ProductoRestangular.one(urlCount).get();
            },

            $remove: function (id) {
                return ProductoRestangular.one(url, id).remove();
            }
        };

        ProductoRestangular.extendModel(url, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

    module.factory('SGProductoComision', ['ProductoRestangular', function (ProductoRestangular) {

        var url = 'productoComisiones';
        var urlCount = url + '/count';

        var modelMethos = {
            $new: function (id) {
                return angular.extend({id: id}, modelMethos);
            },
            $build: function () {
                return angular.extend({id: undefined}, modelMethos, {
                    $save: function () {
                        return ProductoRestangular.all(url).post(this);
                    }
                });
            },
            $save: function () {
                return ProductoRestangular.one(url, this.id).customPUT(ProductoRestangular.copy(this), '', {}, {});
            },

            $find: function (id) {
                return ProductoRestangular.one(url, id).get();
            },
            $search: function (queryParams) {
                return ProductoRestangular.all(url).getList(queryParams);
            },

            $count: function () {
                return ProductoRestangular.one(urlCount).get();
            },

            $remove: function (id) {
                return ProductoRestangular.one(url, id).remove();
            }
        };

        ProductoRestangular.extendModel(url, function (obj) {
            if (angular.isObject(obj)) {
                return angular.extend(obj, modelMethos);
            } else {
                return angular.extend({id: obj}, modelMethos)
            }
        });

        return modelMethos;

    }]);

    module.factory('SGTipoValor', ['ProductoRestangular', function (ProductoRestangular) {

        var url = 'tipoValores';

        var modelMethos = {
            $search: function (queryParams) {
                return ProductoRestangular.all(url).getList(queryParams);
            }
        };

        return modelMethos;

    }]);

    module.factory('SGFrecuencia', ['ProductoRestangular', function (ProductoRestangular) {

        var url = 'frecuencias';

        var modelMethos = {
            $search: function (queryParams) {
                return ProductoRestangular.all(url).getList(queryParams);
            }
        };

        return modelMethos;

    }]);

})();