(function(){

    var module = angular.module('sg-producto', ['restangular']);

    module.provider('sgProducto', function() {

        this.restUrl = 'http://localhost';

        this.$get = function() {
            var restUrl = this.restUrl;
            return {
                getRestUrl: function() {
                    return restUrl;
                }
            }
        };

        this.setRestUrl = function(restUrl) {
            this.restUrl = restUrl;
        };
    });

    module.factory('ProductoRestangular', ['Restangular', 'sgProducto', function(Restangular, sgProducto) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl(sgProducto.getRestUrl());
        });
    }]);

    module.factory('ProductoAbstractModel', ['ProductoRestangular', function(ProductoRestangular){
        var url = '';
        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return ProductoRestangular.all(url).post(this);
                }});
            },
            $save: function() {
                return ProductoRestangular.one(url, this.id).customPUT(ProductoRestangular.copy(this),'',{},{});
            },

            $find: function(id){
                return ProductoRestangular.one(url, id).get();
            },
            $search: function(queryParams){
                return ProductoRestangular.all(url).getList(queryParams);
            },

            $remove: function(id){
                return ProductoRestangular.one(url, id).remove();
            }
        }
    }]);

    module.factory('SGProductoCuentaPersonal', ['ProductoRestangular',  function(ProductoRestangular) {

        var url = 'cuentasPersonales';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return ProductoRestangular.all(url).post(this);
                }});
            },
            $save: function() {
                return ProductoRestangular.one(id, this.id).customPUT(ProductoRestangular.copy(this),'',{},{});
            },


            $find: function(id){
                return ProductoRestangular.one(url, id).get();
            },
            $search: function(queryParams){
                return ProductoRestangular.all(url).getList(queryParams);
            },


            $count: function(){
                return ProductoRestangular.one(urlCount).get();
            },


            $disable: function(){
                return ProductoRestangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return ProductoRestangular.one(urlAlpha3Code, id).remove();
            }
        };

        ProductoRestangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);

    module.factory('SGProductoCredito', ['ProductoRestangular',  function(ProductoRestangular) {

        var url = 'creditos';

        var modelMethos = {
            $new: function(id){
                return angular.extend({id: id}, modelMethos);
            },
            $build: function(){
                return angular.extend({id: undefined}, modelMethos, {$save: function(){
                    return ProductoRestangular.all(url).post(this);
                }});
            },
            $save: function() {
                return ProductoRestangular.one(id, this.id).customPUT(ProductoRestangular.copy(this),'',{},{});
            },


            $find: function(id){
                return ProductoRestangular.one(url, id).get();
            },
            $search: function(queryParams){
                return ProductoRestangular.all(url).getList(queryParams);
            },


            $count: function(){
                return ProductoRestangular.one(urlCount).get();
            },


            $disable: function(){
                return ProductoRestangular.all(url+'/'+this.id+'/disable').post();
            },
            $remove: function(id){
                return ProductoRestangular.one(urlAlpha3Code, id).remove();
            }
        };

        ProductoRestangular.extendModel(url, function(obj) {
            return angular.extend(obj, modelMethos);
        });

        return modelMethos;

    }]);

})();